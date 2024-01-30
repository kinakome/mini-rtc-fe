import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { SocketContext } from 'pages/_app';
import { VideoPanel } from '../VideoPanel';

export const RootPage = () => {
  const socket = useContext(SocketContext);

  const [socketId, setSocketId] = useState('');
  const getId = () => {
    if (socket.id) setSocketId(socket.id);
  };

  const [callProps, setCallProps] = useState<{
    recipientId: string;
    isOffer: boolean;
  }>({ recipientId: '', isOffer: false });

  useEffect(() => {
    socket.on('reciveCallAcceptance', (recivedAnswerClientId: string) => {
      setCallProps({ recipientId: recivedAnswerClientId, isOffer: true });
    });
  }, []);

  return (
    <div className="p-8 font-medium">
      <div className="mb-16">
        <div className="mb-2">
          {socketId ? socketId : 'ID取得ボタンを押すと、自分のIDが表示されます'}
        </div>
        <Button variant="contained" onClick={getId}>
          ID取得
        </Button>
      </div>

      {callProps.recipientId ? (
        <VideoPanel {...callProps} />
      ) : (
        <div>
          <RequestCallPanel socket={socket} />
          <ReciveCallModal socket={socket} setCallProps={setCallProps} />
        </div>
      )}
    </div>
  );
};

const RequestCallPanel = ({ socket }: { socket: Socket }) => {
  const { register, handleSubmit } = useForm<{ answerClientId: string }>({});

  const onSubmit = async (data: { answerClientId: string }) => {
    socket.emit('sendCallRequest', {
      answerClientId: data.answerClientId,
      offerClientId: socket.id,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        id="outlined-basic"
        label="通話したいユーザーのID"
        variant="outlined"
        {...register('answerClientId', { required: true })}
        className="mb-2 w-full"
      />
      <Button variant="contained" type="submit">
        発信
      </Button>
    </form>
  );
};

// 通話リクエストを受け取った際に表示されるモーダル
const ReciveCallModal = ({
  socket,
  setCallProps,
}: {
  socket: Socket;
  setCallProps: React.Dispatch<
    React.SetStateAction<{
      recipientId: string;
      isOffer: boolean;
    }>
  >;
}) => {
  const [offerClientId, setOfferClientId] = useState('');

  useEffect(() => {
    socket.on('reciveCallRequest', (recivedOfferClientId: string) => {
      setOfferClientId(recivedOfferClientId);
    });
  }, []);

  const agreeCallRequest = () => {
    socket.emit('sendCallAcceptance', {
      answerClientId: socket.id,
      offerClientId: offerClientId,
    });
    setCallProps({ recipientId: offerClientId, isOffer: false });
  };

  return (
    <Dialog
      open={offerClientId !== ''}
      onClose={() => setOfferClientId('false')}>
      <DialogTitle>通話リクエストが来ました</DialogTitle>
      <DialogContent>
        <DialogContentText>
          ID「{offerClientId}」のユーザーから通話リクエストが来ました。
          リクエストを承認しますか？
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOfferClientId('')}>拒否</Button>
        <Button onClick={agreeCallRequest} autoFocus>
          承認
        </Button>
      </DialogActions>
    </Dialog>
  );
};
