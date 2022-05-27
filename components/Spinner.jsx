import React, {useState} from 'react';
import { css } from "@emotion/react";
import RingLoader from "react-spinners/RingLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


function Spinner({ message }) {
  let [color, setColor] = useState("#00BFFF");
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <RingLoader className="m-5" color={color}  css={override} size={60} />

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;