import { SOCKET_URL } from 'common/confing';
import { RootPage } from 'components/pages/RootPage';
import { NextPage } from 'next';
import React from 'react';
import { io } from 'socket.io-client';

const Home: NextPage = () => {
  const socket = io(SOCKET_URL);

  return <RootPage socket={socket} />;
};

export default Home;
