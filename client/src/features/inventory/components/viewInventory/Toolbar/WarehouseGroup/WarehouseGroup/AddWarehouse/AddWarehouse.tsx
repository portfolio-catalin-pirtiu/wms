import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Stack from 'react-bootstrap/Stack';
import InputGroup from 'react-bootstrap/InputGroup';
import { Formik } from 'formik';
import { object, string, number } from 'yup';
import { AuthenticationContext } from '../../../../../../../../context/AuthenticationProvider';
import { CommunicationContext } from '../../../../../../../../context/CommunicationsProvider';
import { IWarehouse, IWarehouseGroupProps } from '@features/inventory';
import { serverBaseUrl } from '../../../../../../../../data/constants';

const warehouseSchema = object().shape({
  owner: number().required().positive().integer(),
  name: string().required('The Warehouse Name is required'),
  address1: string(),
  address2: string(),
  city: string(),
  county: string(),
  country: string(),
  postcode: string(),
});

export default function AddWarehouse({
  warehouses,
  onWarehouseChange,
}: IWarehouseGroupProps) {
  const addNewWarehouseToApi = new URL(
    'inventory/warehouse/new',
    serverBaseUrl,
  );
  const { user } = useContext(AuthenticationContext);
  const { setSuccessMessage, setErrorMessage } =
    useContext(CommunicationContext);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const warehouseInitialValues = {
    id: 0,
    owner: user.id || 0,
    name: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    country: '',
    postcode: '',
  };

  async function handleAddWarehouse(values: IWarehouse) {
    handleClose();
    try {
      const addWarehouseRequest = await fetch(addNewWarehouseToApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
        credentials: 'include',
      });

      if (addWarehouseRequest.ok) {
        onWarehouseChange([
          ...warehouses,
          { id: values.id, name: values.name },
        ]);
        setSuccessMessage('New Warehouse added successfully.');
      } else {
        const error: string = await addWarehouseRequest.json();
        throw new Error(error);
      }
    } catch (e) {
      if (e instanceof Error) {
        setErrorMessage(e.message);
      }
    }
  }

  return (
    <>
      <Button variant="secondary" onClick={handleShow}>
        Add Warehouse
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Warehouse</Modal.Title>
        </Modal.Header>

        <Formik
          initialValues={warehouseInitialValues}
          onSubmit={handleAddWarehouse}
          validationSchema={warehouseSchema}
        >
          {({ handleSubmit, handleChange, touched, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Control name="owner" defaultValue={values.owner} hidden />

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
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
