import React, { useState, useEffect } from "react";
import "./style.css";
import flipkartLogo from "../../images/logo/flipkart.png";
import goldenStar from "../../images/logo/golden-star.png";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown, IoIosSearch } from "react-icons/io";
import { DropdownMenu } from "../MaterialUI";
import { signout } from "../../actions";
import Cart from "../UI/Cart";
import LoginMoadal from "./LoginModal";
import { useHistory } from "react-router-dom";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();

  const currentTab = (history, path) => {
    console.log("history", history);
    if (history.location.pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.firstName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: `/account/orders`, icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu" style={{cursor: "pointer"}}>
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              className="newCustomer"
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <LoginMoadal
        loginModal={loginModal}
        onClose={() => setLoginModal(false)}
        signup={signup}
      />
      <div className="subHeader">
        {/* Logo  */}
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        {/* logo ends here */}
        {/* search component */}
        <div
          style={{
            padding: "0 10px",
          }}
        >
          {
            !currentTab(history, "/checkout") && (
              <div className="searchInputContainer">
                <input
                  className="searchInput"
                  placeholder={"search for products, brands and more"}
                />
                <div className="searchIconContainer">
                  <IoIosSearch
                    style={{
                      color: "#2874f0",
                    }}
                  />
                </div>
              </div>
            )
            /* search component ends here */
          }
          </div>
          { !currentTab(history,"/checkout") &&  
        
        /* right side menu */
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          {!currentTab(history, "/cart") && (
            <DropdownMenu
              menu={
                <a className="more">
                  <span>More</span>
                  <IoIosArrowDown />
                </a>
              }
              menus={[
                { label: "Notification Preference", href: "", icon: null },
                { label: "Sell on flipkart", href: "", icon: null },
                { label: "24x7 Customer Care", href: "", icon: null },
                { label: "Advertise", href: "", icon: null },
                { label: "Download App", href: "", icon: null },
              ]}
            />
          )}

          <div>
            {!currentTab(history, "/cart") && (
              <a href={`/cart`} className="cart">
                <Cart count={Object.keys(cart.cartItems).length} />

                <span style={{ margin: "0 10px" }}>Cart</span>
              </a>
            )}
          </div>
        </div>
        /* right side menu ends here */ }
      </div>
    </div>
  );
};

export default Header;
