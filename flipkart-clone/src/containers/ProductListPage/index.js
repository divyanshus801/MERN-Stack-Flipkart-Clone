import React from "react";
import Layout from "../../components/Layout";
import "./style.css";
import ProductStore from "./ProductStore";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from './ClothingAndAccessories';
import getParams from "../../utils/getParams";

const ProductListPage = (props) => {
  
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    let content = null;
    switch(params.type){
      case "store":
        content = <ProductStore {...props} />;
        break;
        case "page":
          content = <ProductPage {...props} />
        break;
        default: 
          content = <ClothingAndAccessories {...props} />;
    }
    return content;
  }

  return (
    <Layout>
      {renderProduct()}
    </Layout>
  );
};

export default ProductListPage;
