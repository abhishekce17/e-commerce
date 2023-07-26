import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import { collection, addDoc } from "firebase/firestore";
const cloudinary = require('cloudinary');
import cloudinary_config from "@/cloudinary-config/config";
const fs = require("fs")

export async function POST(req) {
    try {
        let imgUrl = []
        const formData = await req.formData();
        const body = JSON.parse(formData.get("body"))
        const imgFileArray = formData.getAll("file")
        const urlPromise = new Promise((resolve, reject) => {
            imgFileArray.forEach(async (imgFile) => {
                const fileBuffer = await imgFile.arrayBuffer();
                const buffer = Buffer.from(fileBuffer);
                const stream = cloudinary.v2.uploader.upload_stream(
                    { resource_type: 'auto', folder: 'E-Commerce' }, // Cloudinary options
                    (error, result) => {
                        if (error) {
                            console.error('Error uploading image:', error);
                            NextResponse.json({ statu: 500, error })
                            return reject(error)
                        } else {
                            imgUrl.push(result.url)
                            if (imgFileArray.length === imgUrl.length) resolve()
                        }
                    }
                );
                stream.end(buffer);
            })
        })
        await urlPromise
        body.imgURLs = imgUrl
        await addDoc(collection(db, "products"), body);
        return NextResponse.json({ status: 200 })
    } catch (e) {
        console.log('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
