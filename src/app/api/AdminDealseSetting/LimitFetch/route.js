import { NextResponse } from "next/server";
import { db } from "@/config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const dynamic = "force-dynamic"
export async function GET() {
    try {
        let fetchBannerDeal = []
        let fetchSelectedDeal = []
        const querySnapshotPromis1 = new Promise(async (resolve, reject) => {
            const querySnapshot = await getDocs(collection(db, "SpecialDealseBannerProduct"));
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                fetchBannerDeal.push({ ...doc.data(), dealId: doc.id })
            });
            if (querySnapshot.size === fetchBannerDeal.length) resolve()
        })
        await querySnapshotPromis1
        const querySnapshotPromis2 = new Promise(async (resolve, reject) => {
            const querySnapshot = await getDocs(collection(db, "SpecialDealseSelectedProducts"));
            querySnapshot.forEach((doc) => {
                // console.log(doc.data())
                fetchSelectedDeal.push({ ...doc.data(), dealId: doc.id })
            });
            if ((querySnapshot.size === fetchSelectedDeal.length) || (fetchSelectedDeal.length === 5)) resolve()
        })

        await querySnapshotPromis2
        return NextResponse.json({ data: { bannerDeals: fetchBannerDeal, selectedDeals: fetchSelectedDeal }, status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 500, error })
    }
}