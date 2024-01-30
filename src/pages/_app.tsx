import { AppProps } from 'next/app';
import React, { createContext } from 'react';
import 'sanitize.css';
import {
  createConnection,
  SkywayConnection,
} from 'service/miniSkyway/miniSkyway';
import 'styles/globals.css';
import dynamic from 'next/dynamic';

export const SkywayConnectionContext = createContext<SkywayConnection>(
  {} as SkywayConnection
);

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  // step1 : skywayConnectionを発行する
  const skywayConnection = createConnection({ iceServers: [] });

  return (
    <SkywayConnectionContext.Provider value={skywayConnection}>
      <Component {...pageProps} />
    </SkywayConnectionContext.Provider>
  );
};
// export default MyApp;

export default dynamic(async () => MyApp, { ssr: false });
