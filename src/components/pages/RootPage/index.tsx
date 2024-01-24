import React, { useEffect, useState } from 'react';
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

export const RootPage = ({ socket }: { socket: Socket }) => {
  const [socketId, setSocketId] = useState('');
  const getId = () => {
    if (socket.id) setSocketId(socket.id);
  };

  useEffect(() => {
    socket.on('reciveCallAcceptance', (recivedAnswerClientId: string) => {
      console.log(recivedAnswerClientId);
    });
  }, []);
  return (
    <div>
      <div>{socketId ? socketId : 'ID取得中です'}</div>
      <Button variant="contained" onClick={getId}>
        ID取得
      </Button>

      <RequestCallPanel socket={socket} />
      <ReciveCallModal socket={socket} />
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
      <div>通話したいユーザーのIDを入力してください</div>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        {...register('answerClientId', { required: true })}
      />
      <Button variant="contained" type="submit">
        発信
      </Button>
    </form>
  );
};

const ReciveCallModal = ({ socket }: { socket: Socket }) => {
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
    setOfferClientId('');
  };

  return (
    <Dialog
      open={offerClientId !== ''}
      onClose={() => setOfferClientId('false')}>
      <DialogTitle>{}通話リクエストが来ました</DialogTitle>
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
