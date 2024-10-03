import styled from "styled-components";
import Footer from "./Footer";
import TopNavBar from "./TopNavBar";
import { Outlet } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  padding: 50px 400px 100px 400px;

  @media (min-width: 1920px) and (min-height: 1080px) {
    padding: 50px 570px 100px 570px; /* 1920x1080 해상도일 때 패딩 값 변경 */
  }
`;

const CenterLayout = () => {
  return (
    <Container>
      <TopNavBar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </Container>
  );
};

export default CenterLayout;
