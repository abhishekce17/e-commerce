"use client"
import AdminProdcutActionPage from '@/Components/AdminProductAction'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loading from '../../loading';


const Page = () => {
  const router = useRouter()
  const [categories, setCategories] = useState(null)

  async function handleAddProduct(formDataAPI) {
    // const res = await fetch(`/api/add-products`, {
    //   method: "POST",
    //   body: formDataAPI,
    // });
    // const result = await res.json()
    // if (result.status === 200) {
    //   router.replace("/administrator/admin/product-managment")
    // }
    try {
      console.log("calling")
      formDataAPI.append("upload_preset", "img3q8gt")
      // formDataAPI.append("multiple", "true")
      const response = await fetch(`https://api.cloudinary.com/v1_1/dnbfy78fe/upload`, {
        method: "POST",
        body: formDataAPI
      })
      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/AdminCategories/FetchCategories")
      const resultData = await response.json()
      setCategories(resultData.data)
    }
    fetchCategories()
  }, [])

  return (
    <div>
      {
        categories !== null ?
          <AdminProdcutActionPage handleAddProduct={handleAddProduct} categories={categories} />
          :
          Loading()
      }
    </div>
  )
}

export default Page