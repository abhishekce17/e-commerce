import CategoryProducts from "@/Components/CategoryProducts"
import { fetchCategoryProduct } from "@/actions/fetchCategoryProduct"

const Page = async ({ params }) => {
    const ctgry = decodeURIComponent(params.ctgry)
    const fetchData = await fetchCategoryProduct({ category: ctgry })
    return (
        <CategoryProducts categoryInfo={fetchData.categoryInfo} products={fetchData.categoryProducts} />
    )
}

export default Page