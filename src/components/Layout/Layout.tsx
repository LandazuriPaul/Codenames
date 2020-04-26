import React, { FC } from 'react';

import { Footer } from '~/components/Footer';
import { Header } from '~/components/Header';

import { LayoutContainer } from './layout.styles';

export const Layout: FC<{}> = ({ children }) => (
  <>
    <Header />
    <LayoutContainer>{children}</LayoutContainer>
    <Footer />
  </>
);
