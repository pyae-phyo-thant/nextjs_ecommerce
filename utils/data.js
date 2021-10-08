import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "John",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("password"),
      isAdmin: true,
    },
    {
      name: "User",
      email: "user@gmail.com",
      password: bcrypt.hashSync("password"),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: "Free shirt",
      slug: "free-shirt",
      category: "shirts",
      image: "/images/shirt.jpg",
      price: 40,
      brand: "Nike",
      rating: 4.3,
      numReviews: 10,
      countInStock: 20,
      description: "a popular shirt",

      color: "Black",
      size: "M",
    },
    {
      name: "Free two shirt",
      slug: "free-two-shirt",
      category: "shirts",
      image: "/images/shirt.jpg",
      price: 40,
      brand: "Nike",
      rating: 4.3,
      numReviews: 10,
      countInStock: 20,
      description: "a popular shirt",

      color: "Black",
      size: "M",
    },
    {
      name: "Free three shirt",
      slug: "free-three-shirt",
      category: "shirts",
      image: "/images/shirt.jpg",
      price: 40,
      brand: "Nike",
      rating: 4.3,
      numReviews: 10,
      countInStock: 20,
      description: "a popular shirt",

      color: "Black",
      size: "M",
    },
    {
      name: "Free shoe",
      slug: "free-shoe",
      category: "shoe",
      image: "/images/shoe.jpg",
      price: 40,
      brand: "Nike",
      rating: 4.3,
      numReviews: 10,
      countInStock: 20,
      description: "a popular shirt",

      color: "Black",
      size: "M",
    },
    {
      name: "Free two shoe",
      slug: "free-two-shoe",
      category: "shoe",
      image: "/images/shoe.jpg",
      price: 40,
      brand: "Nike",
      rating: 4.3,
      numReviews: 10,
      countInStock: 20,
      description: "a popular shirt",

      color: "Black",
      size: "M",
    },
  ],
};

export default data;
