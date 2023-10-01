"use client";
import React, { useState, useEffect } from "react";
import allPincodes from "@/app/pincode.json";
import styles from "@/Styles/InventoryManagment.module.css";
import { RiSearch2Line } from "react-icons/ri";
import axios from "axios";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import Loading from "../loading";


const Page = () => {
  const [selectedPincode, setSelectedPincode] = useState([431206]);
  const [pincodes, setPincodes] = useState(allPincodes);
  const [Cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [productStocksInfo, setProductStockInfo] = useState([]);
  const [filteredProductInfo, setFilteredProductInfo] = useState([]);
  const [upperBarValue, setUpperBarValue] = useState("product-stocks");
  const [updatedProductsId, setUpdatedProductsId] = useState(new Set())


  useEffect(() => {
    const fetchCities = async () => {
      try {
        const { data } = await axios.get(
          "https://countriesnow.space/api/v0.1/countries/state/cities/q?country=India&state=Maharashtra"
        );
        setCities(data.data);
      } catch (error) {
        console.log("Error fetching cities:", error);
      }
    };

    const fetchingAllProductsSnap = async () => {
      try {
        const res = await fetch(`/api/product-revenue-details`, {
          method: "GET",
        });
        const result = await res.json();
        if (result.status === 200) {
          setProductStockInfo(result.data);
          setFilteredProductInfo(result.data)
        }
      } catch (error) {
        console.log("Error fetching product data:", error);
      }
    };

    async function fetchCategories() {
      const response = await fetch("/api/AdminCategories/FetchCategories")
      const resultData = await response.json()
      setCategories(resultData.data)
    }
    fetchCities();
    fetchingAllProductsSnap();
    fetchCategories()
  }, []);

  const handleFilterSelection = (e) => {
    if (upperBarValue === "deliverable-pincode") {
      const newPincodeArray = allPincodes.filter((value) => value.districtName === e.target.value);
      setPincodes(newPincodeArray);
      setSelectAll(false);
    } else {
      if (e.target.value !== "") {
        const newProductInfoArray = productStocksInfo.filter((value) => value.category === e.target.value);
        setFilteredProductInfo(newProductInfoArray);
      } else {
        setFilteredProductInfo(productStocksInfo);
      }
    }
  };

  const handleSelectAll = (e) => {
    const filteredPincodes = pincodes.map((value) => value.pincode);
    setSelectAll(e.target.checked);
    setSelectedPincode((prevSelected) =>
      e.target.checked
        ? [...new Set([...prevSelected, ...filteredPincodes])]
        : prevSelected.filter((selected) => !filteredPincodes.includes(selected))
    );
  };

  const handleSubmit = async () => {
    if (upperBarValue === "product-stocks") {
      const response = await fetch("/api/inventory/AdminUpdateStocks", {
        method: "POST",
        body: JSON.stringify({ data: Array.from(updatedProductsId) })
      })
      const result = await response.json()
      if (result.status === 200) {
        alert('Updated Successfully')
      }
    }
    else if (upperBarValue === "deliverable-pincode") {
      const response = await fetch("/api/inventory/AdminDeliveryPincode", {
        method: "POST",
        body: JSON.stringify({ data: selectedPincode })
      })
      const result = await response.json()
      if (result.status === 200) {
        alert('Added Successfully')
      }
    }
  };

  const updateProductStocks = (index, operation, varinatIndex, typeIndex, e) => {
    const updatedProductStocks = [...filteredProductInfo];
    if (varinatIndex === undefined && typeIndex === undefined) {

      const currentStock = updatedProductStocks[index]?.stock || 0;
      if (operation === "increament") {
        updatedProductStocks[index].stock = Number(currentStock) + 1;
      } else if (operation === "decreament" && currentStock > 0) {
        updatedProductStocks[index].stock = Number(currentStock) - 1;
      } else {
        updatedProductStocks[index].stock = parseInt(operation.target.value, 10) || 0;
      }
    }
    else {
      const currentStock = updatedProductStocks[index]?.variants[varinatIndex].type[typeIndex].stock || 0;
      if (operation === "increament") {
        updatedProductStocks[index].variants[varinatIndex].type[typeIndex].stock = Number(currentStock) + 1;
      } else if (operation === "decreament" && currentStock > 0) {
        updatedProductStocks[index].variants[varinatIndex].type[typeIndex].stock = Number(currentStock) - 1;
      } else {
        updatedProductStocks[index].variants[varinatIndex].type[typeIndex].stock = parseInt(e.target.value, 10) || 0;
      }
    }
    setUpdatedProductsId((prevIds) => new Set(prevIds).add(filteredProductInfo[index]));
    setFilteredProductInfo(updatedProductStocks);
  };

  const handleCheckboxChange = (e, pincode) => {
    setSelectedPincode((prevSelected) =>
      e.target.checked
        ? [...prevSelected, pincode]
        : prevSelected.filter((selected) => selected !== pincode)
    );
  };

  const handleOptionClick = (option) => {
    setUpperBarValue(option);
  };

  return (
    <div className={styles.Inventory_managemnet}>
      <div className={styles.view_Inventory}>
        <div className={styles.upper_top_bar}>
          <div
            className={`${styles.option} ${upperBarValue === "product-stocks" && styles.selected}`}
            onClick={() => handleOptionClick("product-stocks")}
          >
            Product Stocks
          </div>
          <div
            className={`${styles.option} ${upperBarValue === "deliverable-pincode" && styles.selected}`}
            onClick={() => handleOptionClick("deliverable-pincode")}
          >
            Deliverable pincode
          </div>
        </div>
        <div className={styles.top_bar}>
          <div>
            <RiSearch2Line style={{ position: "relative", top: "4px" }} />
            <input type="text" placeholder="Search..." />
          </div>
          <div>
            <button onClick={handleSubmit}>Submit</button>
            {upperBarValue === "deliverable-pincode" ? (
              <select onChange={handleFilterSelection}>
                <option value="" defaultValue>
                  Filter by Cities
                </option>
                {Cities.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              <select onChange={handleFilterSelection}>
                <option value="" defaultValue>
                  Filter by Categories
                </option>
                {categories.map((value, index) => (
                  <option key={index} value={value.category}>
                    {value.category}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
        {Cities && productStocksInfo.length ? (
          <>
            {upperBarValue === "deliverable-pincode" ? (
              <>
                <div className={styles.headings}>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  <div>Post Office</div>
                  <div>Pincode</div>
                  <div>Taluka</div>
                  <div>District</div>
                  <div>State</div>
                </div>
                {pincodes.map((value, index) => (
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
                ))}
              </>
            ) : (
              <div className={styles.all_products}>
                {filteredProductInfo.map((value, index) => (
                  <div className={styles.product_info} key={index}>
                    <div style={{ position: "relative" }}>
                      <div className={styles.product_id}>{value.productId}</div>
                      <Image style={{ padding: "20px" }} src={value.productFirtsImgURL} width={300} height={300} alt={value.productName} />
                      <Link href={"/administrator/admin/product-managment/product-details/" + value.productId}>
                        <p>{value.productName}</p>
                      </Link>
                    </div>
                    <div>
                      {value.variants.length ?
                        value.variants.map((eachVariant, key) => (
                          eachVariant.type.map((eachType, innerKey) => (
                            <div key={[key, innerKey]} >
                              <div style={{ textAlign: "center", backgroundColor: "var(--light-bg-color)", color: "white", userSelect: "none" }} > {eachType.variant} </div>
                              <AiFillMinusSquare className={styles.increament} onClick={() => updateProductStocks(index, "decreament", key, innerKey)} />
                              <input
                                type="number"
                                value={eachType.stock || 0}
                                onChange={(e) => updateProductStocks(index, undefined, key, innerKey, e)}
                                min={0}
                              />
                              <AiFillPlusSquare className={styles.decreament} onClick={() => updateProductStocks(index, "increament", key, innerKey)} />
                            </div>
                          ))
                        ))
                        :

                        <div >
                          <div style={{ textAlign: "center", backgroundColor: "var(--light-bg-color)", color: "white", userSelect: "none" }} > Stock </div>
                          <AiFillMinusSquare className={styles.increament} onClick={() => updateProductStocks(index, "decreament")} />
                          <input
                            type="number"
                            value={value.stock}
                            onChange={(e) => updateProductStocks(index, e)}
                            min={0}
                          />
                          <AiFillPlusSquare className={styles.decreament} onClick={() => updateProductStocks(index, "increament")} />
                        </div>

                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Page;