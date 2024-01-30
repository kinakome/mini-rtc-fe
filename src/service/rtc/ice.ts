import { Socket } from 'socket.io-client';

// Trickle ICEでの経路送信
export const addIceCandidate = (
  peerConnection: RTCPeerConnection,
  socket: Socket,
  recipientId: string
) => {
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      const candidateObj = { type: 'candidate', ice: event.candidate };
      socket.emit('sendCandidate', {
        recipientId: recipientId,
        candidate: candidateObj,
      });
    } else {
      console.log('finish search candidate');
    }
  };
};

// Trickle ICEでの経路受信
export const setIceCandidate = (
  peerConnection: RTCPeerConnection,
  socket: Socket
) => {
  socket.on(
    'reciveCandidate',
    (data: { type: string; ice: RTCIceCandidate }) => {
      const candidate = new RTCIceCandidate(data.ice);
      peerConnection.addIceCandidate(candidate);
    }
  );
};
