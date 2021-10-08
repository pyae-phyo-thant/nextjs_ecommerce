import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import Rating from "@mui/material/Rating";
import { RadioGroup } from "@headlessui/react";

import db from "../../utils/db";
import { Store } from "../../utils/Store";
import Product from "../../models/Products";

import Layout from "../../components/layout/Layout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

let easing = [0.6, -0.05, 0.01, 0.99];

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const ProductDetail = (props) => {
  const { product } = props;
  const { dispatch, state } = useContext(Store);

  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(product.size);
  const reviews = { href: "#", average: 4, totalCount: 117 };

  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = async (e) => {
    e.preventDefault();
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.warning("Sorry, product is out of stock");
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };
  return (
    <Layout title={product.name}>
      <motion.div
        initial="initial"
        animate="animate"
        exit={{ opacity: 0 }}
        className="bg-white pt-6 pb-16 px-4 lg:pt-10 lg:pb-24  sm:px-6 lg:px-8"
      >
        <div className="pt-6">
          <nav aria-label="Breadcrumb mb-3">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <Link
                    href="/"
                    passHref
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Home
                  </Link>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  href="#"
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-3">
            <motion.div
              className="pt-6"
              className="img"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <motion.img
                key={product.image}
                animate={{ x: 0, opacity: 1 }}
                initial={{ x: 200, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.2 }}
                src={product.image}
                width={300}
                height={300}
              />
            </motion.div>
            <motion.div className="col-span-2" variants={stagger}>
              <div className="max-w-2xl mx-auto  lg:max-w-7xl  lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <motion.h1
                    variants={fadeInUp}
                    className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
                  >
                    {product.name}
                  </motion.h1>
                </div>

                {/* Options */}
                <div className="mt-4 lg:mt-0 lg:row-span-3">
                  <motion.h2 className="sr-only" variants={fadeInUp}>
                    Product information
                  </motion.h2>
                  <motion.p
                    variants={fadeInUp}
                    className="text-3xl text-gray-900"
                  >
                    Price: ${product.price}
                  </motion.p>

                  <motion.p className="text-sm" variants={fadeInUp}>
                    In Stock: {product.countInStock}
                  </motion.p>

                  {/* Reviews */}
                  <div className="mt-6">
                    <motion.h3 className="sr-only" variants={fadeInUp}>
                      Reviews
                    </motion.h3>
                    <div className="flex items-center">
                      <motion.div
                        className="flex items-center"
                        variants={fadeInUp}
                      >
                        <span className="text-sm text-gray-400">
                          {product.rating}
                        </span>
                        <Rating
                          name="half-rating"
                          defaultValue={product.rating}
                          precision={0.5}
                        />
                      </motion.div>
                      <motion.p variants={fadeInUp} className="sr-only">
                        {product.rating} out of 5 stars
                      </motion.p>
                      <a
                        href={reviews.href}
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {product.numReviews} reviews
                      </a>
                    </div>
                  </div>
                  <form className="mt-10">
                    {/* Colors */}
                    <div>
                      <motion.h3
                        variants={fadeInUp}
                        className="text-sm text-gray-900 font-medium"
                      >
                        Color
                      </motion.h3>

                      <RadioGroup
                        value={selectedColor}
                        onChange={setSelectedColor}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a color
                        </RadioGroup.Label>
                        <div className="flex items-center space-x-3">
                          {/* {product.colors.map((color) => ( */}
                          <RadioGroup.Option
                            key={product.color}
                            value={product.color}
                            className={({ active, checked }) =>
                              classNames(
                                product.color.selectedClass,
                                active && checked ? "ring ring-offset-1" : "",
                                !active && checked ? "ring-2" : "",
                                "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                              )
                            }
                          >
                            <RadioGroup.Label as="p" className="sr-only">
                              {product.color}
                            </RadioGroup.Label>
                            <span
                              aria-hidden="true"
                              className={classNames(
                                "h-8 w-8 border border-black border-opacity-10 rounded-full"
                              )}
                            />
                          </RadioGroup.Option>
                          {/* ))} */}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-10">
                      <motion.div
                        className="flex items-center justify-between"
                        variants={fadeInUp}
                      >
                        <h3 className="text-sm text-gray-900 font-medium">
                          Size
                        </h3>
                        <a
                          href="#"
                          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Size guide
                        </a>
                      </motion.div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <RadioGroup.Label className="sr-only">
                          Choose a size
                        </RadioGroup.Label>
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {/* {product.sizes.map((size) => ( */}
                          <RadioGroup.Option
                            key={product.size}
                            value={product.size}
                          >
                            {({ active, checked }) => (
                              <>
                                <RadioGroup.Label as="p">
                                  {product.size}
                                </RadioGroup.Label>
                              </>
                            )}
                          </RadioGroup.Option>
                          {/* ))} */}
                        </div>
                      </RadioGroup>
                    </div>

                    <motion.button
                      type="submit"
                      variants={fadeInUp}
                      onClick={addToCartHandler}
                      className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Add to Cart
                    </motion.button>
                  </form>
                </div>

                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  {/* Description and details */}
                  <div>
                    <h3 className="sr-only">Description</h3>

                    <motion.div className="space-y-6" variants={fadeInUp}>
                      <p className="text-base text-gray-900">
                        {product.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="mt-10">
                    <motion.h3
                      className="text-sm font-medium text-gray-900"
                      variants={fadeInUp}
                    >
                      Highlights
                    </motion.h3>

                    <div className="mt-4">
                      <ul
                        role="list"
                        className="pl-4 list-disc text-sm space-y-2"
                      >
                        {/* {product.highlights.map((highlight) => (
                          <li key={highlight} className="text-gray-400">
                            <span className="text-gray-600">{highlight}</span>
                          </li>
                        ))} */}
                        <motion.li
                          className="text-gray-400"
                          variants={fadeInUp}
                        >
                          <span className="text-gray-600">nothing</span>
                        </motion.li>
                        <motion.li
                          className="text-gray-400"
                          variants={fadeInUp}
                        >
                          <span className="text-gray-600">not</span>
                        </motion.li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-sm font-medium text-gray-900">
                      Details
                    </h2>

                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-gray-600">{product.details}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default ProductDetail;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();

  const product = await Product.findOne({ slug }).lean();

  await db.disconnect();

  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}
