import { useEffect, useState } from 'react';
import Alma from './Alma';

export default function Demo() {

  let ignore = false;
  console.log('ignore value', !ignore)
  if (!ignore) {
    console.log('if statement -> true')
  }
  // const [count, setCount] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => setCount(count + 1), 3000);
  //   return () => clearInterval(interval);
  // }, [count]);

  // console.log('Demo render');
  

  return (
    <>
      <h1>Demo</h1>
      <Alma/>
    </>
  );
}
