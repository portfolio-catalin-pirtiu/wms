import { ReactElement } from "react"

export default function AddProduct() {
  interface TestProps {
    text: string,
    children: () => string
  }
  function Test({text, children}: TestProps) {
    return <h2>Test Component Props{text}{children()}</h2>
  }
  return (
    <>
      <h1>Add Product to Inventory</h1>
      <Test text="right now">{() => "Hello Everyone"}</Test>
    </>
  )
}