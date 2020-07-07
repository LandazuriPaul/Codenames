import React, { FC } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

import { Logger } from '~/utils';

interface ErrorFallbackProps {
  error?: Error;
  componentStack?: string;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  componentStack,
  resetErrorBoundary,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const report = generateReport(error, componentStack);

  async function onCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(report);
      enqueueSnackbar('Report copied to clipboard', { variant: 'info' });
    } catch (err) {
      Logger.error(err);
      enqueueSnackbar(
        'An error occurred while copying report to clipboard. Please try to report the issue directly',
        { variant: 'error' }
      );
    }
  }

  const title = (
    <Typography variant="h5" align="center">
      Oops sorry :&apos;(
    </Typography>
  );

  return (
    <CenteredContainer role="alert">
      <Card elevation={5}>
        <CardHeader disableTypography title={title} />
        <SizedCardContent>
          <Typography component="div">
            <pre>{error.message}</pre>
          </Typography>
        </SizedCardContent>
        <CardActions>
          <ReportButton color="primary" variant="outlined" onClick={onCopy}>
            Copy the report
          </ReportButton>
          <RetryButton
            color="primary"
            variant="contained"
            onClick={resetErrorBoundary}
          >
            Try again
          </RetryButton>
        </CardActions>
      </Card>
    </CenteredContainer>
  );
};

const CenteredContainer = styled('div')({
  display: 'flex',
  alignItems: ' center',
  justifyContent: 'center',
  height: '100%',
});

const SizedCardContent = styled(CardContent)(({ theme }) => ({
  maxHeight: theme.spacing(15),
  background: theme.palette.grey[100],
  overflowY: 'auto',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  borderTop: `1px solid ${theme.palette.grey[200]}`,
}));

const ReportButton = styled(Button)(({ theme }) => ({
  '&:hover, &:focus, &:visited': {
    color: theme.palette.primary.main,
  },
}));

const RetryButton = styled(Button)({
  marginLeft: 'auto !important',
});

function generateReport(error: Error, componentStack: string): string {
  return `URL: ${location.href}\n\nError:\n  - Name: ${error.name}\n  - Message: ${error.message}\n  - Stack: ${error.stack}\n\nComponent Stack:${componentStack}`;
}
