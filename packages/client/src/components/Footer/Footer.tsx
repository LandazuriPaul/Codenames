import React, { FC } from 'react';

import { ExternalLinks, FooterContainer } from './footer.styles';

export const Footer: FC<{}> = () => (
  <FooterContainer component="footer">
    <ExternalLinks variant="subtitle1">
      <a
        href="https://en.wikipedia.org/wiki/Codenames_(board_game)"
        target="_blank"
        rel="noopener noreferrer"
      >
        Rules
      </a>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a
        href="https://github.com/LandazuriPaul/codenames"
        target="_blank"
        rel="noopener noreferrer"
      >
        Source
      </a>
    </ExternalLinks>
  </FooterContainer>
);
