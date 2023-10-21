import React, { useEffect, useState } from "react";
import useCallGetAPI from "../../../../customHook/UseCallGetApi";
import useCallPostAPI from "../../../../customHook/UseCallPostApi";
import Tables from "../../../../customHook/UseTable";
import CreateCategory from "./CreateCategory";
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

export default function Category() {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})
    const { callPost } = useCallPostAPI()
    const { callGet } = useCallGetAPI()
    const [totalPageAndNumber, setTotalPageAndNumber] = useState({ totalPage: 0, numberPage: 0 })
    const [isUpdateModel, setIsUpdateModel] = useState(false)
    const [isCreateModel, setIsCreateModel] = useState(false)
    const [isDeleteModel, setIsDeleteModel] = useState(false)

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = () => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ id: p.id, name: p.name }))
            setCategories(arr)
            setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
        }
        callGet(`http://localhost:8080/api/category/findAll`, getData)
    }

    const updateCategory = (id) => {
        const updateCate = (user) => {
            const refresh = () => {
                refreshData()
                if (id) toggleUpdateModal()
            }
            let copyCategory = { ...category }
            copyCategory["updated"] = user.id
            callPost(`http://localhost:8080/api/category/update`, copyCategory, refresh)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", updateCate)
    }

    const toggleUpdateModal = () => {
        setIsUpdateModel(!isUpdateModel)
        if (isUpdateModel) {
            setCategory({})
        }
    }

    const toggleCreateModal = () => {
        setIsCreateModel(!isCreateModel)
        if (isCreateModel) {
            setCategory({})
        }
    }

    const toggleDeleteModal = () => {
        setIsDeleteModel(!isDeleteModel)
    }

    const findCategoryById = (id) => {
        const getData = (data) => {
            setCategory(data)
            toggleUpdateModal()
        }
        callGet(`http://localhost:8080/api/category/find/${id}`, getData)
    }

    const deleteCategory = () => {
        const refresh = () => {
            refreshData()
            toggleDeleteModal()
        }
        callPost(`http://localhost:8080/api/category/delete/${category.id}`, "", refresh)
    }

    const onCreate = (id) => {
        toggleCreateModal()
    }

    const onUpdate = (id) => {
        findCategoryById(id)
    }

    const onDelete = (id) => {
        toggleDeleteModal()
        setCategory({ id: id })
    }

    const sortDataAscending = (data) => {
        let newData = [...categories]
        if (!newData.map(p => p[data])) return
        newData.sort((a, b) => a[data] > b[data] ? 1 : -1)
        setCategories(newData)
    }

    const sortDataGraduallySmaller = (data) => {
        let newData = [...categories]
        if (!newData.map(p => p[data])) return
        newData.sort((a, b) => a[data] < b[data] ? 1 : -1)
        setCategories(newData)
    }

    const onDetail = (id) => {

    }

    const pageable = async (id) => {
        if (id <= 0) {
            id = 0
        } else if (id >= totalPageAndNumber.totalPage) {
            id = totalPageAndNumber.totalPage
        }
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ id: p.id, name: p.name }))
            setCategories(arr)
            setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
        }
        callGet(`http://localhost:8080/api/category/`, getData)
    }

    const search = (e) => {
        const getData = (data) => {
            if (data) {
                let arr = []
                data?.map(p => arr.push({ id: p.id, name: p.name }))
                setCategories(arr)
                setTotalPageAndNumber({ totalPage: data.totalPages, numberPage: data.number })
            }
        }
        setTimeout(() => {
            callGet(`http://localhost:8080/api/category/searchAllByName?keyword=${e.target.value}`, getData)
        }, 1000);
    }

    return (
        <>
            <CreateCategory
                isCreateModel={isCreateModel}
                toggleCreateModal={toggleCreateModal}
                refreshData={refreshData}
            />
            <input onChange={(e) => search(e)} />
            <Container
                className="bg-light border"
                fluid="sm"
            >
                <Modal isOpen={isUpdateModel} toggle={() => toggleUpdateModal()} centered>
                    <ModalHeader toggle={() => toggleUpdateModal()}>Update Category</ModalHeader>
                    <ModalBody>
                        <Row style={{ textAlign: "center" }}>
                            <Col md="12" style={{ margin: "auto" }}>
                                <input value={category?.name}
                                    style={{
                                        border: "1px solid",
                                        borderRadius: "5px",
                                        marginRight: "2%"
                                    }}
                                    placeholder="Please enter Category"
                                    onChange={(e) => setCategory({ id: category.id, name: e.target.value })}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => {
                                updateCategory(category.id);
                            }}
                        >
                            Update
                        </Button>
                        <Button color="secondary"
                            onClick={() => toggleUpdateModal()}
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
                                deleteCategory();
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
                    title={"Category"}
                    list={categories}
                    colNames={[{ title: "ID", id: "id" }, { title: "Name", id: "name" }]}
                    pageable={pageable}
                    totalPage={totalPageAndNumber.totalPage}
                    onCreate={onCreate}
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