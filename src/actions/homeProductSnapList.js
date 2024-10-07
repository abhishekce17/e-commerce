"use server"
import { fetchCollectionData } from "./fetchCollectionData";
import { fetchCollectionWithWhere } from "./fetchCollectionWithWhere";

export async function homeProductSnapList() {
    //latest products
    const fetchData = await fetchCollectionData({ collectionName: "ProductSnapDetails", limitNo: 10 });
    //banner producst
    const dealFetchData = await fetchCollectionData({ collectionName: "SpecialDealseBannerProduct", limitNo: 10 });
    //selected product
    const selectedDealProduct = await fetchCollectionData({ collectionName: "SpecialDealseSelectedProducts", limitNo: 10 });
    let featuredProductsData = []
    try {

        //Fetching featured products
        const featuredProductsIdFetch = await fetchCollectionData({ collectionName: "FeaturedProduct", limitNo: 10 });
        const featuredProductsIds = featuredProductsIdFetch.map(x => x.productId);
        const featuredProductsData = await fetchCollectionWithWhere({ collectionName: "ProductSnapDetails", fieldPath: "productId", fieldPathValue: featuredProductsIds, condition: "in", orderFieldValue: "productName" })
        return { data: fetchData, bannerProduct: dealFetchData, selectedDealFetch: selectedDealProduct, featuredProductsData: featuredProductsData, status: 200 }

    } catch (error) {
        console.log(error);
        return { data: fetchData, bannerProduct: dealFetchData, selectedDealFetch: selectedDealProduct, featuredProductsData: featuredProductsData, status: 500, error: true }
    }
}