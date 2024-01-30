import React, { useContext, useEffect, useRef } from 'react';
import { SocketContext } from 'pages/_app';
import {} from 'service/rtc/ice';
import {
  createConnection,
  publishLocalVideo,
  subscribeRemoteVideo,
} from 'service/miniSkyway/miniSkyway';
import {
  prepareCalleeConnection,
  prepareCallerConnection,
} from 'service/miniSkyway/miniSkyway';
export const VideoPanel = ({
  recipientId,
  isOffer,
}: {
  recipientId: string;
  isOffer: boolean;
}) => {
  const socket = useContext(SocketContext);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      // step1 : RTCPeerConnectionのインスタンスを作成
      const peerConnection = createConnection({ iceServers: [] });

      // step2 : 映像再生用のエリアを取得
      const localVideoElement = localVideoRef.current;
      const remoteVideoElement = remoteVideRef.current;

      // step3 : ローカルのカメラ映像を取得して、指定のエリアで再生する
      if (localVideoElement)
        await publishLocalVideo(peerConnection, localVideoElement);

      // step4 : 相手のカメラ映像を取得した際に、指定のエリアで再生できるように準備をする
      if (remoteVideoElement)
        subscribeRemoteVideo(peerConnection, remoteVideoElement);

      // step5 : 送信者・受信者それぞれの通信を開始する
      if (isOffer) {
        await prepareCallerConnection(peerConnection, socket, recipientId);
      } else {
        await prepareCalleeConnection(peerConnection, socket, recipientId);
      }
    })();
  }, []);
  return (
    <>
      <div>自分の映像</div>
      <video
        id="local_video"
        autoPlay
        className="mb-4 border border-black"
        ref={localVideoRef}></video>
      <div>通話相手の映像</div>
      <video
        id="remote_video"
        autoPlay
        className="border border-black"
        ref={remoteVideRef}></video>
    </>
  );
};
