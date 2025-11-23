import { FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEditChannelMutation } from '../../../services/ChannelsService';

const renameChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [editChannel, { error, isLoading }] = useEditChannelMutation();

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(t('requiredField')).min(3, t('chat.minMax'))
      .max(20, t('chat.minMax')),
  });

  const f = useFormik({
    enableReinitialize: true,
    initialValues: { body: modalInfo.item.name },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const editedChannel = await editChannel({ name: values.body, id: modalInfo.item.id });
        toast.success(`${editedChannel.name} ${t('chat.channelRenamed')}`);
        onHide();
      } catch (e) {
        toast.error(error.data.message);
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              data-testid="input-body"
              name="body"
              required
              onChange={f.handleChange}
              value={f.values.body}
              className="form-control mb-3"
              ref={inputRef}
              isInvalid={f.errors.body}
              autoComplete="off"
            />
            {f.errors.body && (
              <p className="text-danger">{f.errors.body}</p>
            )}
          </FormGroup>
          <input className="btn btn-primary" type="submit" disabled={isLoading} value={t('chat.rename')} />
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default renameChannelModal;
