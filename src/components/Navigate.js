import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Navigate = ({ to }) => {
  const navigate = useRouter();

  useEffect(() => {
    if (to) {
      navigate.push(to);
    }
  }, [to, navigate]);

  return <></>;
};
export default Navigate;
