import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Stack from 'react-bootstrap/Stack';
import { Formik, FormikValues } from 'formik';
import { object, string } from 'yup';

const passwordSchema = object().shape({
  oldPassword: string().required('Required'),
  newPassword: string().required('Required'),
});

interface PasswordModalProps {
  handlePasswordChange: (values: FormikValues) => void;
}

export default function PasswordModal({
  handlePasswordChange,
}: PasswordModalProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow}>Change Password</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>

        <Formik
          validationSchema={passwordSchema}
          initialValues={{ oldPassword: '', newPassword: '' }}
          onSubmit={handlePasswordChange}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Stack gap={3}>
                  <Form.Group id="old-password">
                    <FormControl
                      type="password"
                      name="oldPassword"
                      placeholder="Old Password"
                      aria-label="Required"
                      aria-describedby="old-password"
                      autoComplete="on"
                      value={values.oldPassword}
                      onChange={handleChange}
                      isValid={touched.oldPassword && !errors.oldPassword}
                      isInvalid={!!errors.oldPassword}
                    />
                    <FormControl.Feedback
                      type={errors.oldPassword ? 'invalid' : 'valid'}
                    >
                      {errors.oldPassword ? errors.oldPassword : 'Looks Good!'}
                    </FormControl.Feedback>
                  </Form.Group>

                  <Form.Group id="new-password">
                    <FormControl
                      type="password"
                      name="newPassword"
                      placeholder="New Password"
                      aria-label="Required"
                      aria-describedby="new-password"
                      autoComplete="on"
                      value={values.newPassword}
                      onChange={handleChange}
                      isValid={touched.newPassword && !errors.newPassword}
                      isInvalid={!!errors.newPassword}
                    />
                    <FormControl.Feedback
                      type={errors.newPassword ? 'invalid' : 'valid'}
                    >
                      {errors.newPassword ? errors.newPassword : 'Looks Good!'}
                    </FormControl.Feedback>
                  </Form.Group>
                </Stack>
              </Modal.Body>

              <Modal.Footer>
                <Button type="button" variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit">
                  <span onClick={handleClose}>Save Changes</span>
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
