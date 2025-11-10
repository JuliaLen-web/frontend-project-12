import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ArrowRightSquare, PlusSquare } from 'react-bootstrap-icons';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Layout from '../../components/Layout';
import { useGetChannelsQuery } from '../../services/ChannelsService';
import { saveChannels } from '../../slices/chatSlice';

const ChatPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [activeChannel, setActiveChannel] = useState(null);

  const { data: channels, error, isLoading } = useGetChannelsQuery();

  useEffect(() => {
    if (channels) {
      dispatch(saveChannels(channels));
      setActiveChannel(channels[0]);
    }
  }, [channels]);

  const handlerActiveChannel = (channel) => {
    setActiveChannel(channel);
  };

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
                <span className="text-muted">0 сообщений</span>
              </div>
              )}

              <div id="messages-box" className="chat-messages overflow-auto px-5 " />

              <div className="mt-auto px-5 py-3">
                <form noValidate="" className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <input
                      name="body"
                      aria-label="Новое сообщение"
                      placeholder="Введите сообщение..."
                      className="border-0 p-0 ps-2 form-control"
                      value=""
                    />
                    <button type="submit" disabled="" className="btn btn-group-vertical">
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
