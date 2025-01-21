import styled from "styled-components";
import { LuBox } from "react-icons/lu";
import { LuPencilLine } from "react-icons/lu";
import { FaWonSign } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { BsCreditCardFill } from "react-icons/bs";
import { MdAccountBalance } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Title = styled.span`
  font-size: 22px;
  font-weight: 800;
  width: 100%;
  margin-right: auto;
`;

const Banner = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 24px;
  width: 100%;
  margin-top: 70px;
  display: flex;
  gap: 6px;
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
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: 1px solid black;
  }
`;

const ItemImage = styled.img`
  width: 145px;
  height: 95px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 24px;
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
  width: 294px;
  height: 218px;
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

const CardWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 8px;
`;

const Card = styled.button<{ isActive: boolean }>`
  width: 184px;
  height: 48px;
  border: ${(props) =>
    props.isActive ? "1px solid #8e8eff" : "1px solid #A2A2A4"};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#8e8eff" : "transparent")};
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
    color: #4e4eff;
  }
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
  margin-top: 100px;
`;

interface CheckedItems {
  terms: boolean;
  productInfo: boolean;
  emailConfirm: boolean;
}

const Payment = () => {
  const [cardToggle, setCardToggle] = useState(false);

  const [personState, setPersonState] = useState<boolean>(true);
  const [institutionState, setInstitutionState] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handlePurchaseClick = () => {
    if (!isAllChecked()) {
      alert("유의사항에 전부 동의해주세요!");
    } else {
      // 주문 성공 페이지로 이동
      navigate("/payment/success");
    }
  };

  const isAllChecked = () => {
    return Object.values(checkedItems).every(Boolean);
  };

  return (
    <Wrapper>
      <Title>주문서</Title>
      <Banner>
        <LuBox />
        <span>주문상품</span>
      </Banner>
      {/* {items.map((item, index) => (
        <CartItem key={index}>
          <ItemImage src={item.image} alt={item.name} />
          <ItemDetails>
            <ItemName>{item.name}</ItemName>
          </ItemDetails>
          <ItemPriceDetail>
            <ItemPrice>{item.price.toLocaleString()}원</ItemPrice>
          </ItemPriceDetail>
        </CartItem>
      ))} */}
      <Banner>
        <FaRegUser />
        <span>주문자</span>
      </Banner>
      <Form>
        <FormGroup>
          <Label>주문자명</Label>
          <Input type="text" placeholder="(예시)홍길동" />
        </FormGroup>
        <FormGroup>
          <Label>휴대폰 번호</Label>
          <Input type="text" placeholder="휴대폰 번호" />
        </FormGroup>
        <FormGroup>
          <Label>이메일</Label>
          <Input type="text" placeholder="example@example.com" />
        </FormGroup>
      </Form>
      <Banner>
        <LuPencilLine />
        <span>사용권</span>
      </Banner>
      <BoxTitle>사용권 유형</BoxTitle>
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
      <Banner>
        <FaWonSign />
        <span>결제 금액</span>
      </Banner>
      <PriceWrapper>
        <TotalPrice>
          <span>총 상품 금액</span>
          {/* <span>{totalAmount.toLocaleString()}</span> */}
        </TotalPrice>
        <Discount>
          <span>총 할인 금액</span>
          <span>-{4000}</span>
        </Discount>
      </PriceWrapper>
      <FinalPrice>
        <span>최종 결제 금액</span>
        {/* <span>{(totalAmount - 4000).toLocaleString()}</span> */}
      </FinalPrice>
      <Banner>
        <MdOutlinePayment />
        <span>결제 수단</span>
      </Banner>
      <CardWrapper>
        <Card onClick={() => setCardToggle(false)} isActive={!cardToggle}>
          <BsCreditCardFill />
          <span>신용카드</span>
        </Card>
        <Card onClick={() => setCardToggle(true)} isActive={cardToggle}>
          <MdAccountBalance />
          <span>가상계좌</span>
        </Card>
      </CardWrapper>
      <Banner>
        <AiOutlineExclamationCircle />
        <span>유의 사항 및 구매 확인</span>
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
            유의사항 및 최종 사용자 라이센스계약을 확인하였습니다.
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
            구매한 상품은 이메일로 전송됩니다. 이메일이 정확한지 다시 한번 확인
            하십시오.
            <span> (필수)</span>
          </p>
        </div>
      </CheckBoxWrapper>
      <ButtonWrapper>
        <PurchaseButton onClick={handlePurchaseClick}>주문하기</PurchaseButton>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Payment;
