import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface DeleteAccountModalProps {
  handleDeleteAccount: () => void;
}

export default function DeleteAccountModal({
  handleDeleteAccount,
}: DeleteAccountModalProps) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button type="button" variant="danger" onClick={handleShow}>
        Delete Account
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure that you want to <b>Delete</b> this account?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
