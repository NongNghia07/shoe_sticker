import axios from "axios";
import moment from 'moment'
import { Await, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const useCallGetAPI = (url) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const callGet = async (url, action) => {
        try {
            const cancelToken = axios.CancelToken.source();
            let canceled = false;
            let res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}`, cancelToken: cancelToken.token } })
            let data = (res && res.data) ? res.data : []
            canceled = true;
            setIsLoading(false);
            setIsError(false);
            if (canceled) {
                action(data)
                setData(data);
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 403) {
                    console.log("K có quền truy cập");
                }
                console.log(e.response);
            }
            else if (axios.isCancel(e)) {
                console.log("Cancelled--> " + e);
            } else {
                console.log(e);
            }
            setIsError(true)
        }
    };
    return {
        data, isError, isLoading, callGet
    }
}

export default useCallGetAPI;