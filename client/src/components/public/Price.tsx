export default function Price() {

  async function getApi() {
    try {
      const request = await fetch('http://localhost:4000/dashboard');
      const response = await request.json();
    }catch(e) {

    }
  }
  return (
    <>
      <h1>Price</h1>
      <button onClick={getApi}>GET</button>
      
    </>
  );
}
