import styled from "styled-components";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPayItems } from "../../utils/api";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { payItems } from "../../atoms/authAtom";

const banks = [
  { value: "kb", label: "국민은행" },
  { value: "shinhan", label: "신한은행" },
  { value: "woori", label: "우리은행" },
  { value: "hana", label: "하나은행" },
  { value: "nh", label: "농협은행" },
  { value: "ibk", label: "기업은행" },
  // 추가 은행 목록
];

const Title = styled.span`
  font-size: 22px;
  font-weight: 800;
  width: 100%;
  margin-right: auto;
`;

const TitleBox = styled.span`
  font-size: 14px;
  font-weight: 700;
`;

const Banner = styled.div`
  border-bottom: 1px solid rgba(210, 210, 211, 1);
  padding-bottom: 24px;
  width: 100%;
  margin-top: 70px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid rgba(245, 245, 246, 1);

  &:last-child {
    border-bottom: 1px solid black;
  }
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
`;

const ItemName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const ItemPriceDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ItemPrice = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
`;

const Input = styled.input`
  width: 343px;
  height: 40px;
  padding: 8px;
  border: 1px solid #dbe0e4;
`;

const BoxTitle = styled.span`
  margin: 24px 0;
`;

const BoxWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Box = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 220px;
  padding: 25px;
  border: ${(props) =>
    props.isActive ? "1px solid #4e4eff" : "1px solid #A2A2A4"};
  border-radius: 4px;
  background-color: ${(props) =>
    props.isActive ? "#4e4eff0a" : "transparent"};
  cursor: pointer;
  span {
    margin-left: 8px;
  }
  p {
    margin-top: 20px;
    font-size: 14px;
    color: rgba(162, 162, 164, 1);
  }
`;

const PriceWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Price = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPrice = styled(Price)`
  font-size: 14px;
  font-weight: 700;
`;

const Discount = styled(Price)`
  font-size: 14px;
  font-weight: 700;
  color: #4e4eff;
`;

const FinalPrice = styled(Price)`
  font-size: 22px;
  font-weight: 800;
  border-top: 1px solid #f5f5f6;
  border-bottom: 1px solid #f5f5f6;
  padding: 10px 0;
`;

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
  margin-top: 50px;
