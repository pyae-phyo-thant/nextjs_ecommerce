import React, { useContext, useEffect, useReducer } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Grid,
  Typography,
  Card,
  List,
  ListItem,
  CircularProgress,
} from "@mui/material";

import Layout from "../../components/layout/Layout";
import { Store } from "../../utils/Store";
import CheckOutStep from "../../components/checkOut/CheckOutStep";
import { getError } from "../../utils/error";

//Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Order = ({ params }) => {
  const orderId = params.id;
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    order: {},
  });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;
  console.log("or", order);

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }

    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });

        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        console.log("ew", data);

        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [order]);
  console.log("err", error);

  return (
    <Layout title="Order Detail">
      <div className="bg-white px-4 mt-10  mx-auto text-center">
        <p className="font-extrabold text-3xl">Order</p>
        <CheckOutStep activeStep={2} />
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p>{error}</p>
        ) : (
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
                    {orderItems.map((cartItem) => (
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
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    </Layout>
  );
};

export default Order;

export async function getServerSideProps({ params }) {
  return { props: { params } };
}
