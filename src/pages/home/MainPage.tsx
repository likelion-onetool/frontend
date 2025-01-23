import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import TopNavBar from "../../components/TopNavBar";
import LeftSidebar from "../../components/LeftSidebar";
import MainBanner from "../../components/MainBanner";
import Footer from "../../components/Footer";
import { blueprint } from "../../dummy/blueprint";
import { formatPrice } from "../../utils/formatPrice";
import { useQuery } from "@tanstack/react-query";
import { getAllItems, ItemProps } from "../../utils/api";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DetailContainer = styled.div`
  width: 100%;
  padding: 24px 20px;

  @media (min-width: 768px) {
    padding: 40px 40px 100px 40px;
  }
`;

const BannersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 56px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 24px;
  }
`;

const Banner2 = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #203a92;
  img {
    width: 150px;
  }
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  padding-bottom: 24px;

  @media (min-width: 768px) {
    height: 274px;
    font-size: 20px;
    img {
      width: 200px;
    }
  }
`;

const BluePrintList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 38px;
  gap: 38px;
`;

const BluePrintCard = styled.div`
  border: 1px solid #e7e7e8;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-height: 436px;

  img {
    width: 100%;
    height: 289px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px 8px 0px 0px;
    transition: transform 0.3s ease;
  }
`;

const BluePrintCardDetail = styled.div`
  width: 100%;
  padding: 20px 25px 35px 25px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const BluePrintName = styled.h3`
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const BluePrintCreator = styled.span`
  font-size: 12px;
  color: #88888a;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const BluePrintPrice = styled.span`
  font-size: 14px;
  font-weight: 700;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const SalePrice = styled.span`
  color: red;
  font-weight: 700;
  margin-right: 6px;

  @media (min-width: 768px) {
    margin-right: 8px;
  }
`;

const OriginalPrice = styled.span`
  font-size: 10px;
  color: #a2a2a4;
  font-weight: 400;
  margin-top: 4px;
  text-decoration: line-through;

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const GridTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const onClick = (id: number) => {
    navigate(`/items/${id}`);
  };
  const { data, isLoading, error } = useQuery<ItemProps>({
    queryKey: ["items", "all", "main"],
    queryFn: () => getAllItems(0, 6),
  });

  if (isLoading) {
    <div>Loading...</div>;
  }

  return data && data.isSuccess === true && data.result.content.length > 0 ? (
    <>
      <TopNavBar />
      <MainContainer>
        <ContentContainer>
          <LeftSidebar />
          <DetailContainer>
            <BannersContainer>
              <MainBanner />
              <Link
                to={
                  "https://garrulous-bearskin-817.notion.site/ONETOOL-e7a9e586415142ab9a2f49d3b4f0146d?pvs=4"
                }
              >
                <Banner2>
                  <img src="/banner2.png" />
                  <p>
                    처음 방문하셨나요? <br />
                    ONETOOL을 소개합니다.
                  </p>
                </Banner2>
              </Link>
            </BannersContainer>

            <GridTitle>인기 도면 한 눈에 확인하기 &gt;</GridTitle>
            <BluePrintList>
              {data.result.content.map((item) => (
                <BluePrintCard key={item.id} onClick={() => onClick(item.id)}>
                  <img src={item.blueprintImg} alt={item.blueprintName} />
                  <BluePrintCardDetail>
                    <BluePrintCreator>{item.creatorName}</BluePrintCreator>
                    <BluePrintName>{item.blueprintName}</BluePrintName>
                    <BluePrintPrice>
                      <SalePrice>{formatPrice(item.standardPrice)}원</SalePrice>
                      {/* <OriginalPrice>
                        {formatPrice(item.standardPrice)}원
                      </OriginalPrice> */}
                    </BluePrintPrice>
                  </BluePrintCardDetail>
                </BluePrintCard>
              ))}
            </BluePrintList>
          </DetailContainer>
        </ContentContainer>
      </MainContainer>
      <Footer />
    </>
  ) : null;
};

export default MainPage;
