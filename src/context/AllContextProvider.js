import React from "react";
import { Suspense } from "react";

const AllContextProvider = ( {children} ) => {
  return <Suspense>{children}</Suspense>;
};
export default AllContextProvider;
