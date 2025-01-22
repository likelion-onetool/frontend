import styled from "styled-components";
import TopNavBar from "../../components/TopNavBar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { blueprint, IBluePrintDetail } from "../../dummy/blueprint";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { addCartItems, addPayItems, getDetailItem } from "../../utils/api";
import { useEffect, useRef, useState } from "react";
import RuleTable from "../../components/RuleTable";
import axios, { AxiosError } from "axios";

const OuterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 16px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 0px 8px 0px;
`;

const FirstContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 0;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 768px) {
    gap: 2rem;
    padding: 16px 0;
  }
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 6px;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 0;
  border-bottom: 1px solid #88888a50;
`;

const CompanyName = styled.div`
  gap: 4px;
  font-weight: 400;
  font-size: 13.13px;
  line-height: 20px;
  color: #88888a;
`;

const ItemName = styled.div`
  padding: 7px 0;
  font-weight: 700;
  font-size: 20.8px;
  line-height: 30.8px;
  color: #18181b;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const PriceContainer = styled.div`
  height: 60px;
  padding: 10px 0 30px;
  gap: 10px;
  border-bottom: 1px solid #88888a50;
`;

const CurrentPrice = styled.div`
  font-weight: 700;
  font-size: 26.91px;
  line-height: 33px;
  color: #ff5c00;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const TextBox = styled.span`
  font-weight: 800;
  font-size: 15.13px;
  line-height: 25.6px;
  color: #313135;
`;

const InnerTextBox = styled.div`
  font-weight: 500;
  font-size: 13.23px;
  line-height: 22px;
  color: #00000087;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: -10px 0 16px;
`;

const Tag = styled.div`
  padding: 5px 7px;
  border: 1px solid #88888a;
  border-radius: 11px;
  font-size: 11.44px;
  color: #4c4c50;
`;

const CompatibleProgramsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CompatibleProgram = styled.div`
  padding: 8px 12px;
  border: 1px solid #d3d3d3;
  border-radius: 8px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  font-size: 12px;
  font-weight: 500;
  color: #2d2d2d;
  text-align: center;
`;

const FileExtension = styled.div`
  font-weight: 400;
  font-size: 13.45px;
  color: #6d6d70;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  gap: 1rem;
`;

interface BuyButtonProps {
  bgColor?: string;
  color?: string;
}

const BuyButton = styled.button<BuyButtonProps>`
  height: 48px;
  width: 100%;
  max-width: 300px;
  background-color: ${({ bgColor }) => bgColor || "#3912e7"};
  color: ${({ color }) => color || "white"};
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  border: 1px solid rgba(136, 136, 138, 1);

  &:hover {
    background-color: ${({ bgColor }) => (bgColor ? bgColor : "#0e3aeb")};
  }
`;

const QRContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  border: 1px solid #d3d3d3;
  padding: 16px;
  background-color: #f9f9f9;
`;

const QRTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 8px;
  color: #313135;
`;

const QRImg = styled.img`
  width: 100px;
  height: 100px;
`;

const SecondContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleBar = styled.div`
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: white;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleButton = styled.button`
  height: 100%;
  padding: 20px 40px;
  cursor: pointer;
  font-weight: 800;
  font-size: 15.13px;
  line-height: 24px;
  color: #313135;
`;

const BlueBox = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 16px 24px;
  margin-bottom: 24px;
  background-color: #ecf9fd;
  font-weight: 600;
  font-size: 13.13px;
  color: #07afe4;
