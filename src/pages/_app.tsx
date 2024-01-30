import { SOCKET_URL } from 'common/confing';
import { AppProps } from 'next/app';
import React, { createContext } from 'react';
import 'sanitize.css';
import { Socket, io } from 'socket.io-client';
import 'styles/globals.css';
const socket = io(SOCKET_URL);
export const SocketContext = createContext<Socket>(socket);

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <SocketContext.Provider value={socket}>
      <Component {...pageProps} />
    </SocketContext.Provider>
  );
};
export default MyApp;
