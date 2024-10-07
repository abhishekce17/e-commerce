import { fetchCartProducts } from '@/actions/fetchCartProducts'
import CartComponent from '@/Components/CartComponent'
import ClientComponentWrapper from '@/Components/ClientComponentWrapper';
import React from 'react'

const page = async () => {
  const response = await fetchCartProducts();
  if (response.status !== 200) {
    return <div className="flex justify-center items-center" >{response.message}</div>
  }
  return (
    <ClientComponentWrapper userCart={response} >
      <CartComponent cartProducts={response.Cart} totalAmount={response.totalAmount} totalItems={response.totalItems} savedItems={response.savedItems} />
    </ClientComponentWrapper>
  )
}

export default page