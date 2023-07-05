import React from 'react';

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

const animatedComponents = makeAnimated();

class UpdateProduct extends React.Component {

    state = {
        lstColor: [
            { value: '1', label: 'Đen' },
            { value: '2', label: 'Trắng' },
            { value: '3', label: 'Xanh' },
            { value: '4', label: 'Nâu' },
            { value: '5', label: 'Hồng' },
            { value: '6', label: 'Đỏ' }
        ],

        lstSize: [{ value: '1', label: 39 },
        { value: '2', label: 40 },
        { value: '3', label: 41 },
        { value: '4', label: 42 },
        { value: '5', label: 43 },
        { value: '6', label: 44 },],

        productData: {},
        lstProductDetail: [],
        lstColorSelected: []

    }

    toggle = () => {

    }

    handleOnChangeColor = (items) => {
        let copyLstColorSelected = [...this.state.lstColorSelected];
        if (items.length < copyLstColorSelected.length) {
            let arr = copyLstColorSelected.filter(function (x) {
                return items.filter(function (y) {
                    return y.value == x.value;
                }).length !== 0
            });
            this.setState({
                lstColorSelected: arr
            })
            return
        } else {
            for (let i in items) {
                let item = items[i];
                if (!copyLstColorSelected.map((p) => p.value).includes(item.value)) {
                    copyLstColorSelected.push({ value: item.value, label: item.label, price: '' });
                }
            }
        }
        this.setState({
            lstColorSelected: copyLstColorSelected
        })
    }

    //End Color ________________________________________________________________________


    //Size__________________________________________________________________________


    handleOnChangeSize = (items, color) => {
        let copyLstColorSelected = [...this.state.lstColorSelected];
        copyLstColorSelected.map(p => {
            if (p.label === color) {
                if (items.length < p.sizes?.length) {
                    let arr = p.sizes.filter(function (x) {
                        return items.filter(function (y) {
                            return y.value == x.value;
                        }).length !== 0
                    });
                    p['sizes'] = arr;
                } else {
                    for (let i in items) {
                        let item = items[i];
                        if (!p.sizes?.map((o) => o.value).includes(item.value)) {
                            if (p.sizes?.length >= 1) {
                                p.sizes.push({ value: item.value, label: item.label })
                                break;
                            } else {
                                p['sizes'] = [{ value: item.value, label: item.label }]
                                break;
                            }
                        }
                    }
                }
            }
        })
        this.setState({
            lstColorSelected: copyLstColorSelected
        })
    }
    //End Size ________________________________________________________________________


    //Product___________________________________________________

    createProduct = (e) => {
        //create productData
        e.preventDefault()
        let copyProductData = { ...this.state.productData }
        let copyLstProductDetail = []
        let totalProductQuantity = 0
        this.state.lstColorSelected.map(p => p.sizes.map(size => {
            totalProductQuantity += Number(size.quantity)
        }))
        copyProductData['quantity'] = totalProductQuantity
        this.setState({
            productData: copyProductData
        })
        // call api create pro


        // call api findColorByName 
        // truyền vào 1 list 

        //___________

        //create productDetail

        // copyLstProductDetail['productId'] = 
        this.state.lstColorSelected.map(p => {
            p.sizes.map(s => copyLstProductDetail.push({ colorId: p.value, sizeId: s.value, quantity: s.quantity, price: p.price }))
        })
        this.setState({
            lstProductDetail: copyLstProductDetail
        })

        //__________________
    }



    //_____________________________________________________________

    handleOnchangeInput = (e, id, color, size) => {
        let copyLstColorSelected = [...this.state.lstColorSelected];
        let copyProductData = { ...this.state.productData };
        if (id === 'name') {
            copyProductData[id] = e.target.value;
            this.setState({
                productData: { ...copyProductData }
            })
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
            this.setState({
                lstColorSelected: [...copyLstColorSelected]
            })
        }
    }

    render() {

        return (
            <>
                <Modal isOpen={false} toggle={() => this.toggleModal()} size="xl" centered>
                    <Form
                    // onSubmit={handleSubmit(createProduct)} innerRef={ref}
                    >
                        <ModalHeader toggle={() => this.toggleModal()}>Add</ModalHeader>
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
                                                    // value={productData.name}
                                                    // onChange={(e) =>
                                                    //     handleOnchangeInput(e, "name")
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
                                                <Select
                                                    closeMenuOnSelect={false}
                                                    components={this.animatedComponents}
                                                    isMulti
                                                    options={this.state.lstColor}
                                                    value={this.state.lstColorSelected}
                                                    onChange={(event) => this.handleOnChangeColor(event)}
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
                                {this.state.lstColorSelected.length >= 1 && (
                                    <Col md={12}>
                                        <Row>
                                            {this.state.lstColorSelected.map((item) => {
                                                return (
                                                    <>
                                                        <Col md={12} >
                                                            <Row style={{ borderTop: "1px solid #e5e5e5" }}>
                                                                <p>{item.label}</p>
                                                                <Col md={5} >
                                                                    <FormGroup>
                                                                        <Label for="description">Size</Label>
                                                                        <Select
                                                                            closeMenuOnSelect={false}
                                                                            components={animatedComponents}
                                                                            isMulti
                                                                            options={this.state.lstSize}
                                                                            value={item.sizes}
                                                                            onChange={(event) => this.handleOnChangeSize(event, item.label)}
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={5}>
                                                                    <FormGroup>
                                                                        <Label for="description">Price</Label>
                                                                        <div>
                                                                            <input
                                                                                style={{
                                                                                    border: "1px solid",
                                                                                    width: "100%",
                                                                                    borderRadius: "5px",
                                                                                }}
                                                                            // value={item.price}
                                                                            // onChange={(e) => handleOnchangeInput(e, 'price', item.label)}
                                                                            />
                                                                        </div>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md={2}>
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
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                        {item?.sizes?.length >= 1 &&
                                                            item.sizes.map(size => {
                                                                return (
                                                                    <Col md={1}>
                                                                        <FormGroup>
                                                                            <Label for="description">Size: {size.label}</Label>
                                                                            <div>
                                                                                <input
                                                                                    style={{
                                                                                        border: "1px solid",
                                                                                        width: "100%",
                                                                                        borderRadius: "5px",
                                                                                    }}
                                                                                    // value={size.quantity}
                                                                                    placeholder="Quantity"
                                                                                // onChange={(e) => handleOnchangeInput(e, 'quantity', item.label, size.label)}
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
                                    this.createProduct(e);
                                }}
                            >
                                Thêm Mới
                            </Button>
                            <Button color="secondary"
                                onClick={() => this.toggleModal()}
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
}

export default UpdateProduct;
