import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BlueprintProps } from "../utils/api";
import { formatPrice } from "../utils/formatPrice";

const ItemCardContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 그림자가 카드 안으로 들어가지 않게 설정 */
  border-radius: 6.65px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 기본 그림자 */
  transition: box-shadow 0.3s ease; /* 그림자 전환 */

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 */
  }
`;

const ItemImage = styled(motion.img)`
  width: 100%;
  height: 200px;
  border-radius: 6.65px;
  border: 1px solid #eeeeee;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease; /* 이미지 변환 전환 */

  &:hover {
    transform: scale(1.05); /* 이미지 확대 */
  }
`;

const BelowContainer = styled.div`
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #fff; /* 카드 배경색 */
`;

const BrandName = styled.h4`
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #a0a0a0;
  margin: 0;
`;

const ItemName = styled.h3`
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #1a1a1a;
  margin: 0;
  text-transform: capitalize;
`;

const PriceName = styled.h3`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  color: rgba(225, 41, 57, 1);
  margin: 0;
`;

const TagBox = styled.div`
  display: flex;
`;

const Tag = styled.div`
  background-color: rgba(233, 231, 255, 1);
  color: rgba(162, 162, 164, 1);
  font-size: 12px;
  font-weight: 700;
  line-height: 19.6px;
  border-radius: 5px;
  padding: 2px;
`;

const PlaceholderContainer = styled.div`
  width: 100%;
  height: 200px; /* 대체 이미지 높이와 일치 */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
  font-size: 16px;
  text-align: center;
  background: #f0f0f0; /* 대체 이미지 배경색 */
  border-radius: 6.65px;
`;

interface ItemCardProps {
  key: number;
  blueprint: BlueprintProps;
}

export default function ItemCard({ blueprint }: ItemCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <ItemCardContainer
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/items/detail/${blueprint.id}`}>
        <ItemImage
          src={
            imgError
              ? "https://via.placeholder.com/300x200?text=Image+Not+Available"
              : blueprint.blueprintImg
          }
          onError={() => setImgError(true)}
        />

        <BelowContainer>
          <BrandName>{blueprint.creatorName}</BrandName>
          <ItemName>{blueprint.blueprintName}</ItemName>
          <PriceName>{formatPrice(blueprint.standardPrice)} 원</PriceName>
          <TagBox>
            <Tag>{blueprint.program}</Tag>
          </TagBox>
        </BelowContainer>
      </Link>
    </ItemCardContainer>
  );
}
