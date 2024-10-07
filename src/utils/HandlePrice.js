export function handlePrice(details, selectedVariant) {
    let obj;
    if (details.price !== undefined && details.price !== "" && details.price !== null && details.price !== 0) {
        return { price: details.price, discount: details.discount }
    } else {
        for (const key in selectedVariant) {
            const priceObj = details.variants.filter(x => x.type.some((val) => "price" in val))[0].type.filter(x => x.variant === selectedVariant[key])[0]
            if (priceObj !== undefined) {
                obj = priceObj
            }
        }
        return { price: obj?.price || 0, discount: obj?.discount || 0 };
    }
}
