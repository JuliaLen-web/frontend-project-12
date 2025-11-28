import {
  Button, FormControl, FormGroup, Modal,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { useEditChannelMutation, useGetChannelsQuery } from '../../../services/ChannelsService';
import { setActiveChannel } from '../../../slices/chatSlice';

const renameChannelModal = (props) => {
  const { onHide, modalInfo } = props;
  const { t } = useTranslation();
  const [editChannel, { isLoading }] = useEditChannelMutation();
  const dispatch = useDispatch();
  const { data: channels } = useGetChannelsQuery();

  const f = useFormik({
    enableReinitialize: true,
    initialValues: { body: modalInfo.item.name },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required(t('requiredField')).min(3, t('chat.minMax'))
        .max(20, t('chat.minMax'))
        .notOneOf(channels.map((item) => item.name), t('chat.alreadyExist')),
    }),
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const { data: editedChannel } = await editChannel({ name: values.body, id: modalInfo.item.id });
        dispatch(setActiveChannel(editedChannel));
        toast.success(t('chat.renameChannel.done'));
        onHide();
      } catch (e) {
        toast.error(t('chat.renameChannel.error'));
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
        <Modal.Title>{t('chat.renameChannel.do')}</Modal.Title>
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
          <FormGroup className="d-flex gap-2 justify-content-end">
            <Button type="button" className="btn btn-secondary" onClick={onHide}>{t('cancel')}</Button>
            <input className="btn btn-primary" type="submit" disabled={isLoading || f.errors.body} value={t('chat.rename')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default renameChannelModal;
