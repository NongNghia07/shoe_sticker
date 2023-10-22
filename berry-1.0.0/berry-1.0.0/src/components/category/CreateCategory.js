import React, { useState } from "react";
import useCallPostAPI from "../../hooks/UseCallPostApi";
import {
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";

export default function CreateCategory(props) {
    const [category, setCategory] = useState({})
    const { refreshData, isCreateModel, toggleCreateModal } = props
    const { callPost } = useCallPostAPI()

    const createCategory = () => {
        const createCate = (user) => {
            const refresh = () => {
                refreshData()
                toggleCreateModal()
            }
            let copyCategory = { ...category }
            copyCategory["created"] = user.id
            callPost(`http://localhost:8080/api/category/create`, copyCategory, refresh)
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", createCate)
    }

    return (
        <Modal isOpen={isCreateModel} toggle={() => toggleCreateModal()} centered>
            <ModalHeader toggle={() => toggleCreateModal()}>Create Category</ModalHeader>
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
                            onChange={(e) => setCategory({ name: e.target.value })}
                        />
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="primary"
                    type="submit"
                    onClick={() => {
                        createCategory();
                    }}
                >
                    Add
                </Button>
                <Button color="secondary"
                    onClick={() => toggleCreateModal()}
                >
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}