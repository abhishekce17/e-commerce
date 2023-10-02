import React from 'react'
import styles from "@/Styles/LoadingAnimation1.module.css"

const LoadingAnimation1 = () => {
    return (
        <div className={styles.homePage}>
            <div className={styles.banner} ></div>
            <div className={styles.heading} ></div>
            <div className={styles.productSkeleton} >
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div className={styles.heading} ></div>
            <div className={styles.productSkeleton} >
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default LoadingAnimation1