"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/CategoryManagment.module.css"
import { RiSearch2Line } from 'react-icons/ri'
import { BiEditAlt } from "react-icons/bi"
import { MdDeleteOutline } from 'react-icons/md'
import { ImCircleDown } from 'react-icons/im'
import { useRouter } from 'next/navigation'
import Loading from '../loading'

const Page = () => {
  let router = useRouter()
  const [isSelected, setIsSelected] = useState(false);
  const [subSelection, setSubSelection] = useState("")
  const [optionsSelection, setOptionsSelection] = useState("")
  const [categories, setCategories] = useState([])
  const handleSelection = (index) => {
    setIsSelected((prev) => index === prev ? false : index)
    setSubSelection("")
    setOptionsSelection("")
  }
  const handleSubSelection = (lable) => {
    setSubSelection((prev) => lable === prev ? "" : lable)
    setOptionsSelection("")
  }
  const handleOptionSelection = (option) => {
    setOptionsSelection((prev) => option === prev ? "" : option)
  }
  const handleClick = (route) => {
    router.push("/administrator/admin/category-managment/" + route)
  }



  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("/api/AdminCategories/FetchCategories")
      const resultData = await response.json()
      setCategories(resultData.data)
    }
    fetchCategories()
  }, [])

  return (
    <div className={styles.category_managemnet} >
      <div className={styles.view_category} >
        <div className={styles.top_bar} >
          <div> <RiSearch2Line style={{ position: "relative", top: "4px" }} /> <input type='text' placeholder='Search...' /> </div>
          <button onClick={() => { handleClick("add-category") }} >+ New Category</button>
        </div>
        <div className={styles.headings} >
          <div>Category</div>
          <div>Products</div>
          <div>Sales</div>
          <div>Category Revenue</div>
          <div>Actions</div>
        </div>

        {categories.length ? categories.map((categoryData, index) => {
          return (
            <div key={index} className={`${styles.category_info}  ${isSelected === index ? styles.selected : undefined}`} >
              <div>
                <div>
                  <ImCircleDown onClick={() => { handleSelection(index) }} className={styles.list_style} />
                  <p> {categoryData.category} </p>
                </div>
                <div> {categoryData.productCount} </div>
                <div>{categoryData.categorySales}</div>
                <div>{categoryData.totalSaleAmount}</div>
                <div className={styles.action_icons} > <div onClick={() => { handleClick("edit-category/" + categoryData.categoryId) }} ><BiEditAlt /> Edit</div> <div> <MdDeleteOutline /></div> </div>
              </div>
              {isSelected === index &&
                <div className={styles.category_info_subgroup} >
                  <div className={styles.brand_names} >
                    <label onClick={() => { handleSubSelection("brand") }} className={subSelection === "brand" ? styles.selected : undefined} >
                      <ImCircleDown className={styles.list_style} />
                      Brands
                    </label>
                    {
                      subSelection === "brand" &&
                      <ul>
                        {
                          categoryData.categoryBrands.map((brand, key) => {
                            return <li key={key} > {brand} </li>
                          })
                        }
                      </ul>
                    }
                  </div>
                  <div className={styles.tags_options} >
                    <label onClick={() => { handleSubSelection("tags") }} className={subSelection === "tags" ? styles.selected : undefined} >
                      <ImCircleDown className={styles.list_style} />
                      Tags
                    </label>
                    {
                      subSelection === "tags" &&
                      <ul>
                        {
                          categoryData.filterTags.map((brand, key) => {
                            return <li key={key} > {brand} </li>
                          })
                        }
                      </ul>
                    }
                  </div>
                  <div className={styles.variant_options} >
                    <label onClick={() => { handleSubSelection("variant") }} className={subSelection === "variant" ? styles.selected : undefined} >
                      <ImCircleDown className={styles.list_style} />
                      Variants options
                    </label>
                    {
                      subSelection === "variant" &&
                      categoryData.defaultVariants.map((eachVariant, key) => {
                        return <div key={key} className={styles.options} >
                          <div onClick={() => { handleOptionSelection(eachVariant.title) }} >
                            <ImCircleDown className={`${styles.list_style} ${optionsSelection === eachVariant.title ? styles.selected : undefined} `} />
                            <label >{eachVariant.title}</label>
                            {
                              optionsSelection === eachVariant.title &&
                              <ul>
                                {eachVariant.type.map((type, innerKey) => {
                                  return <li key={innerKey} > {type.variant} </li>
                                })}
                              </ul>
                            }
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
              }
            </div>
          )
        })
          : Loading()
        }

      </div>
    </div>
  )
}

export default Page