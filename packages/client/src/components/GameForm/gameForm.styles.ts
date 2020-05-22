import { styled } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

export const GameSettingsContainer = styled(Grid)({
  height: '100%',
});

export const TabContent = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
}));
