import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  text-align: center;
`;

const SearchContainer = styled.div`
  position: relative; /* 부모에 상대적인 위치 */
  width: 141px; /* 입력 필드와 일치하는 너비 */
  margin-left: auto;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%; /* 부모의 너비를 100% 차지 */
  height: 26px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  padding: 5px 30px 5px 10px; /* 아이콘이 들어갈 공간 확보 */
  margin: 0;
`;

const SearchButton = styled.button`
  position: absolute;
  right: 7px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 38px;
  p {
    font-weight: 400;
    line-height: 25.2px;
    font-size: 18px;
    color: #121212;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid lightgray;
    padding: 10px;
    border-left: 0;
    border-right: 0;
    font-weight: 400;
    font-size: 14px;
  }

  th {
    font-weight: 700;
    color: #6b6b6b;
  }

  th:first-child, td:first-child, /* 첫 번째 자식 */
  th:nth-child(2), td:nth-child(2),
  th:last-child, td:last-child {
    /* 두 번째 자식 */
    text-align: center; /* 가운데 정렬 */
  }
`;

const Notice = styled.div`
  text-align: center;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const PaginationButton = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  margin: 0 5px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    color: #ffffff;
    background-color: #2645ac;
  }
`;

const WriteButton = styled(Link)`
  align-self: flex-end;
  width: 80px;
  height: 30px;
  margin-top: 15px;
  border: 1px solid lightgrey;
  background-color: #2645ac;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 14px;
  transition: background-color 0.3s ease;
`;

// 테이블 내의 Link를 블록 요소로 만들어 줌
const TableRowLink = styled(Link)`
  display: block;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const FAQ = () => {
  const faqItems = [
    {
      id: 1,
      category: "이용방법",
      title:
        "원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.",
      date: "2024.07.24",
      isNotice: true,
    },
    {
      id: 2,
      category: "이용방법",
      title:
        "원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.",
      date: "2024.07.24",
      isNotice: true,
    },
    {
      id: 3,
      category: "교환관련",
      title:
        "원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.",
      date: "2024.07.24",
    },
    {
      id: 4,
      category: "반품관련",
      title:
        "원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.",
      date: "2024.07.24",
    },
    {
      id: 5,
      category: "이용방법",
      title:
        "원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.",
      date: "2024.07.24",
    },
    {
      id: 6,
      category: "이용방법",
      title:
        "원툴 이용방법 관련 공지사항입니다. 상품 결제 전 꼭 확인해 주세요.",
      date: "2024.07.24",
    },
  ];

  return (
    <Wrapper>
      <Title>문의사항</Title>
      <SearchContainer>
        <SearchInput type="text" />
        <SearchButton>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.4765 10.8908C8.49566 11.5892 7.2958 12 6 12C2.68629 12 0 9.3137 0 6C0 2.68629 2.68629 0 6 0C9.3137 0 12 2.68629 12 6C12 7.29586 11.5892 8.49577 10.8907 9.4766L13.5 12.0858C13.8905 12.4763 13.8905 13.1095 13.5 13.5C13.1095 13.8905 12.4763 13.8905 12.0858 13.5L9.4765 10.8908ZM10 6C10 8.20914 8.20914 10 6 10C3.79086 10 2 8.20914 2 6C2 3.79086 3.79086 2 6 2C8.20914 2 10 3.79086 10 6Z"
              fill="#313135"
            />
          </svg>
        </SearchButton>
      </SearchContainer>

      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성시간</th>
          </tr>
        </thead>
        <tbody>
          {faqItems.map((item, index) => (
            <TableRow
              key={item.id}
              style={item.isNotice ? { backgroundColor: "#F4F4F4" } : {}}
            >
              <td
                style={
                  item.isNotice
                    ? { color: "#2645AC", fontWeight: 700 }
                    : { color: "#6B6B6B", fontWeight: 400 }
                }
              >
                {item.isNotice ? "공지" : index + 1}
              </td>
              <td>{item.category}</td>

              <td>
                <TableRowLink to={`/faq/${item.id}`}>
                  {item.isNotice ? <Notice>{item.title}</Notice> : item.title}
                </TableRowLink>
              </td>

              <td style={{ fontWeight: 400, color: "#6B6B6B" }}>{item.date}</td>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <WriteButton to="/faq/write">글쓰기</WriteButton>

      <PaginationWrapper>
        <svg
          width="6"
          height="12"
          viewBox="0 0 6 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.37228 11.25C4.14533 11.2508 3.93023 11.1487 3.78728 10.9725L0.164752 6.47251C-0.06273 6.19576 -0.06273 5.79676 0.164752 5.52001L3.91478 1.01998C4.17983 0.701039 4.65331 0.657382 4.97228 0.922477C5.29118 1.18758 5.33483 1.66104 5.06978 1.97998L1.71728 6.00001L4.95728 10.02C5.14456 10.2448 5.18401 10.5579 5.05831 10.8221C4.93268 11.0864 4.66478 11.2534 4.37228 11.25Z"
            fill="#121212"
          />
        </svg>

        {[1, 2, 3, 4, 5, "...", 40].map((page, index) => (
          <PaginationButton key={index}>{page}</PaginationButton>
        ))}

        <svg
          width="7"
          height="12"
          viewBox="0 0 7 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.49937 11.2494C1.32413 11.2498 1.1543 11.1888 1.01937 11.0769C0.865989 10.9498 0.769509 10.7668 0.751217 10.5684C0.732924 10.3701 0.794327 10.1725 0.921872 10.0194L4.28186 5.99944L1.04187 1.97197C0.916044 1.81703 0.857169 1.61831 0.878282 1.41983C0.899402 1.22135 0.998762 1.03948 1.15437 0.914468C1.31125 0.776446 1.51856 0.710116 1.72646 0.731468C1.93429 0.752828 2.12381 0.859928 2.24936 1.02697L5.87186 5.52694C6.09934 5.80369 6.09934 6.20269 5.87186 6.47944L2.12186 10.9794C1.96924 11.1636 1.73801 11.2638 1.49937 11.2494Z"
            fill="#121212"
          />
        </svg>
      </PaginationWrapper>
    </Wrapper>
  );
};

export default FAQ;
