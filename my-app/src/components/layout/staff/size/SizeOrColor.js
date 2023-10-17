import React, { useEffect, useState } from "react";
import useCallGetAPI from "../../../../customHook/UseCallGetApi";
import useCallPostAPI from "../../../../customHook/UseCallPostApi";
import Tables from "../../../../customHook/UseTable";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import {
    useParams
} from "react-router-dom";

export default function SizeOrColor() {
    const { param } = useParams();
    const [sizesOrColors, setSizesOrColors] = useState([])
    const [sizeOrColor, setSizeOrColor] = useState({ id: null, name: "" })
    const { callPost } = useCallPostAPI()
    const { callGet } = useCallGetAPI()
    const [totalPageAndNumber, setTotalPageAndNumber] = useState({ totalPage: 0, numberPage: 0 })
    const [isUpdateModel, setIsUpdateModel] = useState(false)

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = () => {
        const getData = (data) => {
            let arr = []
            data.map(p => arr.push({ id: p.id, name: p.name }))
            setSizesOrColors(arr)
        }
        callGet(`http://localhost:8080/api/${param}/findAll`, getData)
    }

    const saveSizeOrColor = (id) => {
        const refresh = () => {
            refreshData()
            if (id) toggleModal()
        }
        callPost(`http://localhost:8080/api/${param}/save`, sizeOrColor, refresh)
    }

    const toggleModal = () => {
        setIsUpdateModel(!isUpdateModel)
        if (isUpdateModel) {
            setSizeOrColor({ id: null, name: "" })
        }
    }

    const findSizeOrColorById = (id) => {
        const getData = (data) => {
            setSizeOrColor(data)
            toggleModal()
        }
        callGet(`http://localhost:8080/api/${param}/find/${id}`, getData)
    }

    const onUpdate = (id) => {
        findSizeOrColorById(id)
    }

    const onDelete = (id) => {

    }


    const onDetail = (id) => {

    }

    const pageable = async (id) => {
        // if (id <= 0) {
        //     id = 0
        // } else if (id >= totalPageAndNumber.totalPage) {
        //     id = totalPageAndNumber.totalPage
        // }
        // const getData = (data) => {
        //     setupData(data.content)
        //     setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
        // }
        // callGet(`http://localhost:8080/api/productData/findAllPage?page=${id}`, getData)
    }

    return (
        <>
            <Container
                className="bg-light border"
                fluid="sm"
            >
                <Row>
                    <Col md="5" style={{ margin: "auto" }}>
                        <input value={sizeOrColor?.name}
                            style={{
                                border: "1px solid",
                                borderRadius: "5px",
                                marginRight: "2%"
                            }}
                            placeholder={"Please enter " + param}
                            onChange={(e) => setSizeOrColor({ id: sizeOrColor.id, name: e.target.value })}
                        />
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => {
                                saveSizeOrColor();
                            }}
                        >
                            Add
                        </Button>
                    </Col>
                </Row>

                <Modal isOpen={isUpdateModel} toggle={() => toggleModal()} centered>
                    <ModalHeader toggle={() => toggleModal()}>Update Size</ModalHeader>
                    <ModalBody>
                        <Row style={{ textAlign: "center" }}>
                            <Col md="12" style={{ margin: "auto" }}>
                                <input value={sizeOrColor?.name}
                                    style={{
                                        border: "1px solid",
                                        borderRadius: "5px",
                                        marginRight: "2%"
                                    }}
                                    placeholder="Nhập kích cỡ sizeOrColor"
                                    onChange={(e) => setSizeOrColor({ id: sizeOrColor.id, name: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => {
                                saveSizeOrColor(sizeOrColor.id);
                            }}
                        >
                            Update
                        </Button>
                        <Button color="secondary"
                            onClick={() => toggleModal()}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Tables
                    title={param}
                    list={sizesOrColors}
                    colNames={["ID", "Name", "Update", "Delete"]}
                    pageable={pageable}
                    totalPage={totalPageAndNumber.totalPage}
                    onDetail={onDetail}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </Container>
        </>
    )
}