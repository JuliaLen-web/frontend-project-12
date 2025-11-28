import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAddMessageMutation } from '../../../services/MessageService';
import { selectorActiveChannel } from '../../../slices/chatSlice';
import { useAuth } from '../../../../hooks/useAuth';

const MessageForm = () => {
  const auth = useAuth();
  const inputMessage = useRef();
  const activeChannel = useSelector(selectorActiveChannel);

  const [addMessage, { isLoading }] = useAddMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      inputMessage.current?.focus();
      try {
        await addMessage({ body: values.message, channelId: activeChannel.id, username: auth.user });
        values.message = '';
      } catch (e) {
        toast.error('Не удалиось отправить сообщение');
      }
    },
  });

  useEffect(() => {
    inputMessage.current?.focus();
  }, [activeChannel]);

  return (
    <div className="mt-auto px-md-5 py-md-3 px-2 py-2">
      <form onSubmit={formik.handleSubmit} noValidate="" className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            name="message"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            onChange={formik.handleChange}
            value={formik.values.message}
            ref={inputMessage}
            autoComplete="off"
          />
          <button type="submit" disabled={formik.values.message.trim() === '' || isLoading} className="btn btn-group-vertical">
            {isLoading
              ? <Spinner animation="border" variant="primary" size="sm" />
              : <ArrowRightSquare />}
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
};
export default MessageForm;
