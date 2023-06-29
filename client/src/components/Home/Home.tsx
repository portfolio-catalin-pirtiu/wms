import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <Container>
        <div className="d-grid gap-2">
          <Button href="/authentication" variant="dark" size="lg">Login or Sign up</Button>
        </div>
      </Container>
    </>
  )
}