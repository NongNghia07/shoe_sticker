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
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from "reactstrap";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useCallPostAPI from "../../../../customHook/UseCallPostApi";
import CreateCategory from "../category/CreateCategory";

const animatedComponents = makeAnimated();

const CreateProduct = (props) => {

    const {
        isCreateModal,
        toggleModal,
        loadData,
        callGet,
        handleUpdateImages,
        refreshDataCategory,
        lstCategory
    } = props;

    const [productData, setProductData] = useState({})
    const [lstProductDetail, setLstProductDetail] = useState([])
    const { data, isError, isLoading, callPost } = useCallPostAPI()
    let userId = null
    //Category_______________________________________________________________

    const [isCreateCateModal, setIsCreateCateModal] = useState(false)

    useEffect(() => {
        refreshDataCategory()
    }, [])


    const toggleCreateCateModal = () => {
        setIsCreateCateModal(!isCreateCateModal)
    }

    //_______________________________________________________________________


    //Color__________________________________________________________________________
    const [lstColor, setLstColor] = useState([]);
    const [lstColorSelected, setLstColorSelected] = useState([]);

    useEffect(() => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ value: p.id, label: p.name }))
            setLstColor([...arr])
        }
        callGet(`http://localhost:8080/api/color/findAll`, getData)

    }, [])

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
    const [lstSize, setLstSize] = useState([]);
    useEffect(() => {
        const getData = (data) => {
            let arr = []
            data?.map(p => arr.push({ value: p.id, label: p.name }))
            setLstSize([...arr])
        }
        callGet(`http://localhost:8080/api/size/findAll`, getData)

    }, [])

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
        // create media
        const createImages = (poductDetail) => {
            let lstMedia = []
            lstImage.map(p => {
                if (poductDetail.map(o => o.colorId).includes(p.colorId)) {
                    let index = poductDetail.map(x => x.colorId).indexOf(p.colorId)
                    lstMedia.push({ productDataId: data.id, productDetailId: poductDetail[index].id, created: userId, type: 1, url: p.fileName })
                } else {
                    lstMedia.push({ productDataId: data.id, productDetailId: "", created: userId, type: 1, url: p.fileName })
                }
            })
            callPost(`http://localhost:8080/api/media/createAll`, lstMedia);
            handleUpdateImages(lstImage)
            toggleModal()
        }

        // create productDetail
        let copyLstProductDetail = []
        lstColorSelected.map(p => {
            p.sizes.map(s => copyLstProductDetail.push({ productDataId: data.id, colorId: p.value, sizeId: s.value, quantity: s.quantity, price: p.price, created: userId }))
        })
        setLstProductDetail([...copyLstProductDetail])
        callPost(`http://localhost:8080/api/productDetail/createAll`, copyLstProductDetail, createImages);
        loadData()
    }



    //Product________________________________________________________________
    const createProduct = (e) => {
        e.preventDefault()
        //create productData
        const createPro = (data) => {
            userId = data.id
            let copyProductData = { ...productData }
            let totalProductQuantity = 0
            lstColorSelected.map(p => p.sizes.map(size => {
                totalProductQuantity += Number(size.quantity)
            }))
            copyProductData['quantity'] = totalProductQuantity
            copyProductData['created'] = userId
            setProductData({ ...copyProductData })
            // call api create pro
            callPost(`http://localhost:8080/api/productData/create`, copyProductData, createProductDetail);
        }
        callPost("http://localhost:8080/api/userData/getUserAuthenticate", "", createPro)
        //__________________
    }

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

    //Image_______________________________________________________________________
    const [lstImage, setImage] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const handleImages = (e, color, colorId) => {
        if (color !== 'imgAll') {
            let coppy = [...lstImage]
            if (e.target.files.length <= 0) {
                let index = coppy.map(p => p.color).indexOf(color)
                if (index !== -1) {
                    coppy.splice(index, 1)
                    setImage(coppy)
                    setActiveIndex(0)
                    return
                }
            } else {
                let imageFile = e.target.files[0];
                let index = coppy.map(p => p.fileName).indexOf(imageFile.name)
                if (index !== -1) {
                    coppy.map(p => { if (p.color === color) return p.color = "", p.colorId = "" })
                    coppy[index].color = color
                    coppy[index].colorId = colorId
                    setImage(coppy)
                } else {
                    coppy.map(p => { if (p.color === color) return p.color = "", p.colorId = "" })
                    coppy.push({ file: imageFile, fileName: imageFile.name, color: color, colorId: colorId })
                    setImage(coppy)
                }
            }
        } else {
            setImage([]);
            //Get files
            for (let i = 0; i < e.target.files.length; i++) {
                // if(!".jpg" in e.target.files[i]){
                //     continue;
                // }
                let imageFile = e.target.files[i];
                setImage((prev) => [...prev, { file: imageFile, fileName: imageFile.name, color: "", colorId: colorId }]);
            }
            setActiveIndex(0)
        }
    };

    const onExiting = () => {
        setAnimating(true)
    }

    const onExited = () => {
        setAnimating(false)
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === lstImage.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? lstImage.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const colorImg = (color) => {
        let text = 'img' + color + 'Product'
        document.getElementById(text).click()
    }

    let slides = lstImage.map((item) => {
        return (
            <CarouselItem
                onExiting={onExiting}
                onExited={onExited}
                key={item.name}
            >
                <img src={URL.createObjectURL(item.file)} alt={item.altText} />
                {/* <CarouselCaption captionText={item.caption} captionHeader={item.caption} /> */}
            </CarouselItem>
        );
    });

    //_____________________________________________________________________________

    return (
        <>
            <Modal isOpen={isCreateModal} toggle={() => { toggleModal(); setImage([]) }} size="xl" centered>
                <Form
                // onSubmit={handleSubmit(createProduct)} innerRef={ref}
                >
                    <ModalHeader toggle={() => { toggleModal(); setImage([]) }}>Add</ModalHeader>
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
                                                    onClick={() => toggleCreateCateModal()}
                                                >
                                                    +
                                                </button>
                                            </Col>
                                        </Row>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
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
                                                id="fileImg"
                                                multiple
                                                onChange={(e) => { handleImages(e, "imgAll") }}
                                            // style={{
                                            //     border: "1px solid",
                                            //     width: "100%",
                                            //     borderRadius: "5px",
                                            // }}
                                            />
                                            {lstImage.length >= 1 &&
                                                <Carousel
                                                    activeIndex={activeIndex}
                                                    next={next}
                                                    previous={previous}
                                                    style={{
                                                        border: "1px solid",
                                                        marginTop: "1%",
                                                        marginBottom: "2%"
                                                    }}
                                                >
                                                    <CarouselIndicators items={lstImage} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                                    {slides}
                                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                                </Carousel>
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            {lstColorSelected.length >= 1 && (
                                <Col md={12} >
                                    <Row >
                                        {lstColorSelected.map((item) => {
                                            let arrSize = [...item.sizes]
                                            return (
                                                <>
                                                    <Col md={8} style={{ borderTop: "1px solid #e5e5e5" }}>
                                                        <Row>
                                                            <p>{item.label}</p>
                                                            <Col md={9} >
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
                                                            <Col md={3} >
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
                                                        </Row>
                                                    </Col>
                                                    <Col md={4} style={{ borderTop: "1px solid #e5e5e5" }}>
                                                        <Row>
                                                            <Col md={12}>
                                                                <FormGroup>
                                                                    <input
                                                                        type="file"
                                                                        id={`img${item.label}Product`}
                                                                        onChange={(e) => { handleImages(e, item.label, item.value) }}
                                                                        style={{
                                                                            border: "1px solid",
                                                                            width: "100%",
                                                                            borderRadius: "5px",
                                                                            display: 'none'
                                                                        }}
                                                                    />
                                                                    {lstImage.length >= 1 && lstImage.map(p => p.color).includes(item.label) &&
                                                                        lstImage.map(img => {
                                                                            if (img.color == item.label) {
                                                                                return (
                                                                                    <img src={URL.createObjectURL(img.file)}
                                                                                        width="100%"
                                                                                        height="242rem"
                                                                                        style={{
                                                                                            borderRadius: "15px",
                                                                                            border: "1px solid",
                                                                                            marginTop: "3%",
                                                                                            marginRight: "2%",
                                                                                        }}
                                                                                        onClick={(e) => colorImg(item.label)}
                                                                                    />
                                                                                )
                                                                            }
                                                                        })
                                                                    }
                                                                    {lstImage.length >= 1 && !lstImage.map(p => p.color).includes(item.label) &&
                                                                        <img src=""
                                                                            width="100%"
                                                                            height="242rem"
                                                                            style={{
                                                                                borderRadius: "15px",
                                                                                border: "1px solid",
                                                                                marginTop: "3%",
                                                                                marginRight: "2%",
                                                                            }}
                                                                            onClick={(e) => colorImg(item.label)}
                                                                        />
                                                                    }
                                                                    {lstImage.length < 1 &&
                                                                        <img src=""
                                                                            width="100%"
                                                                            height="242rem"
                                                                            style={{
                                                                                borderRadius: "15px",
                                                                                border: "1px solid",
                                                                                marginTop: "3%",
                                                                                marginRight: "2%",
                                                                            }}
                                                                            onClick={(e) => colorImg(item.label)}
                                                                        />
                                                                    }
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                    </Col>
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
                            onClick={() => { toggleModal(); setImage([]) }}
                        >
                            Hủy
                        </Button>
                    </ModalFooter>
                </Form>
                <CreateCategory
                    isCreateModel={isCreateCateModal}
                    toggleCreateModal={toggleCreateCateModal}
                    refreshData={refreshDataCategory}
                />
            </Modal>
        </>
    )
}

export default CreateProduct;