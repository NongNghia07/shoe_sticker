import { React, useState, useEffect } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Row,
    Col,
    Form,
    Input,
} from "reactstrap";
import Multiselect from "multiselect-react-dropdown";

const CreateProduct = (props) => {

    const {
        isCreateModal,
        toggleModal,
        // updateData,
        // handleImages,
        // handleUpdateImages,
        // imageFiles,
        // setImageFiles,
    } = props;




    //Color__________________________________________________________________________
    const [lstColor, setLstColor] = useState([
        'Đen',
        'Hồng',
        'Trắng'
    ]);

    const [lstColorSelected, setLstColorSelected] = useState([]);

    const colorSelected = (items) => {
        let copyLstColorSelected = [...lstColorSelected];
        for (let i in items) {
            let item = items[i];
            let id = item.substring(0, 2).trim();
            if (!copyLstColorSelected.map((p) => p.id).includes(id)) {
                copyLstColorSelected.push({ id: id });
            }
        }
        setLstColorSelected(copyLstColorSelected)
    }

    const colorRemove = (items) => {
        let arrLstColorSelected = [];
        if (arrLstColorSelected.length < 1) {
            for (let i in items) {
                let item = items[i];
                let id = item.substring(0, 2).trim();
                if (!arrLstColorSelected.map((p) => p.id).includes(id)) {
                    arrLstColorSelected.push({ id: id });
                }
            }
        }
        setLstColorSelected(arrLstColorSelected)
    }
    //End Color ________________________________________________________________________


    //Size__________________________________________________________________________
    const [lstSize, setLstSize] = useState([
        39,
        40,
        41
    ]);

    const [lstSizeSelected, setLstSizeSelected] = useState([]);

    const sizeSelected = (items) => {
        let copyLstSizeSelected = [...lstSizeSelected];
        for (let i in items) {
            let item = items[i];
            let id = item.substring(0, 2).trim();
            if (!copyLstSizeSelected.map((p) => p.id).includes(id)) {
                copyLstSizeSelected.push({ id: id });
            }
        }
        setLstSizeSelected(copyLstSizeSelected)
    }

    const sizeRemove = (items) => {
        let arrLstSizeSelected = []
        if (arrLstSizeSelected.length < 1) {
            for (let i in items) {
                let item = items[i];
                let id = item.substring(0, 2).trim();
                if (!arrLstSizeSelected.map((p) => p.id).includes(id)) {
                    arrLstSizeSelected.push({ id: id });
                }
            }
        }
        setLstSizeSelected(arrLstSizeSelected)
    }
    //End Size ________________________________________________________________________


    return (
        <>
            <Modal isOpen={isCreateModal} toggle={() => toggleModal()} size="xl" centered>
                <Form
                // onSubmit={handleSubmit(createProduct)} innerRef={ref}
                >
                    <ModalHeader toggle={() => toggleModal()}>Add</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={7}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <div>
                                                <input
                                                    style={{
                                                        border: "1px solid",
                                                        width: "100%",
                                                        borderRadius: "5px",
                                                    }}
                                                    id="name"
                                                    name="name"
                                                    placeholder=""
                                                    type="text"
                                                // value={product.name}
                                                // onChange={(event) =>
                                                //     handleOnchangeinput(event, "name")
                                                // }
                                                />
                                                {/* {check.name && check.name.length > 0 && (
                                            <p className="checkError">{check.name}</p>
                                        )} */}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="color">Color</Label>
                                            <Multiselect
                                                isObject={false}
                                                options={lstColor}
                                                // showCheckbox
                                                isMulti
                                                onSelect={(event) => colorSelected(event)}
                                                onRemove={(event) => colorRemove(event)}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <Row>
                                            <Col md={10}>
                                                <FormGroup>
                                                    <Label for="namecate">Category</Label>
                                                    <div>
                                                        <select
                                                            style={{
                                                                border: "1px solid",
                                                                width: "100%",
                                                                borderRadius: "5px",
                                                            }}
                                                            id="namecate"
                                                            name="namecate"
                                                            placeholder=""
                                                            type="select"
                                                        // onChange={(event) =>
                                                        //     handleOnchangeinput(event, "categoryId")
                                                        // }
                                                        >
                                                            <option value="" disabled selected>
                                                                Chọn loại sản phẩm
                                                            </option>
                                                            {/* {lstCate.map((item, index) => {
                                                        return (
                                                            <option key={item.id} value={item.id}>
                                                                {item.namecate}
                                                            </option>
                                                        );
                                                    })} */}
                                                        </select>
                                                        {/* {check.categoryId &&
                                                    check.categoryId.length > 0 && (
                                                        <p className="checkError">{check.categoryId}</p>
                                                    )} */}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col
                                                md={2}
                                                style={{
                                                    padding: "0px 12px 0px 0px",
                                                    marginLeft: "0%",
                                                }}
                                            >
                                                <Label for="category">Add</Label>
                                                <button
                                                    type="button"
                                                    style={{
                                                        border: "1px solid",
                                                        width: "100%",
                                                        borderRadius: "15px",
                                                    }}
                                                // onClick={toggleNested}
                                                >
                                                    +
                                                </button>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col md={12}>
                                        <FormGroup>
                                            <Label for="description">Mô tả</Label>
                                            <div>
                                                <textarea
                                                    style={{
                                                        border: "1px solid",
                                                        width: "100%",
                                                        borderRadius: "5px",
                                                        height: "100px",
                                                    }}
                                                    id="description"
                                                    name="description"
                                                // onChange={(event) => {
                                                //     handleOnchangeinput(event);
                                                // }}
                                                />
                                                {/* {check.description && check.description.length > 0 && (
                                            <p className="checkError">{check.description}</p>
                                        )} */}
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>

                            </Col>
                            <Col md={5}>
                                <Row>
                                    <Col md={12}>
                                        <Label>Ảnh</Label>
                                        <div>
                                            <input
                                                type="file"
                                                multiple
                                                // onChange={(e) => { handleImages(e, 'medias'); handleOnchangeinput(e, 'medias') }}
                                                style={{
                                                    border: "1px solid",
                                                    width: "100%",
                                                    borderRadius: "5px",
                                                }}
                                            />
                                        </div>
                                        {/* {check.medias &&
                                    check.medias.length > 0 && (
                                        <p className="checkError">{check.medias}</p>
                                    )} */}
                                    </Col>
                                    <Col md={12} style={{ marginTop: "1%" }}>
                                        {/* {imageFiles.length > 0 &&
                                    imageFiles &&
                                    imageFiles.map((item, index) => {
                                        return (
                                            <>
                                                {imageFiles.length === 1 && (
                                                    <img
                                                        src={URL.createObjectURL(item)}
                                                        width="100%"
                                                        height="285rem"
                                                        style={{
                                                            borderRadius: "15px",
                                                            border: "1px solid",
                                                        }}
                                                    />
                                                )}
                                                {imageFiles.length === 2 && (
                                                    <div style={{ padding: "0 20% 0 20%" }}>
                                                        <img
                                                            src={URL.createObjectURL(item)}
                                                            width="100%"
                                                            height="142rem"
                                                            style={{
                                                                borderRadius: "15px",
                                                                border: "1px solid",
                                                                marginBottom: "5px",
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                {imageFiles.length === 3 && (
                                                    <>
                                                        {index === 0 && (
                                                            <div style={{ padding: "0 20% 0 20%" }}>
                                                                <img
                                                                    src={URL.createObjectURL(item)}
                                                                    width="100%"
                                                                    height="142rem"
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        border: "1px solid",
                                                                        marginBottom: "5px",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        {index > 0 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="48.883%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginRight: "5px",
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                                {imageFiles.length === 4 && (
                                                    <>
                                                        {index === 0 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginBottom: "5px",
                                                                    marginRight: "5px",
                                                                }}
                                                            />
                                                        )}
                                                        {index === 1 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginBottom: "5px",
                                                                }}
                                                            />
                                                        )}

                                                        {index === 2 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginRight: "5px",
                                                                }}
                                                            />
                                                        )}
                                                        {index === 3 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                                {imageFiles.length === 5 && (
                                                    <>
                                                        {index === 0 && (
                                                            <div style={{ padding: "0 20% 0 20%" }}>
                                                                <img
                                                                    src={URL.createObjectURL(item)}
                                                                    width="100%"
                                                                    height="142rem"
                                                                    style={{
                                                                        borderRadius: "15px",
                                                                        border: "1px solid",
                                                                        marginBottom: "5px",
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                        {index === 1 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginBottom: "5px",
                                                                    marginRight: "5px",
                                                                }}
                                                            />
                                                        )}
                                                        {index === 2 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginBottom: "5px",
                                                                }}
                                                            />
                                                        )}

                                                        {index === 3 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                    marginRight: "5px",
                                                                }}
                                                            />
                                                        )}
                                                        {index === 4 && (
                                                            <img
                                                                src={URL.createObjectURL(item)}
                                                                width="49%"
                                                                height="142rem"
                                                                style={{
                                                                    borderRadius: "15px",
                                                                    border: "1px solid",
                                                                }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        );
                                    })}
                                {imageFiles.length <= 0 && (
                                    <img
                                        width="100%"
                                        height="285rem"
                                        style={{ borderRadius: "15px", border: "1px solid" }}
                                    />
                                )} */}
                                    </Col>
                                </Row>
                            </Col>
                            {lstColorSelected.length >= 1 && (
                                <Row>
                                    {lstColorSelected.map((item) => {
                                        return (
                                            <Col md={12} style={{ boxShadow: "10px 10px 5px lightblue" }}>
                                                <Row >
                                                    <p>{item.id}</p>
                                                    <Col md={4}>
                                                        <FormGroup>
                                                            <Label for="description">Size</Label>
                                                            <Multiselect
                                                                isObject={false}
                                                                options={lstSize}
                                                                showCheckbox
                                                                onSelect={(event) => sizeSelected(event)}
                                                                onRemove={(event) => sizeRemove(event)}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={3}>
                                                        <FormGroup>
                                                            <Label for="description">Quantity</Label>
                                                            <div>
                                                                <input
                                                                    style={{
                                                                        border: "1px solid",
                                                                        width: "100%",
                                                                        borderRadius: "5px",
                                                                    }}
                                                                // {...register(`quantity${item}`)}
                                                                />
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md={3}>
                                                        <FormGroup>
                                                            <Label for="description">Price</Label>
                                                            <div>
                                                                <input
                                                                    style={{
                                                                        border: "1px solid",
                                                                        width: "100%",
                                                                        borderRadius: "5px",
                                                                    }}
                                                                // {...register(`quantity${item}`)}
                                                                />
                                                            </div>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        );
                                    })}
                                </Row>
                            )}
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={() => {
                                // createProduct();
                            }}
                        >
                            Thêm Mới
                        </Button>
                        <Button color="secondary"
                            onClick={() => toggleModal()}
                        >
                            Hủy
                        </Button>
                    </ModalFooter>
                </Form>
                {/* <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
            // size='lg'
            centered
        >
            <ModalHeader>Thêm loại sản phẩm</ModalHeader>
            <ModalBody>
                <Input
                    id="namecate"
                    placeholder="Name Category"
                    name="namecate"
                    onChange={(event) => setCate(event.target.value)}
                />
            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    color="primary"
                    onClick={() => {
                        //createProduct();
                        createCate();
                    }}
                >
                    Thêm
                </Button>
                <Button color="secondary" onClick={toggleNested}>
                    Hủy
                </Button>
            </ModalFooter>
        </Modal> */}
            </Modal>
        </>
    )
}

export default CreateProduct;