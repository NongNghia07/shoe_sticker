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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useCallGetAPI from "../../../../customHook/UseCallGetApi";
import useCallPostAPI from "../../../../customHook/UseCallPostApi";
const animatedComponents = makeAnimated();

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

    const [productData, setProductData] = useState({})
    const [lstProductDetail, setLstProductDetail] = useState([])
    let { data: responseData, isError, isLoading, callPost } = useCallPostAPI()

    //Category_______________________________________________________________
    const { data: category } = useCallGetAPI(`http://localhost:8080/api/category/findAll`)
    const [lstCategory, setLstCategory] = useState([]);
    useEffect(() => {
        let arr = []
        category.map(p => arr.push({ value: p.id, label: p.name }))
        setLstCategory([...arr])
    }, [category])
    //_______________________________________________________________________


    //Color__________________________________________________________________________
    const { data: colors } = useCallGetAPI(`http://localhost:8080/api/color/findAll`)
    const [lstColor, setLstColor] = useState([]);
    const [lstColorSelected, setLstColorSelected] = useState([]);


    useEffect(() => {
        let arr = []
        colors.map(p => arr.push({ value: p.id, label: p.name }))
        setLstColor([...arr])
    }, [colors])

    const handleOnChangeColor = (items) => {
        let copyLstColorSelected = [...lstColorSelected];
        if (items.length < copyLstColorSelected.length) {
            let arr = copyLstColorSelected.filter(function (x) {
                return items.filter(function (y) {
                    return y.value == x.value;
                }).length !== 0
            });
            setLstColorSelected(arr)
            return
        } else {
            for (let i in items) {
                let item = items[i];
                if (!copyLstColorSelected.map((p) => p.value).includes(item.value)) {
                    copyLstColorSelected.push({ value: item.value, label: item.label, price: '', sizes: [], length: 0 });
                }
            }
        }
        setLstColorSelected(copyLstColorSelected)
    }
    //End Color ________________________________________________________________________


    //Size__________________________________________________________________________
    const { data: sizes } = useCallGetAPI(`http://localhost:8080/api/size/findAll`)
    const [lstSize, setLstSize] = useState([]);
    useEffect(() => {
        let arr = []
        sizes.map(p => arr.push({ value: p.id, label: p.name }))
        setLstSize([...arr])
    }, [sizes])

    const handleOnChangeSize = (items, color) => {
        let copyLstColorSelected = [...lstColorSelected];
        let index = copyLstColorSelected.map(p => p.label).indexOf(color)
        if (items.length < copyLstColorSelected[index].sizes.length) {
            let arr = copyLstColorSelected[index].sizes.filter(function (x) {
                return items.filter(function (y) {
                    return y.value == x.value;
                }).length !== 0
            });
            copyLstColorSelected[index].sizes = arr;
            copyLstColorSelected[index].length = copyLstColorSelected[index].sizes.length
        } else {
            for (let i in items) {
                let item = items[i];
                if (!copyLstColorSelected[index].sizes.map((o) => o.value).includes(item.value)) {
                    copyLstColorSelected[index].sizes.push({ value: item.value, label: item.label })
                    copyLstColorSelected[index].length = copyLstColorSelected[index].sizes.length
                }
            }
        }
        setLstColorSelected(copyLstColorSelected);
    }
    //End Size ________________________________________________________________________

    const createProductDetail = (data) => {
        console.log(data);
        let copyLstProductDetail = []
        lstColorSelected.map(p => {
            p.sizes.map(s => copyLstProductDetail.push({ productId: data.id, colorId: p.value, sizeId: s.value, quantity: s.quantity, price: p.price, created: 1 }))
        })
        setLstProductDetail([...copyLstProductDetail])
        console.log(copyLstProductDetail);
        callPost(`http://localhost:8080/api/productDetail/createAll`, copyLstProductDetail, action);
    }

    const action = (data) => {
        console.log(data);
    }

    //Product________________________________________________________________

    const createProduct = (e) => {
        //create productData
        e.preventDefault()
        let copyProductData = { ...productData }
        let totalProductQuantity = 0
        lstColorSelected.map(p => p.sizes.map(size => {
            totalProductQuantity += Number(size.quantity)
        }))
        copyProductData['quantity'] = totalProductQuantity
        copyProductData['created'] = 1
        setProductData({ ...copyProductData })
        // call api create pro
        callPost(`http://localhost:8080/api/productData/create`, copyProductData, createProductDetail);
        //__________________
    }



    //_____________________________________________________________

    const handleOnchangeInput = (e, id, color, size) => {
        let copyLstColorSelected = [...lstColorSelected];
        let copyProductData = { ...productData };
        if (id === 'name') {
            copyProductData[id] = e.target.value;
            setProductData({ ...copyProductData });
        } else if (id === 'category') {
            copyProductData["categoryId"] = e.target.value;
            setProductData({ ...copyProductData });
        } else {
            let index = copyLstColorSelected.map(p => p.label).indexOf(color)
            if (id === 'quantity') {
                copyLstColorSelected[index].sizes.map(p => {
                    if (p.label === size) {
                        p['quantity'] = e.target.value
                    }
                })
            } else if (id === 'price') {
                copyLstColorSelected[index].price = e.target.value;
            }
            setLstColorSelected([...copyLstColorSelected])
        }
    }

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
                                                    value={productData.name}
                                                    onChange={(e) =>
                                                        handleOnchangeInput(e, "name")
                                                    }
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
                                            <Select
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                isMulti
                                                options={lstColor}
                                                value={lstColorSelected}
                                                onChange={(event) => handleOnChangeColor(event)}
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
                                                            onChange={(event) =>
                                                                handleOnchangeInput(event, "category")
                                                            }
                                                        >
                                                            <option value="" disabled selected>
                                                                Chọn loại sản phẩm
                                                            </option>
                                                            {lstCategory.map((item) => {
                                                                return (
                                                                    <option key={item.value} value={item.value}>
                                                                        {item.label}
                                                                    </option>
                                                                );
                                                            })}
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
                                <Col md={12}>
                                    <Row>
                                        {lstColorSelected.map((item) => {
                                            let arrSize = [...item.sizes]
                                            return (
                                                <>
                                                    <Col md={12} >
                                                        <Row style={{ borderTop: "1px solid #e5e5e5" }} >
                                                            <p>{item.label}</p>
                                                            <Col md={5} >
                                                                <FormGroup>
                                                                    <Label for="description">Size</Label>
                                                                    <Select
                                                                        closeMenuOnSelect={false}
                                                                        components={animatedComponents}
                                                                        isMulti
                                                                        options={lstSize}
                                                                        value={arrSize}
                                                                        onChange={(event) => handleOnChangeSize(event, item.label)}
                                                                    />
                                                                </FormGroup>
                                                            </Col>
                                                            <Col md={5} >
                                                                <FormGroup>
                                                                    <Label for="description">Price</Label>
                                                                    <div>
                                                                        <input
                                                                            style={{
                                                                                border: "1px solid",
                                                                                width: "100%",
                                                                                borderRadius: "5px",
                                                                            }}
                                                                            value={item.price}
                                                                            onChange={(e) => handleOnchangeInput(e, 'price', item.label)}
                                                                        />
                                                                    </div>
                                                                </FormGroup>
                                                            </Col>
                                                            {/* <Col md={2}>
                                                                <FormGroup>
                                                                    <Label for="description">Image</Label>
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
                                                            </Col> */}
                                                        </Row>
                                                    </Col>
                                                    {item?.sizes?.length >= 1 &&
                                                        item.sizes.map(size => {
                                                            return (
                                                                <Col md={1} key={size.value}>
                                                                    <FormGroup>
                                                                        <Label for="description">Size: {size.label}</Label>
                                                                        <div>
                                                                            <input
                                                                                style={{
                                                                                    border: "1px solid",
                                                                                    width: "100%",
                                                                                    borderRadius: "5px",
                                                                                }}
                                                                                value={size.quantity}
                                                                                placeholder="Quantity"
                                                                                onChange={(e) => handleOnchangeInput(e, 'quantity', item.label, size.label)}
                                                                            />
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                            )
                                                        })}
                                                </>
                                            );
                                        }
                                        )}
                                    </Row>
                                </Col>
                            )}
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            type="submit"
                            onClick={(e) => {
                                createProduct(e);
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