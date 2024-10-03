import styled from "styled-components";
import { Title } from "./FAQ";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
`;

const FAQForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 400;
  color: #6b6b6b;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  padding: 10px 12px;

  @media (min-width: 1920px) and (min-height: 1080px) {
    width: 779px;
    height: 40px;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 354px;
  padding: 10px 12px;
  border: 1px solid #e4e4e4;
  border-radius: 5px;
  resize: none;

  @media (min-width: 1920px) and (min-height: 1080px) {
    width: 779px;
    height: 354px;
  }
`;

const CheckBoxWrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 50px;
  gap: 10px;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    p {
      font-weight: 400;
      color: #6b6b6b;
      font-size: 14px;
    }
  }
`;

const CheckBox = styled.input.attrs({ type: "checkbox" })`
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: #e4e4e4;
  border: none;
  margin: 0;
  appearance: none; /* 기본 체크박스 스타일 제거 */
  cursor: pointer;

  &:checked {
    background-color: #2645ac; /* 체크되었을 때의 백그라운드 색상 */
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const WriteFAQ = () => {
  return (
    <Container>
      <Title>문의사항</Title>
      <Wrapper>
        <FAQForm>
          <Label>제목</Label>
          <Input />
          <Label>본문</Label>
          <TextArea />
        </FAQForm>
      </Wrapper>
      <CheckBoxWrapper>
        <div>
          <CheckBox type="checkbox" />
          <p>이용 약관에 동의합니다.</p>
        </div>
        <div>
          <CheckBox type="checkbox" />
          <p>개인정보 제공 및 활용에 동의합니다.</p>
        </div>
      </CheckBoxWrapper>
      <ButtonWrapper>
        <Button style={{ border: "1px solid #E4E4E4" }}>취소</Button>
        <Button style={{ backgroundColor: "#2645AC", color: "white" }}>
          등록하기
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

export default WriteFAQ;
