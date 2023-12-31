import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Stack from 'react-bootstrap/Stack';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { IWarehouse, IWarehouseGroupProps } from '@features/inventory';
import useLocalStorage from '../../../../../../../hooks/useLocalStorage';
import { serverBaseUrl } from '../../../../../../../data/constants';
import { Warehouse } from '@features/inventory';
import { CommunicationContext } from '../../../../../../../context/CommunicationsProvider';

const warehouseSchema = object().shape({
  name: string().required('The Warehouse Name is required'),
  address1: string(),
  address2: string(),
  city: string(),
  county: string(),
  country: string(),
  postcode: string(),
});

export default function EditWarehouses({
  warehouses,
  onWarehouseChange,
}: IWarehouseGroupProps) {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [warehouseToEdit, setWarehouseToEdit] =
    useLocalStorage('selectedWarehouse');
  const [formValues] = warehouses.filter(
    (warehouse) => warehouse.id === warehouseToEdit.id,
  );
  const { setSuccessMessage, setErrorMessage } =
    useContext(CommunicationContext);

  function handleUpdateWarehousesState(updatedWarehouse: IWarehouse) {
    const updatedWarehouses = warehouses.map((warehouse) => {
      if (warehouse.id === updatedWarehouse.id) {
        return updatedWarehouse;
      }
      return warehouse;
    });
    onWarehouseChange(updatedWarehouses);
  }

  async function handleUpdateWarehouse(formValues: IWarehouse) {
    handleCloseModal();
    const updatedWarehouse = new Warehouse(formValues);
    const updateWarehouseUrl = new URL(
      `inventory/warehouse/edit/${updatedWarehouse.id}`,
      serverBaseUrl,
    );

    try {
      const updateWarehouseRequest = await fetch(updateWarehouseUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWarehouse),
        credentials: 'include',
      });
      if (updateWarehouseRequest.ok) {
        handleUpdateWarehousesState(updatedWarehouse);
        setSuccessMessage(
          `${updatedWarehouse.name} Warehouse Updated Successfully`,
        );
      } else {
        const error: string = await updateWarehouseRequest.json();
        throw new Error(error);
      }
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  }

  function WarehousesList() {
    return (
      <Dropdown className="mb-2" role="list">
        <Dropdown.Toggle variant="secondary">
          {warehouseToEdit.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {warehouses.map((warehouse) => (
            <Dropdown.Item
              key={warehouse.id}
              onClick={() => setWarehouseToEdit(warehouse)}
            >
              {warehouse.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShowModal}>
        Edit Warehouses
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Warehouses</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={formValues}
          onSubmit={handleUpdateWarehouse}
          validationSchema={warehouseSchema}
          enableReinitialize={true}
        >
          {({ handleSubmit, handleChange, touched, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <WarehousesList />

                <Stack gap={3}>
                  <InputGroup>
                    <FloatingLabel
                      controlId="floatingInputName"
                      label="Warehouse Name"
                    >
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Warehouse Name"
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback
                        type={errors.name ? 'invalid' : 'valid'}
                      >
                        {errors.name ? errors.name : 'Looks Good!'}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </InputGroup>

                  <FloatingLabel
                    controlId="floatingInputAddress1"
                    label="Address 1"
                  >
                    <Form.Control
                      type="address"
                      name="address1"
                      placeholder="Address 1"
                      autoComplete="on"
                      value={values.address1}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInputAddress2"
                    label="Address 2"
                  >
                    <Form.Control
                      type="text"
                      name="address2"
                      placeholder="Address 2"
                      autoComplete="on"
                      value={values.address2}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInputCity" label="City">
                    <Form.Control
                      type="text"
                      name="city"
                      placeholder="City"
                      autoComplete="on"
                      value={values.city}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel controlId="floatingInputCounty" label="County">
                    <Form.Control
                      type="text"
                      name="county"
                      placeholder="County"
                      autoComplete="on"
                      value={values.county}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInputCountry"
                    label="Country"
                  >
                    <Form.Control
                      type="text"
                      name="country"
                      placeholder="Country"
                      autoComplete="country-name"
                      value={values.country}
                      onChange={handleChange}
                    />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="floatingInputPostcode"
                    label="Postcode"
                  >
                    <Form.Control
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      autoComplete="postal-code"
                      value={values.postcode}
                      onChange={handleChange}
                    />
                  </FloatingLabel>
                </Stack>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
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
