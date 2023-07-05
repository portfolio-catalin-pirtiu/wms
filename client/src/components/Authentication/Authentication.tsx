import Container from 'react-bootstrap/Container';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';

export default function Authentication() {
  return (
    <>
      <h1>Login or Sign up</h1>
      <Container className="container-sm my-5 align-align-items-center justify-content-center">
        <Login />
        <hr></hr>
        <SignUp />
      </Container>
    </>
  );
}
