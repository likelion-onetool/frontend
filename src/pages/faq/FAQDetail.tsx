import styled from "styled-components";
import { Wrapper as FAQWrapper } from "./FAQ"; // FAQ에서 export한 Title과 Wrapper를 import합니다.
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 7px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
`;

const Category = styled.span`
  color: #a2a2a4;
  font-weight: 700;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  font-weight: 400;
  color: #a2a2a4;
  font-size: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 38px;
  margin-bottom: 15px;

  th,
  td {
    border: 1px solid lightgray;
    padding: 10px 0px 10px 0;
    border-left: 0;
    border-right: 0;
    font-weight: 400;
    font-size: 14px;
  }

  td:last-child {
    color: #6b6b6b;
  }

  th {
    font-weight: 700;
    color: #6b6b6b;
  }
`;

const ListButton = styled(Link)`
  margin-top: 38px;
  align-self: center;
  width: 125px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 400;
`;

const FAQDetail = () => {
  return (
    <Container>
      <Header>
        <Category>문의사항</Category>
        <Title>
          원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.
        </Title>
        <Info>
          <span>작성자 정재민</span>
          &nbsp; &nbsp;
          <span>2024.07.24</span>
        </Info>
      </Header>
      <FAQWrapper>
        <p>
          원툴 이용방법 관련 공지사항입니다. <br />
          여행은 새로운 경험과 추억을 선사하지만, 올바른 준비가 필수입니다. 이번
          블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히
          소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는
          다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중
          긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조
          배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는
          고성능 카메라로, 여행의 순간들을 아름답게 기록할 수 있습니다. 여섯
          번째 아이템은 여행지의 날씨에 상관없이 편안한 여행을 돕는 다목적 신발.
          일곱 번째는 여행 중 건강을 유지하기 위한 물병과 여행용 필터. 여덟
          번째는 지역 정보와 지도가 포함된 스마트폰 앱, 나침반, 또는 종이 지도.
          아홉 번째는 여행지의 문화와 언어를 빠르게 파악할 수 있는 가이드북 또는
          앱. 마지막으로, 여행의 편안함과 안전을 위한 개인 보안 아이템, 예를
          들어, 도난 방지 가방이나 머니 벨트입니다. 이러한 아이템들은 여행자가
          만날 수 있는 다양한 상황에 대비할 수 있게 하며, 여행을 더욱 풍부하고
          안전하게 만들어 줍니다. 여행을 떠나기 전 이 목록을 체크하고, 최고의
          여행 경험을 준비하세요!
        </p>
      </FAQWrapper>
      <Table>
        <tbody>
          <td>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.2699 5.29067C11.2703 5.4659 11.2093 5.63573 11.0974 5.77067C10.9703 5.92405 10.7873 6.02053 10.5889 6.03882C10.3906 6.05711 10.193 5.99571 10.0399 5.86817L6.01995 2.50817L1.99248 5.74817C1.83753 5.87399 1.63882 5.93287 1.44034 5.91176C1.24186 5.89064 1.05999 5.79128 0.934976 5.63567C0.796954 5.47879 0.730624 5.27147 0.751976 5.06357C0.773336 4.85575 0.880436 4.66622 1.04748 4.54067L5.54745 0.918175C5.8242 0.6907 6.2232 0.6907 6.49995 0.918175L10.9999 4.66818C11.1841 4.8208 11.2843 5.05202 11.2699 5.29067Z"
                fill="#121212"
              />
            </svg>
          </td>
          <td>이전글</td>
          <td>
            원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.
          </td>
        </tbody>
        <tbody>
          <td>
            <svg
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.749584 1.49937C0.749209 1.32413 0.810261 1.1543 0.922086 1.01937C1.04921 0.865989 1.23221 0.769509 1.43059 0.751216C1.62896 0.732924 1.82651 0.794326 1.97959 0.921871L5.99958 4.28186L10.0271 1.04187C10.182 0.916044 10.3807 0.857169 10.5792 0.878282C10.7777 0.899402 10.9595 0.998762 11.0846 1.15437C11.2226 1.31125 11.2889 1.51856 11.2676 1.72646C11.2462 1.93429 11.1391 2.12381 10.9721 2.24936L6.47209 5.87186C6.19534 6.09934 5.79633 6.09934 5.51958 5.87186L1.01958 2.12186C0.83546 1.96924 0.735185 1.73801 0.749584 1.49937Z"
                fill="#121212"
              />
            </svg>
          </td>
          <td>다음글</td>
          <td>
            원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.
          </td>
        </tbody>
      </Table>
      <ListButton to={"/faq"}>목록으로 돌아가기</ListButton>
    </Container>
  );
};

export default FAQDetail;
