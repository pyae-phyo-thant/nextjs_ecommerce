import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Grid, Typography, Card, List, ListItem } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Layout from "../components/layout/Layout";
import { Store } from "../utils/Store";
import CheckOutStep from "../components/checkOut/CheckOutStep";
import { getError } from "../utils/error";

const placeorder = () => {
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
      setLoading(false);
      router.push(`/order/${data._id}`);
    } catch (error) {
      toast.error(`${getError(error)}`);
      setLoading(false);
    }
  };

  return (
    <Layout title="Shopping Cart">
      <div className="bg-white px-4 mt-10  mx-auto text-center">
        <p className="font-extrabold text-3xl">Place Order</p>
        <CheckOutStep activeStep={2} />
        <Grid container spacing={2} className="mt-4">
          <Grid item md={9} xs={12}>
            <Card className="mb-3">
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}, {shippingAddress.email},{" "}
                  {shippingAddress.phoneNumber}
                </ListItem>
              </List>
            </Card>
            <Card className="mt-3">
              <List>
                <ListItem>
                  <Typography component="h5" variant="h5">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
              </List>
            </Card>
            <div className="mt-8">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((cartItem) => (
                    <li key={cartItem._id} className="py-6 flex">
                      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                        <Link href={`/product/${cartItem.slug}`} passHref>
                          <img
                            src={cartItem.image}
                            height={150}
                            width={150}
                            className="w-full h-full object-center cursor-pointer object-cover"
                          />
                        </Link>
                      </div>

                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/product/${cartItem.slug}`}>
                                <p className="cursor-pointer">
                                  {cartItem.name}
                                </p>
                              </Link>
                            </h3>
                            <p className="ml-4">$ {cartItem.price}</p>
                          </div>
                          <p className="mt-1 text-left text-sm text-gray-500">
                            {cartItem.color}
                          </p>
                        </div>
                        <div className="flex-1 flex items-end justify-between text-sm">
                          <span>quantity</span>
                          <p>{cartItem.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>

          <Grid item md={3} xs={12}>
            <Card className="">
              <List>
                <ListItem>
                  <Typography variant="h5">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Price:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={loading}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </LoadingButton>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default placeorder;
