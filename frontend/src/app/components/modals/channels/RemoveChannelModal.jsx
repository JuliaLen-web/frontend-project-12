import { Button, FormGroup, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { useRemoveChannelMutation } from '../../../services/ChannelsService';

const removeChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [removeChannel, { isLoading }] = useRemoveChannelMutation();
  const submitRef = useRef();

  useEffect(() => {
    submitRef.current?.focus();
  }, []);

  const handlerClick = async (e) => {
    e.preventDefault();
    try {
      removeChannel(modalInfo.item.id).unwrap();
      toast.success(t('chat.removeChannel.done'));
      onHide();
    } catch (e) {
      toast.error(t('chat.removeChannel.error'));
    }
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chat.removeChannel.do')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handlerClick}>
          <FormGroup className="d-flex gap-2 justify-content-end">
            <Button type="button" className="btn btn-secondary" onClick={onHide}>{t('cancel')}</Button>
            <input ref={submitRef} type="submit" className="btn btn-danger" disabled={isLoading} value={t('chat.remove')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default removeChannelModal;