`;

const StyledSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  appearance: none; /* 기본 화살표 제거 */
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const StyledErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`;
const CheckBoxWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  p {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
  span {
    font-size: 11px;
    font-weight: 400;
    color: rgba(78, 78, 255, 1);
  }
`;

interface PayResultProps {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PayItemsProps[];
}

interface PayItemsProps {
  blueprintId: number;
  blueprintName: string;
  extension: string;
  author: string;
  price: number;
}

interface PayFormProps {
  name: string;
  bankNumber: string;
  bank: string;
}

interface CheckedItems {
  terms: boolean;
  productInfo: boolean;
  emailConfirm: boolean;
}

const Payment = () => {
  const { data, isLoading } = useQuery<PayResultProps>({
    queryKey: ["payItems"],
    queryFn: getPayItems,
  });

  const [personState, setPersonState] = useState<boolean>(true);
  const [institutionState, setInstitutionState] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PayFormProps>();

  const onPersonClicked = () => {
    setPersonState(true);
    setInstitutionState(false);
  };

  const onInstitutionClicked = () => {
    setPersonState(false);
    setInstitutionState(true);
  };

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    terms: false,
    productInfo: false,
    emailConfirm: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  useEffect(() => {
    if (data && data.result) {
      const total = data.result.reduce((acc, cur) => acc + cur.price, 0);
      setTotalAmount(total);
    }
  }, [data]);

  const handlePurchaseClick = async () => {
    if (!isAllChecked()) {
      alert("유의사항에 전부 동의해주세요!");
    } else {
    }
  };

  const isAllChecked = () => {
    return Object.values(checkedItems).every(Boolean);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return data && data.result.length > 0 ? (
    <Wrapper>
      <Title>주문서</Title>

      <Banner>
        <svg
          width="19"
          height="20"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_13_6774)">
            <path
              d="M16.751 14.8233C17.0088 14.6745 17.1676 14.3994 17.1676 14.1017V5.89633C17.1676 5.59856 17.0087 5.32342 16.7508 5.17458L9.64538 1.07374C9.38763 0.924964 9.07005 0.924964 8.8123 1.07374L1.70682 5.17458C1.44892 5.32342 1.29004 5.59856 1.29004 5.89633V14.1017C1.29004 14.3994 1.44886 14.6745 1.70668 14.8233L8.81213 18.926C9.06996 19.0749 9.38763 19.0749 9.64555 18.926L16.751 14.8233Z"
              stroke="#333333"
              stroke-width="1.25"
              stroke-miterlimit="10"
            />
            <path
              d="M9.22949 9.99902V19.1667"
              stroke="#333333"
              stroke-width="1.25"
              stroke-miterlimit="10"
            />
            <path
              d="M1.29004 5.41516L9.2288 9.99901"
              stroke="#333333"
              stroke-width="1.25"
              stroke-miterlimit="10"
            />
            <path
              d="M17.1682 5.41516L9.22949 9.99901"
              stroke="#333333"
              stroke-width="1.25"
              stroke-miterlimit="10"
            />
          </g>
          <defs>
            <clipPath id="clip0_13_6774">
              <rect
                width="18.3333"
                height="20"
                fill="white"
                transform="translate(0.0625)"
              />
            </clipPath>
          </defs>
        </svg>

        <TitleBox>주문상품</TitleBox>
      </Banner>
      {data?.result.map((item) => (
        <CartItem key={item.blueprintId}>
          <ItemDetails>
            <ItemName>{item.blueprintName}</ItemName>
          </ItemDetails>
          <ItemPriceDetail>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          </ItemPriceDetail>
        </CartItem>
      ))}
      <Form onSubmit={handleSubmit(handlePurchaseClick)}>
        <Banner>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_13_6840)">
              <g clip-path="url(#clip1_13_6840)">
                <g clip-path="url(#clip2_13_6840)">
                  <g clip-path="url(#clip3_13_6840)">
                    <path
                      d="M6.47949 8.75671H13.9795"
                      stroke="#333333"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.47949 12.0402H13.9795"
                      stroke="#333333"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.4792 2.82336C11.4792 2.49185 11.3474 2.1739 11.113 1.93947C10.8786 1.70506 10.5607 1.57336 10.2292 1.57336C9.89767 1.57336 9.57967 1.70506 9.34525 1.93947C9.11083 2.1739 8.97917 2.49185 8.97917 2.82336H6.0625V5.32336H14.3958V2.82336H11.4792Z"
                      stroke="#333333"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.8958 4.07336H16.8958V19.0734H3.5625V4.07336H5.5625"
                      stroke="#333333"
                      stroke-width="1.25"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_13_6840">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.323364)"
                />
              </clipPath>
              <clipPath id="clip1_13_6840">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.323364)"
                />
              </clipPath>
              <clipPath id="clip2_13_6840">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.323364)"
                />
              </clipPath>
              <clipPath id="clip3_13_6840">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.323364)"
                />
              </clipPath>
            </defs>
          </svg>

          <TitleBox>주문자</TitleBox>
        </Banner>
        <FormGroup>
          <Label>은행 선택</Label>
          <StyledSelect
            {...register("bank", { required: "은행을 선택해주세요." })}
          >
            <option value="">은행을 선택하세요</option>
            {banks.map((bank) => (
              <option key={bank.value} value={bank.value}>
                {bank.label}
              </option>
            ))}
          </StyledSelect>
          {errors.bank && (
            <StyledErrorMessage>{errors.bank.message}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>계좌주</Label>
          <Input
            type="text"
            placeholder="홍길동"
            {...register("name", { required: "이름을 입력해주세요." })}
          />
          {errors.name && (
            <StyledErrorMessage>{errors.name.message}</StyledErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Label>계좌번호</Label>
          <Input
            type="text"
            placeholder="01012345678"
            {...register("bankNumber", {
              required: "계좌번호를 입력해주세요.",
            })}
          />
          {errors.bankNumber && (
            <StyledErrorMessage>{errors.bankNumber.message}</StyledErrorMessage>
          )}
        </FormGroup>

        <Banner>
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_13_6877)">
              <path
                d="M15.9105 10.1583L10.0791 15.9897L13.1479 19.0585L18.9793 13.2271L15.9105 10.1583Z"
                stroke="#333333"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.83984 1.92126L6.22096 6.30238"
                stroke="#333333"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.45607 8.52333C9.05993 7.91947 9.05993 6.94042 8.45607 6.33656C7.85221 5.7327 6.87316 5.7327 6.2693 6.33656C5.66544 6.94042 5.66544 7.91947 6.2693 8.52333C6.87316 9.12717 7.85221 9.12717 8.45607 8.52333Z"
                stroke="#333333"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.4169 14.6421L4.05662 12.9824L1.47949 1.56055L12.9013 4.13768L14.561 11.4979"
                stroke="#333333"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_13_6877">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.309448)"
                />
              </clipPath>
            </defs>
          </svg>
          <TitleBox>사용권</TitleBox>
        </Banner>
        <BoxWrapper>
          <Box onClick={onPersonClicked} isActive={personState}>
            <input
              type="radio"
              checked={personState}
              onChange={onPersonClicked}
            />
            <span>개인 사용권</span>
            <p>
              필명이 작품에 반드시 표시되어야 해요. 본인만 사용 가능하고, 공유할
              수 없어요. 여러 작품에 사용 가능해요. 작품마다 다 른 필명을 사용할
              경우, 모든 필명을 입력 해주세요.
            </p>
          </Box>
          <Box onClick={onInstitutionClicked} isActive={institutionState}>
            <input
              type="radio"
              checked={institutionState}
              onChange={onInstitutionClicked}
            />
            <span>기업 사용권</span>
            <p>
              등록한 1개의 작품에만 사용할 수 있어 요. 등록한 작품명과 실제 사용
              작품명이 반 드시 일치해야 해요. 등록한 작품을 작업하는 모든 작가가
              사 용할 수 있어요.
            </p>
          </Box>
        </BoxWrapper>
        <div>
          <Banner>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2298 18.9111C14.8322 18.9111 18.5632 15.1801 18.5632 10.5777C18.5632 5.97534 14.8322 2.24438 10.2298 2.24438C5.62744 2.24438 1.89648 5.97534 1.89648 10.5777C1.89648 15.1801 5.62744 18.9111 10.2298 18.9111Z"
                stroke="#333333"
                stroke-width="1.25"
                stroke-miterlimit="10"
              />
              <path
                d="M5.71875 9.80005H14.7409"
                stroke="#333333"
                stroke-width="1.25"
                stroke-linecap="square"
                stroke-linejoin="bevel"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.1377 7.05542L6.21005 7.35934L7.91557 14.5228H9.13159L10.2291 9.91308L11.3266 14.5228H12.5426L14.2481 7.35934L14.3205 7.05542H13.0355L13.0321 7.06982L11.9346 11.6796L10.8371 7.06982H9.62109L8.52357 11.6796L7.42606 7.06982L7.42264 7.05542H6.1377Z"
                fill="#333333"
              />
            </svg>

            <TitleBox>결제 금액</TitleBox>
          </Banner>
          <PriceWrapper>
            <TotalPrice>
              <span>총 상품 금액</span>
              <span>{totalAmount.toLocaleString()}원</span>
            </TotalPrice>
            <Discount>
              <span>총 할인 금액</span>
              <span>0원</span>
            </Discount>
            <FinalPrice>
              <span>최종 결제 금액</span>
              <span>{totalAmount.toLocaleString()}원</span>
            </FinalPrice>
          </PriceWrapper>
        </div>
        <Banner>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_13_6993)">
              <g clip-path="url(#clip1_13_6993)">
                <g clip-path="url(#clip2_13_6993)">
                  <path
                    d="M10.2298 18.3434C14.8322 18.3434 18.5632 14.6125 18.5632 10.0101C18.5632 5.40772 14.8322 1.67676 10.2298 1.67676C5.62744 1.67676 1.89648 5.40772 1.89648 10.0101C1.89648 14.6125 5.62744 18.3434 10.2298 18.3434Z"
                    stroke="#333333"
                    stroke-width="1.25"
                  />
                  <path
                    d="M10.2295 5.68701V11.937"
                    stroke="#333333"
                    stroke-width="1.25"
                  />
                  <path
                    d="M10.2295 13.083V14.333"
                    stroke="#333333"
                    stroke-width="1.25"
                  />
                </g>
              </g>
            </g>
            <defs>
              <clipPath id="clip0_13_6993">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.0100098)"
                />
              </clipPath>
              <clipPath id="clip1_13_6993">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.0100098)"
                />
              </clipPath>
              <clipPath id="clip2_13_6993">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(0.229492 0.0100098)"
                />
              </clipPath>
            </defs>
          </svg>
          <TitleBox>유의사항 및 구매 확인</TitleBox>
        </Banner>
        <CheckBoxWrapper>
          <div>
            <input
              type="checkbox"
              name="terms"
              checked={checkedItems.terms}
              onChange={handleCheckboxChange}
              required={true}
            />
            <p>
              유의사항 및 최종사용자라이센스계약을 확인하였습니다.
              <span> (필수)</span>
            </p>
          </div>
          <div>
            <input
              type="checkbox"
              name="productInfo"
              checked={checkedItems.productInfo}
              onChange={handleCheckboxChange}
              required={true}
            />
            <p>
              구매하실 상품의 확장자 등 상품 및 결제정보를 확인하였으며,
              구매진행에 동의합니다. <span> (필수)</span>
            </p>
          </div>
          <div>
            <input
              type="checkbox"
              name="emailConfirm"
              checked={checkedItems.emailConfirm}
              onChange={handleCheckboxChange}
              required={true}
            />
            <p>
              구매 관련 문의사항이 있으시면 아래 고객센터로 연락주세요.
              <span> (필수)</span>
            </p>
          </div>
        </CheckBoxWrapper>
        <ButtonWrapper>
          <PurchaseButton>주문하기</PurchaseButton>
        </ButtonWrapper>
      </Form>
    </Wrapper>
  ) : (
    <div>구매할 상품이 없습니다.</div>
  );
};

export default Payment;
