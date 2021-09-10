import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Modal from "../../components/UI/Modal";
import Input from "../../components/UI/input";
import Layout from "../../components/Layout";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "../../actions";

const NewPage = (props) => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const page = useSelector(state => state.page);

  useEffect(() => {
    console.log("category", category);
    setCategories(linearCategories(category.categories));
  }, [category]);

  useEffect(() => {
    if(!page.loading){
      setCreateModal(false);
      setTitle('');
      setCategoryId('');
      setDesc('');
      setProducts([]);
      setBanners([]);
    }
  }, [page])

  const onCategoryChange = (e) => {
    const category = categories.find(category => category.value == e.target.value)
    setCategoryId(e.target.value);
    setType(category.type);
  }

  const handleBannersImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  };

  const handleProductsImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const submitPageForm = (e) => {

    if(title === ""){
      alert('Title is required');
      setCreateModal(false);
      return;
    }

    const form = new FormData();
     form.append('title', title);
     form.append('description', desc);
     form.append('category', categoryId);
     form.append('type', type);
     banners.forEach((banner, index) => {
       form.append('banners',banner);
     });
     products.forEach((product, index) => {
      form.append('products',product);
    });
    dispatch(createPage(form));
    
  };



  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create new Page"}
        handleHide={() => setCreateModal(false)}
        handleClose={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* {<select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>} */}
              <Input
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder="Select Category"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Page Title"}
                className=" form-control-sm"
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Page Description"}
                className="form-control-sm"
              />
            </Col>
          </Row>

          {
              banners.length > 0 ?
              banners.map((banner, index) => 
                <Row key={index} >
                 <Col>{banner.name}</Col>
                </Row>
              ) : null
            }

          <Row>
            <Col>
              <label>Select Banner</label> 
              <Input
                type="file"
                name="banners"
                onChange={handleBannersImages}
              />
            </Col>
          </Row>

          {
              products.length > 0 ?
              products.map((product, index) => 
                <Row key={index} >
                 <Col>{product.name}</Col>
                </Row>
              ) : null
            }

          <Row>
            <Col>
              <label>Select Products</label> 
              <Input
                type="file"
                name="Products"
                onChange={handleProductsImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      {
        page.loading ? 
       <div><h>Creating New Page... Please wait</h></div>
        :
        <>
          {renderCreatePageModal()}
          <button onClick={() => setCreateModal(true)}>Create Page</button>
        </>
      }
    </Layout>
  );
};

export default NewPage;
