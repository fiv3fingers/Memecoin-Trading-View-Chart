import axios from 'axios';
import { BACKEND_URL } from '../config/config';

interface ChartData {
    open: number;
    high: number;
    low: number;
    close: number;
    time: number;
}

type ChartTable = {
    table: {
        open: number;
        high: number;
        low: number;
        close: number;
        time: number;
    }[];
}

interface Params {
    range: number;
    countBack: number;
}

export const getChartTable = async (params: Params): Promise<any> => {
    const { range, countBack } = params;

    try {
        console.log("range: ", range)
        console.log("countBack: ", countBack)
        const data = await axios.get(`${BACKEND_URL}/laika/${range}/${countBack}`)
            .then(response => response.data)
            .catch(err => console.error("Error fetching:", err));

        return data;
    } catch (error) {
        console.error("Error fetching chart data:", error);
        throw new Error("Failed to fetch chart data");
    }
};
