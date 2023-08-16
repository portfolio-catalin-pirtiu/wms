import { useState, useEffect } from 'react';

export default function Alma() {
  return (
    <>
      <h1>Alma Component</h1>
      <AlmaChild />
    </>
  );
}

function AlmaChild() {
  return <h1>Alma Child</h1>;
}
