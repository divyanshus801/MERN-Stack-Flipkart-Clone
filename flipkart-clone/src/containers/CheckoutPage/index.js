import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import {
  MaterialButton,
  MaterialInput,
  Anchor,
} from "../../components/MaterialUI";
import { addOrder, getAddress, getCartItems } from "../../actions";
import PriceDetails from "../../components/PriceDetails";
import AddressForm from "./AddressForm";
import { IoMdCheckmark } from "react-icons/io";
import CartPage from "../CartPage/index";
import Card from "../../components/UI/Card";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader ${props.active && "active"}`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <div className="stepTitle">
            {props.steptitle}
            <span className="titleIcon">{props.titleIcon}</span>
          </div>
        </div>
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  onAddressSubmit,
  enableAddressEditForm,
  confirmDeliveryAddress,
  selectAddress,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <MaterialButton
                title="DELIVERY HERE"
                onClick={() => confirmDeliveryAddress(adr)}
                style={{
                  width: "200px",
                  margin: "10px 0",
                }}
              />
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const CheckoutPage = (props) => {
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState();
  const dispatch = useDispatch();
  const [login, setLogin] = useState("LOGIN");

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(adr)
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce((totalPrice, key) => {
      const { price, qty } = cart.cartItems[key];
      return totalPrice + price * qty;
    }, 0);

    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty
    }));
    const payload = {
      addressId: selectedAddress && selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod"
    };
    console.log("fdv",payload);
    dispatch(addOrder(payload));
     setConfirmOrder(true);
  };

  if (confirmOrder) {
    return (
      <Layout>
        <Card>
          <div>Thank You</div>
        </Card>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="cartContainer" style={{ alignItems: "flex-start" }}>
        <div className="checkoutContainer">
          {/*Check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            steptitle={"LOGIN"}
            titleIcon={
              auth.authenticate ? <IoMdCheckmark className="icontitle" /> : ""
            }
            active={!auth.authenticate}
            body={
              auth.authenticate ? (
                <div className="loggedInId">
                  <strong>{auth.user.fullName}</strong>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div>
                  <MaterialInput label="Email" />
                </div>
              )
            }
          />

          <CheckoutStep
            stepNumber={"2"}
            steptitle={"DELIVERY ADDRESS"}
            titleIcon={
              confirmAddress ? <IoMdCheckmark className="icontitle" /> : ""
            }
            active={!confirmAddress && auth.authenticate}
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">
                    <strong>{`${selectedAddress.name}`}</strong>&nbsp;
                    {`${selectedAddress.address} -`}
                    <strong>{`${selectedAddress.pinCode}`}</strong>
                  </div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* Address Form */}

          {confirmAddress ? null : newAddress ? (
            auth.authenticate ? (
              <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
            ) : null
          ) : (
            <CheckoutStep
              stepNumber={"+"}
              steptitle={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          )}

          <CheckoutStep
            stepNumber={"3"}
            steptitle={"ORDER SUMMARY"}
            titleIcon={
              orderConfirmation ? <IoMdCheckmark className="icontitle" /> : ""
            }
            active={orderSummary}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  <strong>{Object.keys(cart.cartItems).length}items </strong>
                </div>
              ) : null
            }
          />
          {orderSummary && (
            <Card
              style={{
                margin: "10px 0 15px 0",
              }}
            >
              <div
                className="flexRow sb "
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                  }}
                >
                  Order confirmation email will be sent to
                  <strong>{auth.user.email}</strong>{" "}
                </p>
                <MaterialButton
                  title="CONTINUE"
                  onClick={userOrderConfirmation}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            steptitle={"PAYMENT OPTIONS"}
            active={paymentOption}
            
            body={
              paymentOption && (
                <div className="stepCompleted">
                  <div
                    className="flexRow"
                    style={{ alignItems: "center", padding: "20px" }}
                  >
                    <input type="radio" name="paymentOption" value="cod" />
                    <div>Cash on delivery</div>
                  </div>
                  <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px  20px",
                    }}
                  />
                </div>
              )
            }
          />
        </div>
        {/* Price component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce(function (
            totalPrice,
            key
          ) {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          },
          0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
