export default function extractMinimumNetValue(variants) {
    let obj = {}
    if (!Array.isArray(variants) || variants.length === 0) {
        return null; // Handle invalid input
    }

    let minNetValue = Number.MAX_VALUE;
    variants.forEach(variant => {
        if (Array.isArray(variant.type)) {
            variant.type.forEach(type => {
                if (type.price && !isNaN(Number(type.price))) {
                    const netValue = parseInt((type.price - (type.price * (type.discount / 100))));
                    if (netValue < minNetValue) {
                        minNetValue = netValue;
                        obj = { [variant.title]: type.variant }
                    }
                }
                obj = { [variant.title]: variant.type[0].variant, ...obj }
            });
        }
    });
    if (minNetValue === Number.MAX_VALUE) {
        return null; // No valid netValues found
    }
    return { minNetValue: minNetValue.toLocaleString("en-IN", { useGrouping: true }), obj };
}