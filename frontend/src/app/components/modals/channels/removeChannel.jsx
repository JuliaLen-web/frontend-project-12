import { FormGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery, useRemoveChannelMutation } from '../../../services/ChannelsService';

const removeChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const { refetch: refetchChannels } = useGetChannelsQuery();
  const [removeChannel, { error, isError, isLoading }] = useRemoveChannelMutation();

  const handlerClick = (e) => {
    e.preventDefault();
    removeChannel(modalInfo.item.id);
    refetchChannels();
    if (isError) {
      toast.error(error.data.message);
    } else {
      toast.success(t('chat.channelDeleted'));
      onHide();
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chat.removeChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handlerClick}>
          <FormGroup>
            <input type="submit" className="btn btn-danger mt-2" disabled={isLoading} value={t('chat.delete')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default removeChannelModal;
