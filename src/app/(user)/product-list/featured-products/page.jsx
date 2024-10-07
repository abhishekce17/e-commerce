import extractMinimumNetValue from "@/utils/ExtractMinimumNetValue"
import { ProductListLayout } from "@/Components/ProductListLayout"
import { ProductCard } from "@/Components/ProductCard"
import { fetchCollectionData } from "@/actions/fetchCollectionData"
import { fetchCollectionWithWhere } from "@/actions/fetchCollectionWithWhere"



const Page = async () => {
    const featuredProductsIdFetch = await fetchCollectionData({ collectionName: "FeaturedProduct", limitNo: 25 });
    const featuredProductsIds = featuredProductsIdFetch.map(x => x.productId);
    const featuredProducts = await fetchCollectionWithWhere({ collectionName: "ProductSnapDetails", fieldPath: "productId", fieldPathValue: featuredProductsIds, condition: "in", orderFieldValue: "productName" })
    // const addToWishlist = async (product_id) => {
    //     const response = await fetch(`/api/UserInformation/UpdateWishlist/addToWishlist/${product_id}`)
    //     const result = await response.json();
    //     if (result.status === 200) {
    //         alert("Product is added to wishlist")
    //         context.setRefresh(prev => !prev);
    //     } else {
    //         alert('Something went wrong')
    //     }
    // }
    // const removeFromWishlist = async (product_id) => {
    //     const response = await fetch(`/api/UserInformation/UpdateWishlist/removeFromWishlist/${product_id}`)
    //     const result = await response.json();
    //     if (result.status === 200) {
    //         alert("Product is removed from wishlist")
    //         context.setRefresh(prev => !prev);
    //     } else {
    //         alert('Something went wrong')
    //     }
    // }

    return (
        <ProductListLayout heading="Featured Products" >
            {
                featuredProducts.map((prop) => {
                    return (
                        <ProductCard
                            key={prop.productId}
                            productInfo={prop}
                            href={{ pathname: `/product/${prop.productId}`, query: { ...extractMinimumNetValue(prop.variants)?.obj || "" } }}
                        />
                    )
                })
            }
        </ProductListLayout >
    )
}

export default Page