import React,{ useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import PriceDetails from "../../components/PriceDetails";
import noCartImage from "../../images/logo/cart.png";
import "./style.css";
import { MaterialButton } from "../../components/MaterialUI";
import LoginMoadal from "../../components/Header/LoginModal";

/* Before Login
add product to cart
save in localstorage
when try to checkout ask for credentials and
if logged in then add roducts to users cart database from localstorage
*/

const CartPage = (props) => {

  
    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();
    
    useEffect(() => {
       setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
      if(auth.authenticate){
        setLoginModal(false);
         dispatch(getCartItems());
      }
    }, [auth.authenticate]);

    const onQuantityIncrement = (_id, qty) => {
    //   console.log({ _id, qty });
      const {  name, price, img } = cartItems[_id];
      dispatch(addToCart({  _id, name, price, img }, 1));
    };

    const onQuantityDecrement = (_id, qty) => {
        //   console.log({ _id, qty });
      const {  name, price, img } = cartItems[_id];
      dispatch(addToCart({  _id, name, price, img }, -1));
    };

    const onRemoveCartItem = (_id) => {
      dispatch(removeCartItem({ productId: _id }));
    };

    if(props.onlyCartItems){
      return(
        <>
              {
              Object.keys(cartItems).map((key, index) =>  
                <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
                />
                )
              }
        </>
      )
    }

    const userLogin = () => {
      setSignup(false);
      setLoginModal(true);
    }

    const renderEmptyCartPage = () => {
      return(
        <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card
         headerLeft={`My Cart`}>
          <div style={{ textAlign: "center"}} >
           <img src={noCartImage} className="imgCart" alt=""/> 
           <div className="missingCart">{auth.authenticate ? "Your cart is empty!" : "Missing cart Items?"}</div>
           <div className="loginCart">{auth.authenticate ? "It's a good day to buy the items you saved for later!" :"Login to see the items you added previously"}</div>
           {!auth.authenticate &&
            <MaterialButton
            title={ "Login"}
            bgColor="#fb641b"
            textColor="#ffffff"
            style={{
              width: "200px",
              padding: "10px 80px 40px 530px",
            }}
            onClick={userLogin}
          />
           }
          </div>
        </Card>
        </div>
      )
    }

    const renderNonEmptyCartPage = () => {
      return(
        <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <Card 
        headerLeft={`My Cart (${Object.keys(cartItems).length}) `}
        headerRight={<div>Deliver to</div>}
        style={{ width: "calc(100% - 400px)", overflow: 'hidden' }}
        >
            {
                Object.keys(cartItems).map((key, index) =>  
                <CartItem
              key={index}
              cartItem={cartItems[key]}
              onQuantityInc={onQuantityIncrement}
              onQuantityDec={onQuantityDecrement}
              onRemoveCartItem={onRemoveCartItem}
                />
                )
            }

       <div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push(`/checkout`)}
              />
            </div>
          </div>
         
        </Card>
        <PriceDetails
        totalItem={Object.keys(cart.cartItems).reduce(function(qty, key) {
          return qty + cart.cartItems[key].qty;
        }, 0)}
        totalPrice={Object.keys(cart.cartItems).reduce(function(totalPrice, key) {
          const { price, qty } = cart.cartItems[key];
          return totalPrice + price * qty;
        }, 0)}
        />
      </div>
      )
    }
    
   
  return (
    <Layout>
      <LoginMoadal 
      loginModal={loginModal}
      onClose={() => setLoginModal(false)}
      signup={signup}
      />
      {Object.keys(cart.cartItems).length > 0 && renderNonEmptyCartPage()}
      {Object.keys(cart.cartItems).length === 0 && renderEmptyCartPage()}
    </Layout>
  );
};

export default CartPage;
