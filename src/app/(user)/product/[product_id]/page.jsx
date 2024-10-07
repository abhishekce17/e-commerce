
import { fetchCollectionWithWhere } from '@/actions/fetchCollectionWithWhere';
import { fetchProductDetails } from '@/actions/fetchProductDetails';
import ProductDetail from '@/Components/ProductDetails'
import { convertStringToObject } from '@/utils/ConvertQueryToObject';
import { handlePrice } from '@/utils/HandlePrice';
import { headers } from 'next/headers';
import React from 'react'

export default async function page({ params }) {
  const { product_id } = params;
  const response = await fetchProductDetails({ productId: product_id });
  if (response.status !== 200) {
    return <div className="flex justify-center items-center" >{response.message}</div>
  }
  const header = headers();
  const searchParams = header.get("x-searchParams");
  let selectedVariant = {}
  if (searchParams) {
    selectedVariant = convertStringToObject(searchParams)
  }
  const similarProducts = await fetchCollectionWithWhere({
    collectionName: "ProductSnapDetails",
    condition: "==",
    fieldPath: "category",
    fieldPathValue: response.data.category,
    limitNo: 10,
    orderFieldValue: "productName"
  })

  const defaultPrice = handlePrice(response.data, selectedVariant);

  return (
    <ProductDetail
      productDetails={response.data}
      similarProducts={similarProducts}
      defaultSelectedVariant={selectedVariant}
      defaultPrice={defaultPrice}
    />
  )
}
