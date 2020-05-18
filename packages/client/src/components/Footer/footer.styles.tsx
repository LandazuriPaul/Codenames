import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

export const FooterContainer = styled(props => <Paper {...props} />)(
  ({ theme }) => ({
    width: `calc(100% -  ${theme.spacing(6)}px)`,
    textAlign: 'center',
    height: theme.spacing(5),
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
    background: theme.palette.grey[800],
    boxShadow:
      '2px -3px 4px 0px rgba(0,0,0,0.2), -2px 0px 5px 0px rgba(0,0,0,0.14), -2px 0px 10px 0px rgba(0,0,0,0.12)',
  })
);

export const ExternalLinks = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  textAlign: 'center',

  '& a': {
    color: theme.palette.grey[400],
  },
}));
