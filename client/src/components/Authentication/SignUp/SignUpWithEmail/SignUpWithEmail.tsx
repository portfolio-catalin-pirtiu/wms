import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { object, string } from "yup";
import { Formik, FormikValues } from "formik";

const userSchema = object().shape({
  organizationName: string().required("Required"),
  email: string().email("Invalid email address").required("Required"),
  password: string().required("Required"),
  address1: string(),
  address2: string(),
  city: string(),
  county: string(),
  country: string()
});

export default function SignUpWithEmail() {
  function submitForm(values: FormikValues) {
    console.log("form submit event", values);
    fetch("http://localhost:4000/authentication/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => console.log(data))
  }

  return (
    <Formik
      validationSchema={userSchema}
      onSubmit={submitForm}
      initialValues={{
        organizationName: "",
        email: "",
        password: "",
        address1: "",
        address2: "",
        city: "",
        county: "",
        country: ""
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Container className="my-5">
          <h1>Sign up With Email</h1>
          <Container className="my-5">
            <Form noValidate onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="organization-name">
                  Organization Name
                </InputGroup.Text>
                <Form.Control
                  name="organizationName"
                  type="text"
                  autoComplete="on"
                  value={values.organizationName}
                  onChange={handleChange}
                  isValid={touched.organizationName && !errors.organizationName}
                  isInvalid={!!errors.organizationName}
                  placeholder="Required"
                  aria-label="Required"
                  aria-describedby="organization-name"
                />
                <Form.Control.Feedback
                  type={errors.organizationName ? "invalid" : "valid"}
                >
                  {errors.organizationName
                    ? errors.organizationName
                    : "Looks Good!"}
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="email">Email Address</InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Required"
                  aria-label="Required"
                  aria-describedby="email"
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback
                  type={errors.email ? "invalid" : "valid"}
                >
                  {errors.email ? errors.email : "Looks Good!"}
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="password">Password</InputGroup.Text>
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="password"
                  placeholder="Required"
                  aria-label="Required"
                  aria-describedby="password"
                  onChange={handleChange}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback
                  type={errors.password ? "invalid" : "valid"}
                >
                  {errors.password ? errors.password : "Looks good!"}
                </Form.Control.Feedback>
              </InputGroup>

              <Container className="my-5">
                <Form.Text>Optional Fields</Form.Text>
                <hr />
                <Form.Group className="mb-3" controlId="basicFormAddress1">
                  <Form.Control
                    type="address"
                    name="address1"
                    autoComplete="on"
                    placeholder="Address 1"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="basicFormAddress2">
                  <Form.Control
                    type="text"
                    name="address2"
                    autoComplete="on"
                    placeholder="Address 2"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="basicFormCity">
                  <Form.Control
                    type="text"
                    name="city"
                    autoComplete="on"
                    placeholder="City"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="basicFormCounty">
                  <Form.Control
                    type="text"
                    name="county"
                    autoComplete="on"
                    placeholder="County"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="basicFormCountry">
                  <Form.Control
                    type="text"
                    name="country"
                    autoComplete="country-name"
                    placeholder="Country"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="basicFormPostcode">
                  <Form.Control
                    type="text"
                    name="postcode"
                    autoComplete="postal-code"
                    placeholder="Postcode"
                    onChange={handleChange}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Sign Up
                </Button>
              </Container>
            </Form>
          </Container>
        </Container>
      )}
    </Formik>
  );
}
