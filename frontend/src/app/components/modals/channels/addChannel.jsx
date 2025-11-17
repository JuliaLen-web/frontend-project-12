import { FormControl, FormGroup, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import uniqueId from 'lodash.uniqueid';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../../../slices/channelsSlice';
import { useAddChannelMutation, useGetChannelsQuery } from '../../../services/ChannelsService';

const addChannelModal = (props) => {
  const { onHide } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { refetch: refetchChannels } = useGetChannelsQuery();
  const [addChannel, { error, isError, isLoading }] = useAddChannelMutation();

  const validationSchema = yup.object().shape({
    body: yup.string().trim().required(t('requiredField')).min(3, t('chat.minMax'))
      .max(20, t('chat.minMax')),
  });

  const f = useFormik({
    initialValues: { body: '' },
    validationSchema,
    onSubmit: (values) => {
      const item = { id: uniqueId(), name: values.body, removable: true };
      addChannel(item);
      refetchChannels();
      dispatch(setActiveChannel(item));
      if (isError) {
        toast.error(error.data.message);
      } else {
        toast.success(t('chat.channelCreated'));
        onHide();
      }
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
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
              isInvalid={isError || f.errors.body}
              autoComplete="off"
            />
            {f.errors.body && (
              <p className="text-danger">{f.errors.body}</p>
            )}
          </FormGroup>
          <input className="btn btn-primary" type="submit" disabled={isLoading} value={t('chat.create')} />
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default addChannelModal;
