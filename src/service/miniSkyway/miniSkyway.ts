import { addIceCandidate, setIceCandidate } from 'service/rtc/ice';
import { getLocalStream, playVideo } from 'service/media/media';
import { reciveOffer, sendOffer } from 'service/rtc/sdp';
import { Socket } from 'socket.io-client';

// RTCPeerConnectionの作成
export const createConnection = (config: RTCConfiguration | undefined) => {
  return new RTCPeerConnection(config);
};

// 発信者の接続準備
export const prepareCallerConnection = async (
  peerConnection: RTCPeerConnection,
  socket: Socket,
  answerClientId: string
) => {
  setIceCandidate(peerConnection, socket);
  addIceCandidate(peerConnection, socket, answerClientId);

  await sendOffer(peerConnection, socket, answerClientId);
  socket.on('reciveSdp', (answer: RTCSessionDescription) => {
    (async () => {
      await peerConnection.setRemoteDescription(answer);
    })();
  });

  return peerConnection;
};

// 受信者の接続準備
export const prepareCalleeConnection = async (
  peerConnection: RTCPeerConnection,
  socket: Socket,
  offerClientId: string
) => {
  socket.on('reciveSdp', (offer: RTCSessionDescription) => {
    (async () => {
      setIceCandidate(peerConnection, socket);
      addIceCandidate(peerConnection, socket, offerClientId);
      await reciveOffer(peerConnection, socket, offer, offerClientId);
    })();
  });

  return peerConnection;
};

// ローカルの映像再生および配信
export const publishLocalVideo = async (
  peerConnection: RTCPeerConnection,
  localVideoElement: HTMLVideoElement
) => {
  const localStream = await getLocalStream();
  if (localStream) {
    await playVideo(localVideoElement, localStream); // ローカルでビデオを再生

    const videoTrack = localStream.getVideoTracks()[0];
    peerConnection.addTrack(videoTrack, localStream); // ビデオを配信
  } else {
    console.warn('no local stream');
  }
};

// 通話相手の映像受信および再生
export const subscribeRemoteVideo = (
  peerConnection: RTCPeerConnection,
  remoteVideoElement: HTMLVideoElement
) => {
  peerConnection.ontrack = (event) => {
    const stream = event.streams[0];
    playVideo(remoteVideoElement, stream);
  };
};
