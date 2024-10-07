"use client"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { OutlineButton } from "./OutlineButton";
import { CartProductCard } from "./CartProductCard";
import { PrimaryButton } from "./PrimaryButton";

const CartComponent = () => {
    const router = useRouter();
    const { cartProducts, savedItems, totalExpenditure } = useSelector(state => state.userCart)
    const handleProceedToCheckout = () => {
        router.push("/place-your-order/order-summary");
    };

    return (<>
        <div className="lg:flex gap-4" >
            <div className="grow bg-white rounded-md border p-3" >
                <h3>Cart Items:</h3>
                <div className="mt-3" >
                    {cartProducts.length > 0 ? (
                        cartProducts.map((item, index) => (
                            <CartProductCard key={`${item.productId} ${item.variant}`} item={item} />
                        ))
                    ) : (
                        <p>Your cart is empty. Continue shopping!</p>
                    )}
                </div>
                {savedItems.length ?
                    <>
                        <h3>Save for Later:</h3>
                        <div className="mt-3" >
                            {savedItems.map((item, index) => (
                                <CartProductCard key={`${item.productId} ${item.variant}`} item={item} savedItem="true" />
                            ))}
                        </div>
                    </>
                    :
                    undefined}
            </div>
            {cartProducts.length ? <div className="w-max h-max flex flex-col bg-white gap-2 p-4 rounded sticky top-20" >
                <p className="text-xl font-medium" >Items : {totalExpenditure.totalQuantity}</p>
                <p className="text-xl font-medium " >Total : ₹{totalExpenditure.totalAmount.toLocaleString("en-IN", { useGrouping: true })}</p>
                <PrimaryButton onClick={handleProceedToCheckout} label="Proceed to Checkout" />
                <OutlineButton className="rounded-md w-full" href="/" label="Continue Shopping" />
            </div> : undefined}
        </div>
    </>
    );
};

export default CartComponent;
