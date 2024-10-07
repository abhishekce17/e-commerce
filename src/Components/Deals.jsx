import { ProductListLayout } from './ProductListLayout'
import { ProductCard } from './ProductCard'
import extractMinimumNetValue from '@/utils/ExtractMinimumNetValue'

const Deals = ({ products }) => {

    return (
        <ProductListLayout heading="Special offer on selected products" href="/product-list/all-products" >
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

export default Deals