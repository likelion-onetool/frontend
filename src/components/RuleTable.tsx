import React from "react";
import styled from "styled-components";

// 테이블 스타일
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  tr {
    display: flex;
    flex-direction: column;
  }
`;

const TableHeader = styled.th`
  background-color: #f4f4f4;
  font-weight: bold;
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 16px;
`;
const TableCellTitle = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 14px;
  line-height: 1.6;
  white-space: pre-line; // 줄바꿈 처리
`;

const Container = styled.div`
  padding: 20px;
  width: 80%;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
`;

const RuleTable = () => {
  const refundRows = [
    {
      item: "환불 정책",
      content: `디지털 상품 특성상 구매 후 다운로드 완료 시 환불 불가, 다운로드하지 않은 경우 7일 이내 환불 가능
        (파일의 손상, 오류 등의 문제가 발생한 경우, 검토 후 교체 및 수정된 파일을 제공해드립니다)`,
    },
    {
      item: "환불 불가 사유",
      content: `1. 구매 후 다운로드가 완료된 디지털 상품
2. 단순 변심 및 필요 변경에 따른 환불 요청
3. 개인 사정(PC 사양 미충족, 프로그램 미지원 등)에 따른 환불 요청
`,
    },
    {
      item: "환불 가능 사유",
      content: `1. 다운로드가 불가능하거나, 파일에 치명적인 오류가 있는 경우
2. 상품 설명과 명백히 다른 내용이 포함된 경우
3. 결제 후 7일 이내 다운로드하지 않은 경우
`,
    },
    {
      item: "환불 요청 방법",
      content: `환불이 필요한 경우, 아래 내용을 포함하여 고객센터로 이메일을 보내주세요.
- 주문번호
- 결제일자 및 결제 수단
- 환불 사유 및 증빙자료(스크린샷 등)
문의 이메일: onetoolfirst@gmail.com
고객센터 운영시간: 평일 10:00 ~ 18:00 (주말 및 공휴일 제외)
`,
    },
    {
      item: "환불 승인 이후",
      content: `환불이 승인될 경우, 결제 수단에 따라 처리 기간이 상이할 수 있습니다.
- 카드 결제: 취소 후 3~7 영업일 이내 환불
- 계좌이체: 취소 후 5~10 영업일 이내 환불
- 간편결제(카카오페이, 네이버페이 등): 해당 서비스 제공사의 정책에 따라 상이
`,
    },
  ];

  const shippingRows = [
    {
      item: "디지털 상품 배송",
      content: `본 스토어에서 판매하는 파일은 디지털 다운로드 방식으로 제공됩니다.
결제 완료 후 즉시 다운로드 링크가 제공되며, 마이페이지 > 주문내역 또는 결제 완료 이메일을 통해 파일을 다운로드하실 수 있습니다.
다운로드 링크는 구매 후 다운로드하여 사용 가능합니다.
`,
    },
    {
      item: "물리적 상품 배송",
      content: `일부 패키지 상품(USB, CD 등)은 물리적 배송이 포함될 수 있습니다.
물리적 제품의 경우, 입금 확인 후 1~3 영업일 이내 발송됩니다.
배송 기간: 국내 배송은 평균 2~5일 소요되며, 해외 배송은 국가에 따라 7~14일이 소요될 수 있습니다.
배송 추적은 발송 후 제공된 운송장 번호를 통해 가능합니다.
`,
    },
    {
      item: "배송비",
      content: `디지털 상품은 배송비가 발생하지 않습니다.
물리적 상품의 경우, 국내 배송비는 기본 3,000원, 50,000원 이상 구매 시 무료배송됩니다.
해외 배송비는 국가 및 배송 방법에 따라 다르며, 결제 단계에서 자동으로 계산됩니다.
`,
    },
    {
      item: "반품 관련",
      content: `디지털 상품 특성상 물리적 제품의 반품은 필요하지 않습니다.
만약 특별한 사유로 물리적인 자료(USB, CD 등)를 제공받으신 경우, 아래 주소로 반품해 주시기 바랍니다.
서울특별시 송파구 동남로 9길 53, 202호(가락동) 
수신자: 원툴 고객센터
전화번호: 010-2168-9070
(주의사항 : 반품 전 반드시 고객센터로 연락 후 반품 절차를 안내받으시기 바랍니다.)
반품 시 반드시 원래 포장 상태를 유지해 주시고, 운송장 번호를 보관해 주세요.
`,
    },
  ];

  const cancellationRows = [
    {
      item: "결제 취소 규정",
      content: `디지털 상품의 특성상 구매 완료 후 즉시 다운로드가 가능한 경우, 결제 취소가 불가합니다.
단, 다운로드하지 않은 경우 결제 후 7일 이내 고객센터로 요청 시 취소가 가능합니다.
결제 오류(이중 결제, 오결제 등)의 경우, 확인 후 즉시 취소 및 환불 조치해드립니다.
무통장 입금 결제의 경우, 입금 확인 전에는 자유롭게 취소 가능합니다.
`,
    },
  ];

  return (
    <Container>
      <SectionTitle>환불 규정</SectionTitle>
      <Table>
        <tbody>
          {refundRows.map((row, index) => (
            <tr key={index}>
              <TableCellTitle>{row.item}</TableCellTitle>
              <TableCell>{row.content}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>

      <SectionTitle>배송 규정</SectionTitle>
      <Table>
        <tbody>
          {shippingRows.map((row, index) => (
            <tr key={index}>
              <TableCellTitle>{row.item}</TableCellTitle>
              <TableCell>{row.content}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>

      <SectionTitle>결제 취소 정책</SectionTitle>
      <Table>
        <tbody>
          {cancellationRows.map((row, index) => (
            <tr key={index}>
              <TableCellTitle>{row.item}</TableCellTitle>
              <TableCell>{row.content}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default RuleTable;
