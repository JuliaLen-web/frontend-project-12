import { Button, FormGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useRemoveChannelMutation } from '../../../services/ChannelsService';

const removeChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [removeChannel, { error, isLoading }] = useRemoveChannelMutation();
  const submitRef = useRef();

  useEffect(() => {
    submitRef.current?.focus();
  }, []);

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
          <FormGroup className="d-flex gap-2 justify-content-end">
            <Button type="button" className="btn btn-secondary" onClick={onHide}>{t('cancel')}</Button>
            <input type="submit" className="btn btn-danger" disabled={isLoading} value={t('chat.delete')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default removeChannelModal;
