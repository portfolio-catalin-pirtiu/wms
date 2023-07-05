import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';


export default function SignUp() {
  return (
    <Stack gap={2} className="col-md-4">
      <h1>Sign Up</h1>
    <Button type="submit" variant="dark">
      Sign up with Google
    </Button>

    <Button type="submit" variant="outline-primary">
      Sign up with Facebook
    </Button>

    <Button
      type="button"
      variant="primary"
      href="/authentication/signup/email"
    >
      Sign up with Email
    </Button>
  </Stack>
  )
}