import { useState, useEffect } from 'react';

export default function Alma() {
 

  console.log('Alma render');
  return (
    <>
      <h1>Alma Component</h1>
      <AlmaChild/>
    </>
  );
}

function AlmaChild() {
  console.log('Alma Child render');
  return <h1>Alma Child</h1>;
}
