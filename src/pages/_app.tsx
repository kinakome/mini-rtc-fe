import { AppProps } from 'next/app';
import React from 'react';
import 'sanitize.css';
import 'styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
};
export default MyApp;
