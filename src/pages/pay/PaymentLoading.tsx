import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function PaymentLoading() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
  //   // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
  //   const requestData = {
  //     orderId: searchParams.get("orderId"),
  //     amount: searchParams.get("amount"),
  //     paymentKey: searchParams.get("paymentKey"),
  //   };

  //   async function confirm() {
  //     try {
  //       const response = await axios.post("/confirm", requestData);
  //       navigate("/payment/success");
  //     } catch (error) {
  //       alert("결제오류");
  //       navigate("/payment/fail");
  //     }
  //   }
  //   confirm();
  // }, [navigate, searchParams]);

  return <div>Loading...</div>;
}
