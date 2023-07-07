"use client";
import React, { useState, useEffect } from "react";
import allPincodes from "@/app/pincode.json";
import styles from "@/Styles/InventoryManagment.module.css";
import { RiSearch2Line } from "react-icons/ri";
import axios from "axios";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const [selectedPincode, setSelectedPincode] = useState([431206]);
  const [pincodes, setPincodes] = useState(allPincodes);
  const [Cities, setCities] = useState([]);
  const [categories, setCategories] = useState(["Mobile", "Electronics", "Kitchen"])
  const [selectAll, setSelectAll] = useState(false);
  const [productStocksInfo, setProductStockInfo] = useState([
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Mobile"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Electronics"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Electronics"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Electronics"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Mobile"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Mobile"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Kitchen"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Kitchen"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Kitchen"
    },
    {
      product: "Nothing Phone 2 8 GEN 1+",
      product_image: "/category.jpg",
      productStock: 56,
      id: "#148562adf",
      category: "Mobile"
    },
  ]);
  const [filteredProductInfo, setFilteredProductInfo] = useState(productStocksInfo)
  const [upperBarValue, setUpperBarValue] = useState("product-stocks");
  const fetchCities = async () => {
    try {
      const response = await axios.get(
        `https://countriesnow.space/api/v0.1/countries/state/cities/q?country=India&state=Maharashtra`
      );
      const { data } = response.data;
      setCities(data);
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleFilterSelection = (e) => {
    if (upperBarValue === "deliverable-pincode") {
      let newPincodeArray = allPincodes.filter(
        (value) => value.districtName === e.target.value
      );
      setPincodes(newPincodeArray);
      setSelectAll(false);
    }
    else {
      if (e.target.value != "") {
        let newProductInfoArray = productStocksInfo.filter((value) => {
          return value.category === e.target.value
        })
        return setFilteredProductInfo(newProductInfoArray)
      }
      return setFilteredProductInfo(productStocksInfo)
    }
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      setSelectedPincode((prevSelected) => {
        const filteredPincodes = pincodes.map((value) => value.pincode);
        const newSelected = [
          ...new Set([...prevSelected, ...filteredPincodes]),
        ];
        return newSelected;
      });
    } else {
      setSelectedPincode((prevSelected) => {
        const filteredPincodes = pincodes.map((value) => value.pincode);
        const newSelected = prevSelected.filter(
          (selected) => !filteredPincodes.includes(selected)
        );
        return newSelected;
      });
    }
  };

  const handleSubmit = () => { };

  // const updateProductStocks = (e, index, operation) => {
  const updateProductStocks = (e, index, operation) => {
    const updatedProductStocks = [...productStocksInfo];
    const currentStock = updatedProductStocks[index].productStock;

    if (operation === "plus") {
      updatedProductStocks[index].productStock = currentStock + 1;
    } else if (operation === "minus" && currentStock > 0) {
      updatedProductStocks[index].productStock = currentStock - 1;
    } else {
      updatedProductStocks[index].productStock =
        parseInt(e.target.value, 10) || 0;
    }
    setProductStockInfo(updatedProductStocks);
  };

  // }

  const handleCheckboxChange = (e, pincode) => {
    setSelectedPincode((prevSelected) => {
      if (e.target.checked) {
        // Add the pincode if it doesn't exist in the array
        if (!prevSelected.includes(pincode)) {
          return [...prevSelected, pincode];
        }
      } else {
        // Remove the pincode if it exists in the array
        return prevSelected.filter((selected) => selected !== pincode);
      }
      return prevSelected;
    });
    console.log(selectedPincode);
  };

  const handleOptionClick = (option) => {
    setUpperBarValue(option);
  };

  return (
    <div className={styles.Inventory_managemnet}>
      <div className={styles.view_Inventory}>
        <div className={styles.upper_top_bar}>
          <div
            className={`${styles.option} ${upperBarValue === "product-stocks" && styles.selected
              }`}
            onClick={() => handleOptionClick("product-stocks")}
          >
            Product Stocks
          </div>
          <div
            className={`${styles.option} ${upperBarValue === "deliverable-pincode" && styles.selected
              }`}
            onClick={() => handleOptionClick("deliverable-pincode")}
          >
            Deliverable pincode
          </div>
        </div>
        <div className={styles.top_bar}>
          <div>
            {" "}
            <RiSearch2Line style={{ position: "relative", top: "4px" }} />{" "}
            <input type="text" placeholder="Search..." />{" "}
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>

            {upperBarValue === "deliverable-pincode" ?
              <select onChange={handleFilterSelection}>
                <option value="" defaultValue>
                  Filter by Cities
                </option>
                {Cities.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {" "}
                      {value}{" "}
                    </option>
                  );
                })}
              </select>
              :
              <select onChange={handleFilterSelection}>
                <option value="" defaultValue>
                  Filter by Categories
                </option>
                {categories.map((value, index) => {
                  return (
                    <option key={index} value={value}>
                      {" "}
                      {value}{" "}
                    </option>
                  );
                })}
              </select>
            }

          </div>
        </div>
        {upperBarValue === "deliverable-pincode" ? (
          <>
            <div className={styles.headings}>
              <input onChange={handleSelectAll} type="checkbox" />
              <div>Post Office</div>
              <div>Pincode</div>
              <div>Taluka</div>
              <div>District</div>
              <div>State</div>
            </div>
            {pincodes.map((value, index) => {
              return (
                <div key={index} className={styles.pincode_info}>
                  <input
                    type="checkbox"
                    checked={selectedPincode.includes(value.pincode)}
                    onChange={(e) => handleCheckboxChange(e, value.pincode)}
                  />
                  <div>{value.officeName}</div>
                  <div>{value.pincode}</div>
                  <div>{value.taluk}</div>
                  <div>{value.districtName}</div>
                  <div>{value.stateName}</div>
                </div>
              );
            })}
          </>
        ) : (
          <div className={styles.all_products}>
            {filteredProductInfo.map((value, index) => {
              return (
                <div className={styles.product_info} key={index}>
                  <div style={{ position: "relative" }} >
                    <div className={styles.product_id} >{value.id}</div>
                    <Image
                      src={value.product_image}
                      width={300}
                      height={300}
                      alt="name"
                    />
                    <Link
                      href={
                        "administrator/admin/product-managment/product-details/product_Id"
                      }
                    >
                      <p>{value.product}</p>
                    </Link>
                  </div>
                  <div>
                    <AiFillMinusSquare
                      onClick={(e) => {
                        updateProductStocks(e, productStocksInfo.indexOf(value), "minus");
                      }}
                    />
                    <input
                      type="number"
                      value={value.productStock}
                      onChange={(e) => {
                        updateProductStocks(e, productStocksInfo.indexOf(value));
                      }}
                      min={0}
                    />
                    <AiFillPlusSquare
                      onClick={(e) => {
                        updateProductStocks(e, productStocksInfo.indexOf(value), "plus");
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
