import styles from "@/Styles/wishlist.module.css"
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md"

const page = () => {
    // Dummy order data
    const orders = [
        {
            name: 'Product 1',
            image: '/category.jpg',
            price: '49.99',
            variant: 'Color: Black, Size: Medium',
        },
        {
            name: 'Product 2',
            image: '/category.jpg',
            price: '29.99',
            variant: 'Color: Blue, Size: Large',
        },
    ];

    return (
        <>
            <h3>My Wishlist</h3>
            <div className={styles.order_history}>
                {orders.map((product, orderIndex) => (
                    <div key={orderIndex} className={styles.each_order}>
                        <Image height={520} width={520} src={product.image} alt={product.name} />
                        <div>
                            <p>
                                <Link href={"/orderid"} >{product.name}</Link>
                                <span>{product.variant}</span>
                                <span>₹{product.price} <s>₹129</s></span>
                            </p>
                        </div>
                        <MdDelete className={styles.remove} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default page;
