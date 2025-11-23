import { FormGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useRemoveChannelMutation } from '../../../services/ChannelsService';

const removeChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [removeChannel, { error, isLoading }] = useRemoveChannelMutation();

  const handlerClick = async (e) => {
    e.preventDefault();
    try {
      removeChannel(modalInfo.item.id);
      toast.success(`${modalInfo.item.name} ${t('chat.channelDeleted')}`);
      onHide();
    } catch (e) {
      toast.error(error.data.message);
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
