import styles from './page.module.css'
import Banner from '@/Components/Banner'
import Featured from '@/Components/Featured'
import Deals from '@/Components/Deals'
// import Footer from '@/Components/Footer'
import NewArrivals from '@/Components/NewArrivals'
import TopCategory from '@/Components/TopCategory'

export default function Home() {
  return (<>
    <main>
      <Banner
        buy_link=""
        banner_img="/banner_img.jpg"
        banner_text="Nothing Phone 2 8 GEN+ 2 launching on 2nd July, 120 Hz smoothness"
      />
      <Deals />
      <Featured />
      <NewArrivals />
      <TopCategory />
    </main>
      {/* <Footer/> */}
  </>
  )
}
