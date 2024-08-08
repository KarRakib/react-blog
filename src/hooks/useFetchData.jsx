import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (initialLoad, apiEndpoint, method = 'GET', requestData = null) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(initialLoad);
    const [error, setError] = useState(null);
    
    console.log('apiEndpoint:', apiEndpoint);

    useEffect(() => {
        if (initialLoad) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const response = await axios({
                        url: apiEndpoint,
                        method: method,
                        data: requestData,
                        headers: { 'Content-Type': 'application/json' }
                    });
                    setData(response.data);
                } catch (err) {
                    console.error('Error fetching data:', err);
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [initialLoad, apiEndpoint, method, requestData]);

    return { data, loading, error };
};

export default useFetchData;
