import { ProductCard } from './ProductCard'
import { ProductListLayout } from './ProductListLayout'
import extractMinimumNetValue from '@/utils/ExtractMinimumNetValue'

const NewArrivals = ({ products }) => {

    return (
        <ProductListLayout heading="New Products landed on the store" href="/product-list/all-products" >
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
    )
}

export default NewArrivals