import React, { useEffect, useRef } from 'react';
import {
  SkywayConnection,
  prepareCalleeConnection,
  prepareCallerConnection,
  publishLocalVideo,
  subscribeRemoteVideo,
} from 'mini-skyway';

export type VideoPanelProps = {
  recipientId: string;
  isOffer: boolean;
  skywayConnection: SkywayConnection;
};

export const VideoPanel = ({
  recipientId,
  isOffer,
  skywayConnection,
}: VideoPanelProps) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    (async () => {
      // step2 : 映像再生用のエリアを取得
      const localVideoElement = localVideoRef.current;
      const remoteVideoElement = remoteVideRef.current;

      // step3 : ローカルのカメラ映像を取得して、指定のエリアで再生する
      if (localVideoElement)
        await publishLocalVideo(skywayConnection, localVideoElement);

      // step4 : 送信者・受信者それぞれの通信を開始する
      if (isOffer) {
        await prepareCallerConnection(skywayConnection, recipientId);
      } else {
        await prepareCalleeConnection(skywayConnection, recipientId);
      }

      // step5 : 相手のカメラ映像を取得した際に、指定のエリアで再生できるように準備をする
      if (remoteVideoElement)
        subscribeRemoteVideo(skywayConnection, remoteVideoElement);
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

export default VideoPanel;
