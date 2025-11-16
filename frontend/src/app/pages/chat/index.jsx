import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ArrowRightSquare, PlusSquare } from 'react-bootstrap-icons';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Layout from '../../components/Layout';
import { useGetChannelsQuery } from '../../services/ChannelsService';
import { saveChannels, saveMessages } from '../../slices/chatSlice';
import { useAddMessageMutation, useGetMessagesQuery } from '../../services/MessageService';
import { useAuth } from '../../../hooks/useAuth';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeChannel, setActiveChannel] = useState(null);
  const [channelMessages, setChannelMessages] = useState(null);
  const auth = useAuth();
  const inputMessage = useRef();
  console.log(auth.user);

  const { data: channels, } = useGetChannelsQuery();
  const { data: messages, refetch } = useGetMessagesQuery();
  const [addMessage, { isError: hasAddingMessageError }] = useAddMessageMutation();

  useEffect(() => {
    if (channels) {
      dispatch(saveChannels(channels));
      setActiveChannel(channels[0]);
    }
  }, [channels]);

  useEffect(() => {
    if (messages) {
      dispatch(saveMessages(messages));
    }
    if (activeChannel && messages) {
      setChannelMessages(messages.filter((message) => message.channelId === activeChannel.id));
      console.log(activeChannel, messages, messages.filter((message) => message.channelId === activeChannel));
    }
  }, [messages, activeChannel]);

  const handlerActiveChannel = (channel) => {
    setActiveChannel(channel);
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const messageData = { body: values.message, channelId: activeChannel.id, username: auth.user };
      addMessage(messageData);
      refetch();
      values.message = '';
      inputMessage.current.focus();
    },
  });

  return (
    <Layout>
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button type="button" className="p-0 text-primary btn btn-group-vertical">
                <PlusSquare />
                <span className="visually-hidden">+</span>
              </button>
            </div>
            {channels
              && (
              <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
                {channels.map((channel) => (
                  <li key={channel.id} className="nav-item w-100">
                    <button type="button" className={classNames('w-100 rounded-0 text-start btn', { 'btn-secondary': activeChannel && activeChannel.id === channel.id })} onClick={() => handlerActiveChannel(channel)}>
                      <span className="me-1">#</span>
                      {channel.name}
                    </button>
                  </li>
                ))}
              </ul>
              )}
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              {activeChannel && (
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0">
                  <b>
                    #
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
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
