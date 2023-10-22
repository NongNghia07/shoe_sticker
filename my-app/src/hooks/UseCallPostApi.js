import axios from "axios";
// import moment from 'moment'
// import AxiosInterceptor from './AxiosInterceptor'
import { useState } from "react";

const useCallPostAPI = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    // const ourRequest = axios.CancelToken.source()

    const callPost = async (url, datas, action) => {
        try {
            let canceled = false;
            let res = await axios.post(url, datas, { headers: { "Authorization": `Bearer ${token}` } })
            let data = (res && res.data) ? res.data : {}
            canceled = true;
            setIsLoading(false);
            setIsError(false);
            if (canceled) {
                action(data)
                setData(data)
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response.data.message);
            } else {
                console.log(e);
            }
            setIsError(true)
        }

    }

    return {
        data, isError, isLoading, callPost
    }
}

export default useCallPostAPI;