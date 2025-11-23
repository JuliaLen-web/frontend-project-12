import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';
import { useGetMessagesQuery } from '../../../services/MessageService';
import { selectorActiveChannel } from '../../../slices/channelsSlice';
import MessageForm from './MessageForm';

const MessageBox = () => {
  const { t } = useTranslation();
  const [channelMessages, setChannelMessages] = useState([]);
  const activeChannel = useSelector(selectorActiveChannel);

  const lastMessageRef = useRef(null);

  const { data: messages, isLoading } = useGetMessagesQuery();

  useEffect(() => {
    if (messages && messages.length) {
      if (activeChannel) {
        setChannelMessages(messages.filter((message) => message.channelId === activeChannel.id));
      }
    }
  }, [messages, activeChannel]);

  useEffect(() => {
    if (lastMessageRef.current?.scrollHeight) {
      lastMessageRef.current.scrollTo({ left: 0, top: lastMessageRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [channelMessages]);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        {activeChannel && (
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                {`# ${activeChannel.name}`}
              </b>
            </p>
            {channelMessages
              && (
                <span className="text-muted">
                  {`${channelMessages.length} ${t('chat.messages')}`}
                </span>
              )}
          </div>
        )}

        <div id="messages-box" ref={lastMessageRef} className="chat-messages overflow-auto px-5 h-100">
          {isLoading
            ? (
              <div className="d-flex justify-content-center align-items-center h-100">
                <Spinner animation="border" variant="primary" />
              </div>
            )
            : channelMessages
              ? channelMessages.map((message) => (
                <div className="text-break mb-2">
                  <b>{message.username}</b>
                  {`: ${message.body}`}
                </div>
              ))
              : null}
        </div>

        <MessageForm />
      </div>
    </div>
  );
};

export default MessageBox;
