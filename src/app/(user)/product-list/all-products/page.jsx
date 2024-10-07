import extractMinimumNetValue from "@/utils/ExtractMinimumNetValue"
import { ProductListLayout } from "@/Components/ProductListLayout"
import { ProductCard } from "@/Components/ProductCard"
import { fetchCollectionData } from "@/actions/fetchCollectionData"
import { Pagination } from "@/Components/Pagination"



const Page = async () => {
    const products = await fetchCollectionData({ collectionName: "ProductSnapDetails", limitNo: 25 })
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
        <>

            <ProductListLayout heading="New Products landed on the store" >
                {
                    products.map((prop) => {
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
            <Pagination />
        </>
    )
}

export default Page