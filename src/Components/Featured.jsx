import { ProductListLayout } from './ProductListLayout'
import { ProductCard } from './ProductCard'
import extractMinimumNetValue from '@/utils/ExtractMinimumNetValue'

const Featured = ({ products }) => {
    return (
        <ProductListLayout heading="Featured Products" href="/product-list/featured-products" >
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

export default Featured