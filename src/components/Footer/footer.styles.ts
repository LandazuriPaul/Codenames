import styled from 'styled-components';
import { Paper, Theme, Typography } from '@material-ui/core';

export const FooterContainer = styled(Paper)`
  ${({ theme }: { theme: Theme }) => `
    width: calc(100% -  ${theme.spacing(6)}px);
    text-align: center;
    height: ${theme.spacing(5)}px;
    padding:  ${theme.spacing(2)}px ${theme.spacing(3)}px;
    background: ${theme.palette.grey[800]};
    box-shadow: 2px -3px 4px 0px rgba(0,0,0,0.2), -2px 0px 5px 0px rgba(0,0,0,0.14), -2px 0px 10px 0px rgba(0,0,0,0.12)
  `}
`;

export const ExternalLinks = styled(Typography)`
  ${({ theme }: { theme: Theme }) => `
    margin-top: ${theme.spacing(1)}px;
    text-align: center;

    a {
      text-decoration: none;
      color: ${theme.palette.grey[400]};

      &:hover {
        text-decoration: underline;
      }
    }
  `}
`;
