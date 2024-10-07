import Featured from '@/Components/Featured'
import Deals from '@/Components/Deals'
import Carousel from '@/Components/Carousel';
import NewArrivals from '@/Components/NewArrivals'
import { homeProductSnapList } from '@/actions/homeProductSnapList'

export default async function Home() {
  const allProductSnapDetails = await homeProductSnapList();;
  return (
    <>
      <Carousel products={allProductSnapDetails.bannerProduct} />
      <Deals products={allProductSnapDetails.selectedDealFetch} />
      <Featured products={allProductSnapDetails.featuredProductsData} />
      <NewArrivals products={allProductSnapDetails.data} />
    </>
  )
}
