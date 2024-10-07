// Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
export default function cloudinaryLoader({ src, width, quality }) {
    src = src.split("/").reverse()[0];
    const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
    return `https://res.cloudinary.com/dnbfy78fe/image/upload/${params.join(',')}/v1697040581/E-Commerce/${src}`
}