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
            // if (data && data.length > 0) {
            //     data.map(item => {
            //         item.created = moment(item.created).format('DD/MM/YYYY HH:mm:ss');
            //         if (item.modified > 0) {
            //             item.modified = moment(item.modified).format('DD/MM/YYYY HH:mm:ss');
            //         }
            //         if (item.effectFrom > 0) {
            //             item.effectFrom = moment(item.effectFrom).format('DD/MM/YYYY HH:mm:ss');
            //         }
            //         if (item.effectUntil > 0) {
            //             item.effectUntil = moment(item.effectUntil).format('DD/MM/YYYY HH:mm:ss');
            //         }
            //         return item;
            //     })
            // data = data.reverse()
            // }
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