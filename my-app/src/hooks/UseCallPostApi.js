import axios from "axios";
// import moment from 'moment'
// import AxiosInterceptor from './AxiosInterceptor'
import { useState } from "react";
import { useSnackbar } from 'notistack';

const useCallPostAPI = () => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    // const ourRequest = axios.CancelToken.source()

    const callPost = async (url, datas, getData, getError) => {
        try {
            let canceled = false;
            let res = await axios.post(url, datas, { headers: { "Authorization": `Bearer ${token}` } })
            let data = (res && res.data) ? res.data : {}
            canceled = true;
            setIsLoading(false);
            setIsError(false);
            if (canceled) {
                if (getData) getData(data)
                setData(data)
            }
        } catch (e) {
            if (e.response) {
                console.log(e.response.data.message);
                // enqueueSnackbar(e.response.data.message, { variant: 'error' })
                // getError(e.response)
            } else {
                console.log(e);
                // enqueueSnackbar("Error!", { variant: 'error' })
                // getError(e)
            }
            setIsError(true)
        }

    }

    return {
        data, isError, isLoading, callPost
    }
}

export default useCallPostAPI;