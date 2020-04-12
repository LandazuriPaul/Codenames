import styled from 'styled-components';
import { DialogContentText, DialogTitle } from '@material-ui/core';

export const Title = styled(DialogTitle)`
  text-align: center;
`;

export const SettingsControl = styled(DialogContentText)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-wrap: nowrap;
` as any;
