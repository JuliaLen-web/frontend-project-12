import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Spinner } from 'react-bootstrap';
import { useGetMessagesQuery } from '../../../services/MessageService';
import MessageForm from './MessageForm';
import { selectorActiveChannel, selectorIsOpenedSidebar, setToggleSidebar } from '../../../slices/chatSlice';
import { useProfanityFilter } from '../../../../hooks/useProfanityFilter';

const MessageBox = () => {
  const { t } = useTranslation();
  const [channelMessages, setChannelMessages] = useState([]);
  const activeChannel = useSelector(selectorActiveChannel);
  const isOpenedSidebar = useSelector(selectorIsOpenedSidebar);
  const dispatch = useDispatch();
  const { filter, check } = useProfanityFilter();

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
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <Button onClick={() => dispatch(setToggleSidebar(!isOpenedSidebar))} size="sm" variant="outline-primary" aria-controls="toggle-sidebar">
            {isOpenedSidebar ? 'Close sidebar' : 'Open sidebar'}
          </Button>
          {activeChannel && (
            <>
              <p className="m-0">
                <b>
                  {`# ${check(activeChannel.name) ? filter(activeChannel.name) : activeChannel.name}`}
                </b>
              </p>
              {channelMessages && (
                <span className="text-muted">
                  {`${channelMessages.length} ${t('chat.messages')}`}
                </span>
              )}
            </>
          )}
        </div>

        <div id="messages-box" ref={lastMessageRef} className="chat-messages overflow-auto px-md-5 px-2 h-100">
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
                  {`: ${check(message.body) ? filter(message.body) : message.body}`}
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
