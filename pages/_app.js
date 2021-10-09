import "tailwindcss/tailwind.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AnimatePresence } from "framer-motion";

import { StoreProvider } from "../utils/Store";
import Header from "../components/topBar/Header";
import TopBar from "../components/topBar/TopBar";
import Development from "../components/banner/Development";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Development />
      <TopBar />
      <Header />
      <ToastContainer />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </StoreProvider>
  );
}

export default MyApp;
