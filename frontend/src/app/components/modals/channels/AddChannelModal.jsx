import {
  Button, Form, FormControl, FormGroup, Modal,
} from 'react-bootstrap'
import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import uniqueId from 'lodash.uniqueid'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { setActiveChannel } from '../../../slices/chatSlice'
import { useAddChannelMutation, useGetChannelsQuery } from '../../../services/ChannelsService'

const addChannelModal = (props) => {
  const { onHide } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [addChannel, { isLoading }] = useAddChannelMutation()
  const { data: channels } = useGetChannelsQuery()

  const formik = useFormik({
    initialValues: { body: '' },
    validationSchema: yup.object().shape({
      body: yup.string().trim().required(t('requiredField')).min(3, t('chat.minMax'))
        .max(20, t('chat.minMax'))
        .notOneOf(channels.map(item => item.name), t('chat.alreadyExist')),
    }),
    onSubmit: async (values) => {
      try {
        const newChannel = await addChannel({ id: uniqueId(), name: values.body, removable: true }).unwrap()
        dispatch(setActiveChannel(newChannel))
        toast.success(t('chat.addChannel.done'))
        onHide()
      }
      catch (e) {
        console.error(e)
        toast.error(t('chat.addChannel.error'))
      }
    },
  })

  const inputRef = useRef()
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('chat.addChannel.do')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              id="addChannel"
              data-testid="input-body"
              name="body"
              required
              onChange={formik.handleChange}
              value={formik.values.body}
              className="form-control mb-3"
              ref={inputRef}
              isInvalid={formik.errors.body}
              autoComplete="off"
            />
            <Form.Label htmlFor="addChannel" class="visually-hidden">{t('chat.channelName')}</Form.Label>
            {formik.errors.body && (
              <p className="text-danger">{formik.errors.body}</p>
            )}
          </FormGroup>
          <FormGroup className="d-flex gap-2 justify-content-end">
            <Button type="button" className="btn btn-secondary" onClick={onHide}>{t('cancel')}</Button>
            <input className="btn btn-primary" type="submit" disabled={isLoading} value={t('chat.add')} />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default addChannelModal
