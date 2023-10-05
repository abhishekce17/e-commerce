import { NextResponse } from "next/server";
import { db } from "@/firebase-config/config";
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";


export const dynamic = "force-dynamic"
export async function GET() {
    try {
        const currentYear = new Date().getFullYear();
        const monthNames = [
            "january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];

        const reportDataRef = collection(db, "/Administration/YearlyReport/ReportData");
        const q = query(reportDataRef, where("ReportYear", "==", currentYear));
        const queryData = await getDocs(q);
        const categoryCollection = collection(db, "/Administration/Admin/Category")
        const YearlyReport = [];
        const MonthlyReport = [];
        const categoryData = [];
        // Define a helper function to fetch monthly report data for a document
        const fetchMonthlyReport = async (fetchedDoc) => {
            const monthlyPromises = monthNames.map(async (month) => {
                const monthlyReportDataRef = doc(
                    db,
                    `Administration/YearlyReport/ReportData/${fetchedDoc.id}/${month}/overAllMonthReport`
                );
                const monthlyReportData = await getDoc(monthlyReportDataRef);
                MonthlyReport.push({ [month]: monthlyReportData.data() });
            });
            await Promise.all(monthlyPromises);
        };

        // Fetch yearly report data and monthly report data concurrently
        const fetchPromises = queryData.docs.map(async (fetchedDoc) => {
            YearlyReport.push(fetchedDoc.data());
            await fetchMonthlyReport(fetchedDoc);
        });

        await Promise.all(fetchPromises);

        const fetchedCategoryData = await getDocs(categoryCollection)
        const categoryPromise = fetchedCategoryData.docs.map(data => {
            categoryData.push(data.data())
        })

        await Promise.all(categoryPromise)

        return NextResponse.json({ status: 200, fetchedData: { YearlyReport, MonthlyReport, categoryData } });
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ status: 500, error: e });
    }
}
