"use client"
import AdminSidebar from "@/Components/AdminSidebar"
import styles from "@/Styles/AdminLayout.module.css"
const AdminLayout = ({ children }) => {
  return (
    <div style={{display:"flex", flexDirection:"row", backgroundColor:"#fff"}} >
      <div className={styles.sidebar_container} >
        <AdminSidebar />
      </div>
      {children}
    </div>
  )
}

export default AdminLayout