import React, { useState, useEffect } from "react";
// import useTable from "../../../../customHook/UseTable"
// import useCallGetAPI from "../../../../customHook/UseCallGetApi";
import CreateProduct from "./CreateProduct";
const Product = (props) => {
    const [isCreateModal, setIsCreateModal] = useState(false);
    // const { data: dataProduct, isLoading } = useCallGetAPI(`http://localhost:8080/api/product/findAll`)

    const createModal = () => {
        setIsCreateModal(!isCreateModal);
    };
    return (
        <>
            <CreateProduct
                isCreateModal={isCreateModal}
                toggleModal={createModal}
            // updateData={updateData}
            // handleImages={handleImages}
            // handleUpdateImages={handleUpdateImages}
            // imageFiles={imageFiles}
            // setImageFiles={setImageFiles}
            />
            {/* <div>
                {useTable()}
            </div> */}
            <button onClick={() => createModal()}> O </button>
        </>
    )
}

export default Product;