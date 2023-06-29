import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Authentication() {
  return (
    <>
      <h1>Login or Sign up</h1>
      <Container className="container-sm my-5 align-align-items-center justify-content-center">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email Address" autoComplete="email"/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" autoComplete="password"/>
          </Form.Group>

          <Button type="submit" variant="primary">Login</Button>
        </Form>
        <hr></hr>

        <Form>
          <Form.Group className="mb-3" controlId="sign-up-with-google">
            <Button type="submit" variant="dark">Sign up using Google</Button>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group className="mb-3" controlId="sign-up-with-facebook">
            <Button type="submit" variant="primary">Sign up using Facebook</Button>
          </Form.Group>
        </Form>

        <Form>
          <Form.Group className="mb-3" controlId="sign-up-with-email">
            <Button type="button" variant="primary" href="/authentication/signup/email">Sign up using Email</Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  )
}