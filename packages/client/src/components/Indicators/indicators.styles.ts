import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

export const IndicatorsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  marginTop: theme.spacing(),
}));

export const TeamCount = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '1.1em',
});

export const Versus = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[500],
}));
