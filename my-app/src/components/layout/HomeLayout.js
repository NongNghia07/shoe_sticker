import React, { useState, useEffect } from 'react';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
    getMetadata,
} from "firebase/storage";
import { storage } from "../../Firebase";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const HomeLayout = () => {
    const imagesListRef = ref(storage, "images/");
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        setImageUrls([])
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                let nameImg = item.name;
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, { nameImg, url }]);
                });
            });
        });
    }, [])

    return (
        <>
            <Outlet />
        </>
    );
}

export default HomeLayout;