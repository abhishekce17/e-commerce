"use client"
import AdminProdcutActionPage from '@/Components/AdminProductAction'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Loading from '../../loading';


const page = () => {
  const router = useRouter()
  const [categories, setCategories] = useState(null)

  async function handleAddProduct(formDataAPI) {
    const res = await fetch(`/api/add-products`, {
      method: "POST",
      body: formDataAPI,
    });
    const result = await res.json()
    if (result.status === 200) {
      router.replace("/administrator/admin/product-managment")
    }




  };
  async function fetchCategories() {
    const response = await fetch("/api/AdminCategories/FetchCategories")
    const resultData = await response.json()
    setCategories(resultData.data)
  }

  useEffect(() => {
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

export default page