import axios from "axios";
import { useState, useEffect } from "react";

const useCallGetAPI = (axiosParams, executeOnMount) => {
    const token = localStorage.getItem('token');
    const [response, setResponse] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleData = async (url, getData, getError) => {
        try {
            const res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } })
            let dataRes = (res && res.data) ? res.data : []
            setResponse(dataRes);
            getData(dataRes)
        } catch (e) {
            if (e.response) {
                if (e.response.status === 403) {
                    console.log("K có quền truy cập");
                }
                window.location.href = 'http://localhost:3000/404'
                console.log(e.response);
                setError(e.response)
                getError(e.response)
            } else {
                // console.log(e);
                setError(e)
                getError(e)
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (executeOnMount) handleData(axiosParams);
    }, []);


    return {
        response, error, isLoading, callGet: handleData
    }
}

export default useCallGetAPI;