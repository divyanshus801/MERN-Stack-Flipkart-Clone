import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { generatePublicUrl } from "../../../urlConfig";
import "./style.css";
import { Link } from 'react-router-dom';
import Card from '../../../components/UI/Card';
import Price from '../../../components/UI/Price';
import Rating from "../../../components/UI/Rating";
import { MaterialButton } from '../../../components/MaterialUI';

const ProductStore = (props) => {

    const product = useSelector((state) => state.product);
    const priceRange = product.priceRange;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(props);
    dispatch(getProductsBySlug(props.match.params.slug));
  }, []);


    return (
        <>
        {Object.keys(priceRange).map((key, index) => {
        return (
          <Card
          headerLeft={`${props.match.params.slug} mobile under ${priceRange[key]}`}
          headerRight={
            <MaterialButton
              title={"VIEW ALL"}
              style={{
                width: "96px"
              }}
              bgColor="#2874f0"
              fontSize="12px"
              height="40px"
            />
          }
          style={{
            width: "calc(100% - 40px)",
            margin: "20px",
          }}
        >
          
            <div style={{display: 'flex'}}>
              {product.productsByPrice[key].map((product) => (
                <Link to={`/${product.slug}/${product._id}/p`}
                style={{
                  display: "block",
                  textDecoration: "none",
                  color: "#000",
                }} 
                className="productContainer">
                  <div className="productimgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo" style={{textDecoration: "none"}} >
                    <div style={{ margin: "5px 0" }}>{product.name} </div>
                    <div>
                      <Rating value="4.3" />&nbsp;&nbsp;
                      <span
                        style={{
                          color: "#777",
                          fontWeight: "500",
                          fontSize: "12px",
                        }}
                      >
                        (3353)
                      </span>
                    </div>
                    <Price value={product.price} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        );
      })}
        </>
    )
}

export default ProductStore;
