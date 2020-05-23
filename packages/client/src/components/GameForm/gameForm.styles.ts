import { styled } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

export const GameSettingsContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(8),
}));

export const TabContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
}));

export const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  color: theme.palette.secondary.light,
}));
