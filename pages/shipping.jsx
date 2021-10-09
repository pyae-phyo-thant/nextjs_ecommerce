import React, { useContext } from "react";
import { useRouter } from "next/router";

import { Store } from "../utils/Store";

const shipping = () => {
  const router = useRouter();

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
  }, []);

  return <div>shipping</div>;
};

export default shipping;
