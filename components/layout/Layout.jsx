import React from "react";
import Head from "next/head";

const Layout = ({ title, description, children }) => {
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  return (
    <>
      <Head>
        <title>{title ? `${title} - Shop MM` : "Shop"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>

      <div>{children}</div>
    </>
  );
};

export default Layout;
