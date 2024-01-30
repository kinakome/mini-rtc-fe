// ローカルのstream(映像のみ)を取得する
export const getLocalStream = async () => {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false, // 一旦falseにしておく
    });
  } catch (error) {
    console.error(`getLocalStream : ${error}`);
  }
};

// 映像の再生を開始する
export const playVideo = async (
  element: HTMLVideoElement,
  stream: MediaProvider
) => {
  element.srcObject = stream;
  try {
    await element.play();
  } catch (error) {
    console.log(`playVideo : ${error}`);
  }
};
