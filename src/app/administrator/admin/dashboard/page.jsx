"use client"
import React, { useEffect, useState } from 'react'
import styles from "@/Styles/AdminLayout.module.css"
import { BsArrowUpRight, BsFillClipboard2CheckFill, BsFillClipboardPlusFill, BsPersonLinesFill } from 'react-icons/bs';
import { FaBoxOpen } from "react-icons/fa"
import { MdPendingActions } from 'react-icons/md';
import Link from 'next/link';
import { BiChevronsRight, BiRefresh } from 'react-icons/bi';
import DoubleLineGraphChart from '@/Components/DoubleLineGraphChart';
import PieChart from '@/Components/PieChart';
import Image from 'next/image';

const page = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const [totalSales, setTotalSales] = useState(0)
  const [totalOrsers, setTotalOrders] = useState({ order: 0, accepted: 0, pending: 0 })
  const [totalCustomers, setTotalCustomers] = useState(0)
  const [monthlyGrowth, setMonthlyGrowth] = useState({ order: 0, sales: 0, customer: 0 })
  const [graphData, setGraphData] = useState({
    monthlyOrders: [],
    monthlyRevenue: []
  })
  const [pieChartData, setPieChartData] = useState({
    categories: [],
    sales: []
  })

  const fetchReport = async () => {
    try {
      const response = await fetch("/api/AdminDashboard/Analytics");
      const result = await response.json();

      if (result.status === 200) {
        const { YearlyReport, MonthlyReport, categoryData } = result.fetchedData;
        const currentYear = new Date().getFullYear();
        const currentMonth = monthNames[new Date().getUTCMonth()].toLowerCase();
        console.log(categoryData)
        // Update total sales
        const yearlyData = YearlyReport.find((x) => x.ReportYear === currentYear);
        setTotalSales(
          yearlyData.totalSales.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
          })
        );

        // Update total orders
        setTotalOrders({
          order: yearlyData.totalOrder.toLocaleString("en-IN", {
            useGrouping: true,
          }),
          accepted: (546).toLocaleString("en-IN", {
            useGrouping: true,
          }),
          pending: (46).toLocaleString("en-IN", {
            useGrouping: true,
          }),
        });

        // Update total customers
        setTotalCustomers((566).toLocaleString("en-IN", { useGrouping: true }));

        // Update monthly growth
        const currentMonthData = MonthlyReport.find(
          (x) => x[currentMonth] !== undefined
        );
        setMonthlyGrowth({
          order: currentMonthData[currentMonth].totalOrder,
          customer: currentMonthData[currentMonth].customerGrowth,
          sales: currentMonthData[currentMonth].totalRevenueGenerated,
        });

        // Update graph data
        const monthlyOrders = MonthlyReport.map((data, index) =>
          data[monthNames[index].toLowerCase()].totalOrder
        );
        const monthlyRevenue = MonthlyReport.map((data, index) =>
          data[monthNames[index].toLowerCase()].totalRevenueGenerated
        );
        setGraphData({
          monthlyOrders,
          monthlyRevenue,
        });
        setPieChartData({
          categories: categoryData.map(x => x.category),
          sales: categoryData.map(x => x.totalSaleAmount)
        })
      } else {
        alert("Error: " + result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching data.");
    }
  };



  useEffect(() => {
    // setTotalSales((125796).number.toLocaleString('en-IN', {useGrouping: true}))
    fetchReport()
    // let totalSales = "1,23,456";
  }, [])

  return (
    <div className={styles.dashboard} >
      <div className={styles.dashboard_container} >
        <div className={styles.revenue} >
          <div>
            <BsFillClipboardPlusFill />
            <span> Total sales</span>
          </div>
          <p>{totalSales}</p>
          <div>
            {/* <span> <BsArrowUpRight /> 12%</span> */}
            <span><BsArrowUpRight /> {Math.round(monthlyGrowth.sales)} in {monthNames[new Date().getUTCMonth()]} </span>
          </div>
        </div>
        <div className={styles.orders} >
          <div>
            <div>
              <FaBoxOpen />
              <span> Total Orders</span>
            </div>
            <p>{totalOrsers.order}</p>
            <div>
              {/* <span> <BsArrowUpRight /> 12%</span> */}
              <span><BsArrowUpRight /> {Math.round(monthlyGrowth.order)} in {monthNames[new Date().getUTCMonth()]} </span>
            </div>
          </div>
          <div className={styles.orders_details} style={{ borderLeft: "1px solid var(--light-bg-color)", paddingLeft: "25px" }} >
            <div>
              <span><BsFillClipboard2CheckFill /> Accepted</span>
              <span>{totalOrsers.accepted}</span>
            </div>
            <div>
              <span><MdPendingActions /> Pending</span>
              <span>{totalOrsers.pending}</span>
            </div>
          </div>
        </div>
        <div className={styles.customers} >
          <div>
            <BsPersonLinesFill />
            <span> Total Customers</span>
          </div>
          <p>{totalCustomers}</p>
          <div>
            {/* <span> <BsArrowUpRight /> 12%</span> */}
            <span><BsArrowUpRight /> {Math.round(monthlyGrowth.customer)} in {monthNames[new Date().getUTCMonth()]} </span>
          </div>
        </div>
        <div className={styles.graph} >
          <DoubleLineGraphChart monthlyOrders={graphData.monthlyOrders} monthlyRevenue={graphData.monthlyRevenue} />
        </div>
        <div className={styles.pie_chart} >
          <center style={{ paddingBottom: "10px" }} >
            <strong>Sales by category</strong>
          </center>
          <PieChart categories={pieChartData.categories} sales={pieChartData.sales} />
        </div>
        <div className={styles.recent_orders} >
          <center>
            <strong>Recent Orders</strong>
          </center>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
          <div  >
            <span><Image width={80} height={80} src={"/category.jpg"} alt='name' /></span>
            <div>
              <span> Nothing Phone 1 144Htz smooth screen 8 gen + 1 </span>
              <div> <span>Accepted</span> <span>$152</span> </div> </div>
          </div>
        </div>
        <div className={styles.top_products} >
          <center style={{ paddingBottom: "10px" }} >
            <strong>Top Products</strong>
          </center>
          <div className={styles.heading_row} >
            <div>Product name</div>
            <div>Price</div>
            <div>Sold</div>
            <div>Sales</div>
          </div>
          <div className={styles.value_row} >
            <div>nothing phone 1 144 htz smooth</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>nothing phone 1</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>nothing phone 1</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>realme 11 pro +</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
          <div className={styles.value_row} >
            <div>samsung galaxy s23 ultra</div>
            <div>123456</div>
            <div>12345</div>
            <div>12345569</div>
          </div>
        </div>
      </div>
      <button className={styles.refreshData} >
        <BiRefresh />
      </button>
    </div>
  )
}

export default page