import { useContext } from 'react';

export default function Dashboard() {
  // useEffect(() => {
  //   fetch('http://localhost:4000/dashboard', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   })
  //     .then((response) => response.json())
  //     .then((user) => {
  //       // console.log('Dashboard component -> user', user);
  //     });
  // }, []);

  return <h1>Dashboard</h1>;
}
