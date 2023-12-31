"use client"
import styles from './page.module.css'
import Banner from '@/Components/Banner'
import Featured from '@/Components/Featured'
import Deals from '@/Components/Deals'
// import Footer from '@/Components/Footer'
import NewArrivals from '@/Components/NewArrivals'
import {useEffect, useState} from 'react'
import LoadingAnimation1 from '@/Components/LoadingAnimation1'

export default function Home() {
  const [topCategories, setTopCategories] = useState([]);
  const [bannerProducts, setBannerProducts] = useState([]);
  const [dealProducts, setDealProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProductSnapDetails, setAllProductSnapDetails] = useState([]);
  const [productLoading, setProductLoading] = useState(true);



  useEffect(() => {
    const fetchSnapDetails = async () => {
      try {
        // Use Promise.all to fetch data in parallel
        const [
          productSnapDetailResponse,
          featuredProductsResponse,
          allDealProductsResponse
        ] = await Promise.all([
          fetch("/api/limit-product-snap-details"),
          fetch("/api/AdminFeatured/LimitedFetch"),
          fetch("/api/AdminDealseSetting/LimitFetch")
        ]);

        const productSnapDetailData = await productSnapDetailResponse.json();
        const featuredProductsData = await featuredProductsResponse.json();
        const allDealData = await allDealProductsResponse.json();
        // Check for successful responses (status code 200)
        // console.log(productSnapDetailData)
        if (
          productSnapDetailData.status === 200 &&
          featuredProductsData.status === 200 &&
          allDealData.status === 200
        ) {
          // Parse response data

          // Update state with the fetched data
          setAllProductSnapDetails(productSnapDetailData.data);
          setBannerProducts(allDealData.data.bannerDeals);
          setDealProducts(allDealData.data.selectedDeals);
          setFeaturedProducts(featuredProductsData.data)
          setProductLoading(false);
          console.log(featuredProductsData.data)
        } else {
          // Handle non-200 responses here
          console.error("One or more API requests failed");
          alert("server isn't responding please try again later")
        }
      } catch (error) {
        // Handle fetch errors here
        console.error("Error fetching data:", error);
      }
    };

    fetchSnapDetails();
  }, []);



  return (<>
    {
      productLoading ? <LoadingAnimation1 /> :
        <main>
          {bannerProducts.length && <Banner
            products={bannerProducts} />}
          {dealProducts.length ? <Deals products={dealProducts} /> : undefined}
          {featuredProducts.length && <Featured products={featuredProducts} />}
          <NewArrivals products={allProductSnapDetails} />
        </main>
    }
    {/* <Footer/> */}
  </>
  )
}
