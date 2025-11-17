import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAddMessageMutation, useGetMessagesQuery } from '../../services/MessageService';
import { useAuth } from '../../../hooks/useAuth';
import { saveMessages } from '../../slices/messagesSlice';

const MessageBox = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [channelMessages, setChannelMessages] = useState([]);
  const activeChannel = useSelector((state) => state.channels.activeChannel);

  const auth = useAuth();
  const inputMessage = useRef();

  const { data: messages, refetch: refetchMessages } = useGetMessagesQuery();
  const [addMessage, { error: addingMessageError, isError: hasAddingMessageError }] = useAddMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const messageData = { body: values.message, channelId: activeChannel.id, username: auth.user };
      addMessage(messageData);
      if (hasAddingMessageError) {
        toast.error(addingMessageError.data.message);
      } else {
        refetchMessages();
        values.message = '';
        inputMessage.current.focus();
      }
    },
  });

  useEffect(() => {
    if (messages) {
      dispatch(saveMessages(messages));
      if (activeChannel) {
        setChannelMessages(messages.filter((message) => message.channelId === activeChannel.id));
      }
    }
  }, [messages, activeChannel]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {activeChannel && (
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                #
                {' '}
                {activeChannel.name}
              </b>
            </p>
            {channelMessages
              && (
                <span className="text-muted">
                    {channelMessages.length}
                  {' '}
                  {t('chat.messages')}
                </span>
              )}
          </div>
        )}

        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {channelMessages && channelMessages.map((message) => (
            <div className="text-break mb-2">
              <b>{message.username}</b>
              :
              {' '}
              {message.body}
            </div>
          ))}
        </div>

        <div className="mt-auto px-5 py-3">
          <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="message"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                onChange={formik.handleChange}
                value={formik.values.message}
                ref={inputMessage}
                autoComplete="off"
              />
              <button type="submit" disabled={formik.values.message.trim() === ''} className="btn btn-group-vertical">
                <ArrowRightSquare />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
