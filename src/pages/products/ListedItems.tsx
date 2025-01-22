import styled from "styled-components";
import { useState } from "react";
import ItemCard from "../../components/ItemCard";
import LeftSidebar from "../../components/LeftSidebar";
import TopNavBar from "../../components/TopNavBar";
import Footer from "../../components/Footer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  getAllItems,
  getCategoryItems,
  getItems,
  ItemProps,
} from "../../utils/api";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
`;

const RightContainer = styled.div`
  width: 100%;
  padding: 0 40px;
`;

const TextContainer = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  color: #333333;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const FilterContainer = styled.div`
  margin-left: 30px;
  display: flex;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  width: 97px;
  height: 36px;
  border: 1px solid #ccc;
  border-radius: 4px;
  gap: 8px;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5ce65c;
  }
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-top: 30px;
  margin-left: 30px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0;
  gap: 8px;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? "#f0f0f0" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${(props) => (props.disabled ? "#f0f0f0" : "#00AC17")};
    color: ${(props) => (props.disabled ? "#333" : "#fff")};
  }
`;

const AllItemsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: category } = useParams();
  const search = new URLSearchParams(location.search).get("s");
  const pageParam = new URLSearchParams(location.search).get("page") || "1";
  const [page, setPage] = useState(parseInt(pageParam, 10));

  const { data, isLoading, error } = useQuery<ItemProps>({
    queryKey: search
      ? ["items", "search", search, page]
      : category === "all"
      ? ["items", "all", page]
      : ["items", category, page],
    queryFn: () => {
      if (search) return getItems({ search, page });
      if (category === "all") return getAllItems(page, 8);
      return getCategoryItems({ category, page });
    },
  });
  // refactoring 필요함. all api를 버리고 전부 sort api로 받아오는걸로 통일
  // category id?, 정렬 방식, 오름/내림,

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    navigate({
      search: `?${search ? `s=${search}&` : ""}page=${newPage}`,
    });
  };

  if (isLoading) return <div>Loading...</div>;

  const pageTitle = search
    ? `검색 결과: ${search}`
    : category !== "all"
    ? `${category} 카테고리`
    : "전체 상품 목록";

  return (
    <>
      {!data ? (
        <div>Loading...</div>
      ) : (
        <>
          <TopNavBar />
          <MainContainer>
            <ContentContainer>
              <LeftSidebar />
              <RightContainer>
                <TextContainer>{pageTitle}</TextContainer>
                <FilterContainer>
                  <FilterButton>가격순 ▾</FilterButton>
                  <FilterButton>판매순 ▾</FilterButton>
                </FilterContainer>
                <ItemsGrid>
                  {data.result.content.map((item) => (
                    <ItemCard key={item.id} blueprint={item} />
                  ))}
                </ItemsGrid>
                <PaginationContainer>
                  <PaginationButton
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    이전
                  </PaginationButton>
                  {[...Array(data.result.totalPages)].map((_, index) => (
                    <PaginationButton
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      disabled={index === page - 1}
                    >
                      {index + 1}
                    </PaginationButton>
                  ))}
                  <PaginationButton
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= (data?.result.totalPages || 1)}
                  >
                    다음
                  </PaginationButton>
                </PaginationContainer>
              </RightContainer>
            </ContentContainer>
            <Footer />
          </MainContainer>
        </>
      )}
    </>
  );
};

export default AllItemsPage;
