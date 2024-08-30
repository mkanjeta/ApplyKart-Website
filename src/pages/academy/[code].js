import AcademyData from "components/pages/academy";
import {useRouter} from "next/router";
import { useEffect, useState } from "react";
export default function Academy(props) {
  const router = useRouter();
  const [coupon,setCoupon] = useState('-');
  useEffect(()=>{
    setCoupon(router.query.code)
  },[router.query.code])
  return <AcademyData {...props} coupon={coupon} />;
}