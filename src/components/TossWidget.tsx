import {
  loadTossPayments,
  ANONYMOUS,
  WidgetPaymentMethodWidget,
  WidgetAgreementWidget,
} from "@tosspayments/tosspayments-sdk";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { payItems } from "../atoms/authAtom";
import styled from "styled-components";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = "xaszxdbW4vJ08QWeRLRdT";

interface WidgetsProps {
  setAmount: ({
    currency,
    value,
  }: {
    currency: string;
    value: number;
  }) => Promise<void>;
  renderPaymentMethods: ({
    selector,
    variantKey,
  }: {
    selector: string;
    variantKey: string;
  }) => Promise<WidgetPaymentMethodWidget>;
  requestPayment: ({
    orderId,
    orderName,
    successUrl,
    failUrl,
    customerEmail,
    customerName,
    customerMobilePhone,
  }: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail: string;
    customerName: string;
    customerMobilePhone: string;
  }) => Promise<void>;
  renderAgreement: ({
    selector,
    variantKey,
  }: {
    selector: string;
    variantKey: string;
  }) => Promise<WidgetAgreementWidget>;
}

const PurchaseButton = styled.button`
  width: 196px;
  height: 48px;
  border-radius: 8px;
  background-color: #4e4eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export default function TossWidget() {
  const payInfo = useRecoilValue(payItems);
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<WidgetsProps>();

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      // 회원 결제
      const widgets = tossPayments.widgets({
        customerKey,
      });
      // 비회원 결제
      // const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets);
    }

    fetchPaymentWidgets();
  }, [clientKey, customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (widgets == null) {
        return;
      }
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount({ currency: "KRW", value: payInfo.totalAmount });

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: "#payment-method",
          variantKey: "DEFAULT",
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: "#agreement",
          variantKey: "AGREEMENT",
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets, payInfo]);

  useEffect(() => {
    if (widgets == null) {
      return;
    }

    widgets.setAmount({ currency: "KRW", value: payInfo.totalAmount });
  }, [widgets, payInfo]);

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 결제 UI */}
        <div id="payment-method" />
        {/* 이용약관 UI */}
        <div id="agreement" />
        {/* 쿠폰 체크박스 */}

        {/* 결제하기 버튼 */}
        <ButtonWrapper>
          <PurchaseButton
            className="button"
            disabled={!ready}
            onClick={async () => {
              try {
                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                await widgets?.requestPayment({
                  orderId: nanoid(),
                  orderName:
                    payInfo.bluePrintNames.length > 1
                      ? `${payInfo.bluePrintNames[0]} 외 ${
                          payInfo.bluePrintNames.length - 1
                        }개`
                      : `${payInfo.bluePrintNames[0]}`,
                  successUrl: window.location.origin + "/payment/loading",
                  failUrl: window.location.origin + "/payment/fail",
                  customerEmail: payInfo.customerEmail,
                  customerName: payInfo.customerName,
                  customerMobilePhone: payInfo.customerMobilePhone,
                });
              } catch (error) {
                // 에러 처리하기
                console.error(error);
              }
            }}
          >
            결제하기
          </PurchaseButton>
        </ButtonWrapper>
      </div>
    </div>
  );
}
