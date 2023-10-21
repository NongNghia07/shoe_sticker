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
    const [isDeleteModel, setIsDeleteModel] = useState(false)

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = () => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ id: p.id, name: p.name }))
            setSizesOrColors(arr)
            setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
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

    const toggleDeleteModal = (id) => {
        setIsDeleteModel(!isDeleteModel)
        if (!isDeleteModel) {
            setSizeOrColor({ id: id })
            return
        }
        setSizeOrColor({})
    }

    const findSizeOrColorById = (id) => {
        const getData = (data) => {
            setSizeOrColor(data)
            toggleModal()
        }
        callGet(`http://localhost:8080/api/${param}/find/${id}`, getData)
    }

    const deleteSizeOrColor = () => {
        const refresh = () => {
            refreshData()
            toggleDeleteModal()
        }
        callPost(`http://localhost:8080/api/${param}/delete/${sizeOrColor.id}`, "", refresh)
    }

    const onUpdate = (id) => {
        findSizeOrColorById(id)
    }

    const onDelete = (id) => {
        toggleDeleteModal(id)
    }


    const onDetail = (id) => {

    }

    const sortDataAscending = (data) => {
        let newData = [...sizesOrColors]
        newData.sort((a, b) => a[data] > b[data] ? 1 : -1)
        setSizesOrColors(newData)
    }

    const sortDataGraduallySmaller = (data) => {
        let newData = [...sizesOrColors]
        newData.sort((a, b) => a[data] < b[data] ? 1 : -1)
        setSizesOrColors(newData)
    }

    const pageable = (id) => {
        if (id <= 0) {
            id = 0
        } else if (id >= totalPageAndNumber.totalPage) {
            id = totalPageAndNumber.totalPage
        }
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ id: p.id, name: p.name }))
            setSizesOrColors(arr)
            setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
        }
        callGet(`http://localhost:8080/api/${param}/findAll`, getData)
    }

    const search = (e) => {
        const getData = (data) => {
            if (data) {
                let arr = []
                data?.map(p => arr.push({ id: p.id, name: p.name }))
                setSizesOrColors(arr)
                setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
            }
        }
        setTimeout(() => {
            callGet(`http://localhost:8080/api/${param}/searchAllByName?keyword=${e.target.value}`, getData)
        }, 1000);
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
                    <Col md="5">
                        <input onChange={(e) => search(e)} />
                    </Col>
                </Row>

                <Modal isOpen={isUpdateModel} toggle={() => toggleModal()} centered>
                    <ModalHeader toggle={() => toggleModal()}>Update {param}</ModalHeader>
                    <ModalBody>
                        <Row style={{ textAlign: "center" }}>
                            <Col md="12" style={{ margin: "auto" }}>
                                <input value={sizeOrColor?.name}
                                    style={{
                                        border: "1px solid",
                                        borderRadius: "5px",
                                        marginRight: "2%"
                                    }}
                                    placeholder={"Please enter " + param}
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
                <Modal isOpen={isDeleteModel} toggle={() => toggleDeleteModal()} centered>
                    <ModalHeader toggle={() => toggleDeleteModal()}>Thông báo</ModalHeader>
                    <ModalBody>
                        Do you want delete?
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => {
                                deleteSizeOrColor();
                            }}
                        >
                            Delete
                        </Button>
                        <Button color="secondary"
                            onClick={() => toggleDeleteModal()}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <Tables
                    title={param}
                    list={sizesOrColors}
                    colNames={[{ title: "ID", id: "id" }, { title: "Name", id: "name" }, { title: "Update" }, { title: "Delete" }]}
                    pageable={pageable}
                    totalPage={totalPageAndNumber.totalPage}
                    onDetail={onDetail}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    sortDataAscending={sortDataAscending}
                    sortDataGraduallySmaller={sortDataGraduallySmaller}
                />
            </Container>
        </>
    )
}