import axios from 'axios';

//const API_URL = 'http://localhost:8080/api/dashboard';  // backend url
const API_URL = 'https://portfolio-tracker-backend-3.onrender.com/api/dashboard';  // deployed backend url

export const getDashboardData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard data', error);
        return null;
    }
};
