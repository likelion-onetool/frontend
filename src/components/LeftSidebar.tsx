import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

interface CategoryProps {
  active: boolean;
}

const SidebarContainer = styled.div`
  min-width: 200px;
  padding: 40px 40px;
  margin-left: -10px;
  border-right: 1px solid #e8e8e8;
`;

const HorizontalBorder = styled.div`
  padding: 0px 0px 2px 0px;
`;

const CategoryHeader = styled.h2`
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 15.25px;
  line-height: 16px;
  padding-bottom: 24px;
`;

const CategoryContainer = styled.div`
  padding: 0px 0px 30px 0px;
`;

const MainCategoryContainer = styled.div``;

const SubCategoryContainer = styled.div`
  padding: 0px;
`;

const Category = styled(Link)`
  border-radius: 4px;
  padding: 8px 0px;
  font-weight: 600;
  font-size: 13.23px;
  line-height: 21px;
  letter-spacing: 0.15px;
  display: block;
  width: 100%;

  cursor: pointer;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const SubCategory = styled.div`
  border-radius: 4px;
  padding: 7px 10px;

  font-weight: 400;
  font-size: 13.02px;
  line-height: 21px;
  letter-spacing: 0.15px;
  color: #313135;

  cursor: pointer;

  &:hover {
    background-color: #d3d3d3;
  }
`;

const LeftSidebar = () => {
  const navigate = useNavigate();
  const [categoryToggle, setCategoryToggle] = useState<boolean>(true);

  const handleSubCategoryClick = () => {};

  return (
    <SidebarContainer>
      <HorizontalBorder>
        <CategoryHeader>
          <span>카테고리</span>
          <button onClick={() => setCategoryToggle((prev) => !prev)}>
            {categoryToggle ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </CategoryHeader>
        <CategoryContainer>
          <MainCategoryContainer>
            <Category to={"/items/category/all?page=1"}>전체</Category>
          </MainCategoryContainer>

          <MainCategoryContainer>
            <Category to={"/items/category/building"}>건축도면</Category>
            <SubCategoryContainer>
              <SubCategory onClick={handleSubCategoryClick}>- 주거</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>- 상업</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>- 공공</SubCategory>
            </SubCategoryContainer>
          </MainCategoryContainer>

          <MainCategoryContainer>
            <Category to={"/items/category/civil"}>토목도면</Category>
            <SubCategoryContainer>
              <SubCategory onClick={handleSubCategoryClick}>- 도로</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>- 교통</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>- 터널</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>
                - 댐/수자원
              </SubCategory>
            </SubCategoryContainer>
          </MainCategoryContainer>

          <MainCategoryContainer>
            <Category to={"/items/category/interior"}>인테리어 도면</Category>
            <SubCategoryContainer>
              <SubCategory onClick={handleSubCategoryClick}>- 주거</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>- 상업</SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>
                - 가구/집기
              </SubCategory>
            </SubCategoryContainer>
          </MainCategoryContainer>

          <MainCategoryContainer>
            <Category to={"/items/category/machine"}>기계 도면</Category>
            <SubCategoryContainer>
              <SubCategory onClick={handleSubCategoryClick}>
                - 기계부품
              </SubCategory>
              <SubCategory onClick={handleSubCategoryClick}>- 설비</SubCategory>
            </SubCategoryContainer>
          </MainCategoryContainer>

          <MainCategoryContainer>
            <Category to={"/items/category/electric"}>전기 도면</Category>
            <SubCategoryContainer>
              <SubCategory onClick={handleSubCategoryClick}>- 전기</SubCategory>
            </SubCategoryContainer>
          </MainCategoryContainer>

          <MainCategoryContainer>
            <Category to={"/items/category/etc"}>기타 도면</Category>
          </MainCategoryContainer>
        </CategoryContainer>
      </HorizontalBorder>
    </SidebarContainer>
  );
};

export default LeftSidebar;
