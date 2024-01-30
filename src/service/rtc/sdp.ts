import { Socket } from 'socket.io-client';
type SdpType = 'offer' | 'answer';

// offerの送信
export const sendOffer = async (
  peerConnection: RTCPeerConnection,
  socket: Socket,
  answerClientId: string
) => {
  const offer = await createSdp(peerConnection, 'offer');
  socket.emit('sendSdp', { recipientId: answerClientId, sdp: offer });
};

// offerの受信およびanswerの送信
export const reciveOffer = async (
  peerConnection: RTCPeerConnection,
  socket: Socket,
  offerContent: RTCSessionDescription,
  offerClientId: string
) => {
  await peerConnection.setRemoteDescription(offerContent);
  const answer = await createSdp(peerConnection, 'answer');
  socket.emit('sendSdp', { recipientId: offerClientId, sdp: answer });
};

// sdpの作成
const createSdp = async (peerConnection: RTCPeerConnection, type: SdpType) => {
  const sdp =
    type === 'offer'
      ? await peerConnection.createOffer()
      : await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(sdp);
  return sdp;
};
