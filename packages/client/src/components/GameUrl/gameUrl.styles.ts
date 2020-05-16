import { styled } from '@material-ui/core/styles';

export const GameHandlerContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'center',
  flexWrap: 'nowrap',
}) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

export const GameHandlerForm = styled('form')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
