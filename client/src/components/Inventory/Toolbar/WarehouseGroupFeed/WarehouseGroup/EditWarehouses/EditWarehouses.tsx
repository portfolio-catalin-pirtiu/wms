import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Formik, FormikValues } from 'formik';
import useWarehouses from '../../../../../../customHooks/useWarehouses';
import { Warehouse, WarehouseProps } from '../../../../../../types/types';

export default function EditWarehouses() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const initialWarehouses = [
    { id: 0, name: 'Rochester' },
    { id: 1, name: 'Chatham' },
  ];
  const baseUrl = 'http://localhost:4000';
  const method = 'GET';

  const warehouses = useWarehouses({ baseUrl, method });

  function handleEditWarehouse(values: FormikValues) {}

  function WarehousesList() {
    return (
      <Dropdown role="list">
        <Dropdown.Toggle variant="secondary">Select warehouse</Dropdown.Toggle>
        <Dropdown.Menu>
          {warehouses.value.map((warehouse) => (
            <Dropdown.Item key={warehouse.id}>{warehouse.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Edit Warehouses
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Warehouses</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={initialWarehouses}
          onSubmit={handleEditWarehouse}
          // validationSchema={}
        >
          {({ handleSubmit, handleChange, touched, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <WarehousesList />
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit">Save</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
