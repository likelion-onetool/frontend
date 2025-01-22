import { useEffect, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import styled from "styled-components";
import Item from "../../components/Item";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addPayItems, getCartItems } from "../../utils/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #f8f8fb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aeaeff;
  font-size: 64px;
`;

const Empty = styled.span`
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
`;
const Go = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #7c7c7c;
  margin-bottom: 12px;
`;

const FamLink = styled(Link)`
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #4e4eff;
  padding: 13px 23px;
  border-radius: 6px;
  color: #4e4eff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const Title = styled.span`
  font-size: 22px;
  font-weight: 800;
  width: 100%;
  margin-right: auto;
  margin-bottom: 32px;
`;

const SelectButtons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #88888a;
`;

const MainSection = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-start;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  width: 812px;
  height: auto;
`;

const CartSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #fafafc;
  gap: 12px;
  border-radius: 6px;
  width: 360px;
  max-height: 400px;
  height: fit-content;
  a {
    width: 100%;
  }
`;

const SummaryText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  font-weight: 600;

  &:last-of-type {
    border-top: 2px solid #e5e7eb;
    padding-top: 8px;
  }

  &:nth-of-type(2) {
    color: #4e4eff;
  }
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: 800;
`;

const ToTalPrice = styled.span`
  font-size: 24px;
  font-weight: 800;
`;

const Button = styled.button`
  font-size: 15px;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const OrderButton = styled(Button)`
  background-color: #4e4eff;
  color: white;
`;

const ShoppingButton = styled(Button)`
  border: 1px solid #4e4eff;
  color: #4e4eff;
`;

export const CheckBoxStyled = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

// Blueprint Category Interface
interface BlueprintCategoryProp {
  categoryName: string;
}

// Blueprint Interface
interface BlueprintProps {
  id: number;
  blueprintName: string;
  blueprintPrice: number;
  blueprintAuthor: string;
  blueprintImg: string;
  blueprintCategories: BlueprintCategoryProp[];
}

// Response Interface
interface CartItemsProps {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    totalPrice: number;
    totalDiscount: number;
    blueprintsInCart: BlueprintProps[];
  };
}

const ShoppingCart = () => {
  const { data, isLoading, error } = useQuery<CartItemsProps>({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const [checkedItems, setCheckedItems] = useState<BlueprintProps[]>([]);

  // 전체 선택 상태 계산 (모든 아이템이 체크되었는지 확인)
  const allChecked =
    data && data.result.blueprintsInCart
      ? data.result.blueprintsInCart.length === checkedItems.length &&
        checkedItems.length > 0
      : false;

  const formatPrice = (price: number) => {
    return price?.toLocaleString();
  };

  // 전체 선택/해제 토글
  const toggleAllCheck = () => {
    if (allChecked) {
      setCheckedItems([]); // 모두 해제
    } else {
      setCheckedItems([...data!.result.blueprintsInCart]); // 모두 선택
    }
  };

  // 개별 아이템 선택/해제
  const handleCheck = (item: BlueprintProps) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(checkedItems.filter((i) => i.id !== item.id));
      console.log("delete");
    } else {
      console.log("add");

      setCheckedItems([...checkedItems, item]);
    }
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleBuyClick = async (blueprintIds: number[]) => {
    if (blueprintIds.length > 0) {
      try {
        const addPayItem = await addPayItems(blueprintIds);
        if (addPayItem.isSuccess === true) {
          queryClient.invalidateQueries({ queryKey: ["payItems"] });
          navigate("/payment");
        } else {
          throw new Error("결제 처리에 실패했습니다.");
        }
      } catch (error) {
        alert("메시지" + error);
      }
    } else {
      alert("구매할 제품을 선택해주세요!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>오류가 발생했습니다.</div>;
  }

  if (data) {
    return (
      <Container>
        {!data.result.blueprintsInCart ? (
          <Wrapper>
            <Circle>
              <BsCart4 />
            </Circle>
            <Empty>장바구니가 비어있어요.</Empty>
            <Go>지금 담으러 가볼까요?</Go>
            <FamLink to={"/items/category/all"}>
              인기 작품 구경 가기 &rarr;
            </FamLink>
          </Wrapper>
        ) : (
          <Wrapper>
            <Title>장바구니</Title>
            <SelectButtons>
              <CheckBoxStyled
                type="checkbox"
                onChange={toggleAllCheck}
                checked={allChecked}
              />
              <Label>전체선택</Label>
            </SelectButtons>
            <MainSection>
              <CartItems>
                {data.result.blueprintsInCart.map((item, index) => (
                  <Item
                    key={index}
                    item={item}
                    checked={checkedItems.includes(item)} // 선택 상태 전달
                    onCheck={() => handleCheck(item)} // 클릭 이벤트 핸들러 전달
                  />
                ))}
              </CartItems>
              <CartSummary>
                <SummaryText>
                  <span>총 상품 금액</span>
                  <Price>{formatPrice(data.result.totalPrice)}원</Price>
                </SummaryText>
                <SummaryText>
                  <span>총 할인 금액</span>
                  <Price>-{formatPrice(data.result.totalDiscount)}원</Price>
                </SummaryText>
                <SummaryText>
                  <span>결제 금액</span>
                  <ToTalPrice>
                    {formatPrice(data.result.totalPrice)}원
                  </ToTalPrice>
                </SummaryText>
                <OrderButton
                  onClick={() => handleBuyClick(checkedItems.map((i) => i.id))}
                >
                  주문하기
                </OrderButton>
                <Link to="/items/category/all">
                  <ShoppingButton>계속 쇼핑하기</ShoppingButton>
                </Link>
              </CartSummary>
            </MainSection>
          </Wrapper>
        )}
      </Container>
    );
  }
  return null;
};

export default ShoppingCart;
