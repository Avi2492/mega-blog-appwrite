import React from "react";
import { Oval } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#607274"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
}

export default LoadingSpinner;
