import { PlusSquare } from 'react-bootstrap-icons';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { selectorActiveChannel, setActiveChannel } from '../../../slices/channelsSlice';
import { useGetChannelsQuery } from '../../../services/ChannelsService';
import getModal from '../../../components/modals/channels/getModal';

const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const ChannelsSidebar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();
  const activeChannel = useSelector(selectorActiveChannel);

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  useEffect(() => {
    if (channels && channels.length) {
      dispatch(setActiveChannel(channels[0]));
    }
  }, [channels?.length > 0]);

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('chat.channels')}</b>
          <button type="button" onClick={() => showModal('adding')} className="p-0 text-primary btn btn-group-vertical">
            <PlusSquare />
            <span className="visually-hidden">+</span>
          </button>
        </div>
        {channels
          && (
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels.map((channel) => (
                <li key={channel.id} className="nav-item w-100" onClick={() => dispatch(setActiveChannel(channel))}>
                  {channel.removable
                    ? (
                      <Dropdown as={ButtonGroup} className="d-flex">
                        <Button variant={activeChannel && activeChannel.id === channel.id ? 'secondary' : 'light'} className="w-100 rounded-0 text-start text-truncate">
                          #
                          {' '}
                          {channel.name}
                        </Button>

                        <Dropdown.Toggle
                          split
                          variant={activeChannel && activeChannel.id === channel.id ? 'secondary' : 'light'}
                          className="flex-grow-0 dropdown-toggle dropdown-toggle-split"
                          id="dropdown-split-basic"
                        />

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => showModal('removing', channel)} href="#">{t('chat.delete')}</Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => showModal('renaming', channel)}
                            href="#"
                          >
                            {t('chat.rename')}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )
                    : (
                      <button
                        type="button"
                        className={classNames('w-100 rounded-0 text-start btn', { 'btn-secondary': activeChannel && activeChannel.id === channel.id })}
                      >
                        <span className="me-1">#</span>
                        {' '}
                        {channel.name}
                      </button>
                    )}
                </li>
              ))}
            </ul>
          )}
      </div>
      {renderModal({ modalInfo, hideModal })}
    </>
  );
};

export default ChannelsSidebar;