`;

const MainImg = styled.img`
  width: 700px;
  height: 480px;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const DetailImg = styled.img`
  width: 800px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

interface DetailItemResultProps {
  id: number;
  blueprintName: string;
  categoryId: number;
  standardPrice: number;
  blueprintImg: string;
  detailImage: string;
  blueprintDetails: string;
  extension: string;
  program: string;
  hits: boolean;
  salePrice: number;
  saleExpiredDate: boolean;
  creatorName: string;
  downloadLink: string;
}

interface DetailItemProps {
  result: DetailItemResultProps;
}

const DetailedItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<DetailItemProps>({
    queryKey: ["detail", id],
    queryFn: () => getDetailItem(Number(id)),
  });

  const [activeTab, setActiveTab] = useState<"detail" | "rule">("detail");
  const detailRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (section: "detail" | "rule") => {
    setActiveTab(section);
    if (section === "detail" && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (section === "rule" && ruleRef.current) {
      ruleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === detailRef.current) {
            setActiveTab("detail");
          } else if (entry.target === ruleRef.current) {
            setActiveTab("rule");
          }
        }
      });
    }, observerOptions);

    if (detailRef.current) observer.observe(detailRef.current);
    if (ruleRef.current) observer.observe(ruleRef.current);

    return () => {
      observer.disconnect();
    };
  }, [detailRef, ruleRef]);

  const handleBuyClick = async (blueprintId: number) => {
    try {
      const addPayItem = await addPayItems([blueprintId]);
      if (addPayItem && addPayItem.isSuccess === true) {
        queryClient.invalidateQueries({ queryKey: ["payItems"] });
        navigate("/payment");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        alert("로그인을 해주세요!");
        navigate("/users/login");
      } else {
        console.error("Unexpected error occurred:", error);
      }
    }
  };

  const handleCartClick = async (blueprintId: number) => {
    try {
      const data = await addCartItems(blueprintId);

      if (data && data.isSuccess === true) {
        queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        navigate("/cart");
      } else if (data && data.message === "장바구니에 존재하는 상품입니다.") {
        alert("이미 장바구니에 존재합니다!");
      }
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 400) {
        alert("로그인을 해주세요!");
        navigate("/users/login");
      } else {
        console.error("Unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      {!data ? null : (
        <>
          <TopNavBar />
          <OuterContainer>
            <MainContainer>
              <FirstContainer>
                <MainImg src={`${data.result.blueprintImg}`} alt="Big Item" />
                <RightContainer>
                  <CompanyName>ONETOOL</CompanyName>
                  <ItemName>{data.result.blueprintName}</ItemName>
                  <PriceContainer>
                    <CurrentPrice>
                      {formatPrice(data.result.standardPrice)}원
                    </CurrentPrice>
                  </PriceContainer>
                  <InfoContainer>
                    <TextBox>상품정보</TextBox>
                    <InnerTextBox>파일 확장자</InnerTextBox>
                    <FileExtension>{data.result.extension}</FileExtension>
                    <InnerTextBox>사용 가능 프로그램</InnerTextBox>
                    <CompatibleProgramsContainer>
                      <CompatibleProgram>
                        {data.result.program}
                      </CompatibleProgram>
                    </CompatibleProgramsContainer>
                  </InfoContainer>
                  <ButtonsContainer>
                    <BuyButton onClick={() => handleBuyClick(Number(id))}>
                      구매하기
                    </BuyButton>
                    <BuyButton
                      onClick={() => handleCartClick(Number(id))}
                      bgColor="tranparent"
                      color="black"
                    >
                      장바구니
                    </BuyButton>
                  </ButtonsContainer>
                </RightContainer>
              </FirstContainer>
              <SecondContainer>
                <ToggleBar>
                  <ToggleButton
                    onClick={() => scrollToSection("detail")}
                    style={{
                      backgroundColor:
                        activeTab === "detail" ? "#ddd" : "transparent",
                      fontWeight: activeTab === "detail" ? "bold" : "normal",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    상세설명
                  </ToggleButton>
                  <ToggleButton
                    onClick={() => scrollToSection("rule")}
                    style={{
                      backgroundColor:
                        activeTab === "rule" ? "#ddd" : "transparent",
                      fontWeight: activeTab === "rule" ? "bold" : "normal",
                    }}
                  >
                    환불/교환/배송 규정
                  </ToggleButton>
                </ToggleBar>
                <ContentContainer ref={detailRef}>
                  <BlueBox>{data.result.blueprintDetails}</BlueBox>

                  <DetailImg src={`${data.result.detailImage}`} alt="" />
                </ContentContainer>
                <ContentContainer ref={ruleRef}>
                  <RuleTable />
                </ContentContainer>
              </SecondContainer>
            </MainContainer>
          </OuterContainer>
          <Footer />
        </>
      )}
    </>
  );
};
export default DetailedItem;
