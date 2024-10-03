import styled from "styled-components";
import TopNavBar from "../../components/TopNavBar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { blueprint, IBluePrintDetail } from "../../dummy/blueprint";
import { formatPrice } from "../../utils/formatPrice";
import { Link } from "react-router-dom";

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
  height: 277px;
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

const TextBox = styled.div`
  font-weight: 700;
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
  margin: -10px 0 16px;
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

const BuyButton = styled(Link)`
  height: 48px;
  width: 100%;
  max-width: 300px;
  background-color: #3912e7;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #0e3aeb;
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
  width: 80%;
  padding: 1rem;
  margin: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleBar = styled.div`
  width: 100%;
  height: 47px;
  margin-bottom: 16px;
  border-bottom: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
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
  height: 700px;
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

const DetailedItem = () => {
  const params = useParams();
  const data: IBluePrintDetail = blueprint[Number(params.id) - 1];

  return (
    <>
      <TopNavBar />
      <OuterContainer>
        <MainContainer>
          <FirstContainer>
            <MainImg src={`${data.blueprintImg}`} alt="Big Item" />
            <RightContainer>
              <CompanyName>ONETOOL</CompanyName>
              <ItemName>{data.blueprintName}</ItemName>
              <PriceContainer>
                <CurrentPrice>{formatPrice(data.standardPrice)}원</CurrentPrice>
              </PriceContainer>
              <InfoContainer>
                <TextBox>상품정보</TextBox>
                <InnerTextBox>확장자</InnerTextBox>
                <FileExtension>{data.extension}</FileExtension>
                <InnerTextBox>프로그램</InnerTextBox>
                <CompatibleProgramsContainer>
                  <CompatibleProgram>{data.program}</CompatibleProgram>
                </CompatibleProgramsContainer>
                <InnerTextBox>카테고리</InnerTextBox>
                <Tags>
                  <Tag>{data.categoryId}</Tag>
                </Tags>
              </InfoContainer>
              <ButtonsContainer>
                <BuyButton
                  to={
                    "https://docs.google.com/forms/d/e/1FAIpQLSdRLzlCtOT-Gce34D3BDqxG6JzKj0bQXSQizRFMpuTJ9x82EQ/viewform"
                  }
                >
                  구매문의 하기
                </BuyButton>
                <QRContainer>
                  <QRTitle>설문조사 하기!</QRTitle>
                  <QRImg src="/qr.png" alt="설문조사 QR" />
                </QRContainer>
              </ButtonsContainer>
            </RightContainer>
          </FirstContainer>
          <SecondContainer>
            <ToggleBar>
              <ToggleButton>상세설명</ToggleButton>
            </ToggleBar>
            <BlueBox>{data.blueprintDetails}</BlueBox>
            <DetailImg src={`${data.blueprintDetailImg}`} alt="" />
          </SecondContainer>
        </MainContainer>
      </OuterContainer>
      <Footer />
    </>
  );
};
export default DetailedItem;
