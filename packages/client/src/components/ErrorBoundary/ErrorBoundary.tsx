import React, { FC } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from './ErrorFallback';
import { errorHandler } from './errorHandler';
import { resetHandler } from './resetHandler';

export const ErrorBoundary: FC<{}> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={resetHandler}
      onError={errorHandler}
    >
      {children}
    </ReactErrorBoundary>
  );
};
