import styled from "styled-components";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 44px;
`;

const SnsWrapper = styled.div`
  width: 343px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px dashed black;
  gap: 12px;
  padding-bottom: 12px;
  font-size: 12px;
  font-weight: 700;
  color: #919eab;
`;

const GoogleButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
`;

const AuthButton = styled.button`
  width: 343px;
  height: 31px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #919eabcc;
  border: 1px solid #919eab3d;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-weight: 700;
  color: #919eab;
  gap: 6px;
  p {
    font-size: 11px;
    font-weight: 500;
  }
`;

const Selector = styled.select`
  width: 343px;
  height: 45px;
  border-radius: 8px;
  border: 1px solid #dbe0e4;
  text-align: center;
`;

const Card = styled.div`
  width: 343px;
  border-radius: 16px;
  border: 1px solid #919eab3d;
  display: flex;
  flex-direction: column;
  padding: 20px;
  font-size: 13px;
  input {
    margin-right: 12px;
  }
`;

const CardTitleWrapper = styled.div`
  border-bottom: 1px solid #919eab3d;
  span {
    font-size: 13px;
    font-weight: 800;
  }
  padding-bottom: 20px;
`;

const CardTermsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  div {
    display: flex;
    align-items: center;
  }
  span {
    color: #4e4eff;
  }
  padding-top: 20px;
  gap: 16px;
`;

const JoinButton = styled.button`
  width: 343px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #919eab3d;
  color: #919eabcc;
  font-size: 14px;
  font-weight: 700;
`;

const Join = () => {
  const [checkBoxes, setCheckBoxes] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkBoxes.length === 3) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkBoxes]);

  const ToggleAllChecked = () => {
    if (allChecked) {
      setCheckBoxes([]);
    } else {
      setCheckBoxes(["usage", "info", "marketting"]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkBoxes.includes(e.target.name)) {
      setCheckBoxes((prev) => prev.filter((i) => i !== e.target.name));
    } else {
      setCheckBoxes((prev) => [...prev, e.target.name]);
    }
  };
  const onClick = () => {
    if (checkBoxes.includes("usage") && checkBoxes.includes("info")) {
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } else {
      alert("필수항목에 모두 체크해주세요!");
    }
  };

  return (
    <Container>
      <SnsWrapper>
        <span>SNS 계정으로 가입하기</span>
        <GoogleButton>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M20.0941 10.2272C20.0941 9.51812 20.0305 8.8363 19.9123 8.18176H10.4941V12.0499H15.8759C15.6441 13.2999 14.9396 14.359 13.8805 15.0681V17.5772H17.1123C19.0032 15.8363 20.0941 13.2726 20.0941 10.2272Z"
              fill="#4285F4"
            />
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M10.4949 20C13.1949 20 15.4586 19.1045 17.1131 17.5773L13.8813 15.0682C12.9858 15.6682 11.8404 16.0227 10.4949 16.0227C7.89041 16.0227 5.68586 14.2636 4.8995 11.9H1.55859V14.4909C3.20404 17.7591 6.58586 20 10.4949 20Z"
              fill="#34A853"
            />
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M4.89869 11.8999C4.69869 11.2999 4.58505 10.659 4.58505 9.99994C4.58505 9.34085 4.69869 8.69994 4.89869 8.09994V5.50903H1.55778C0.880505 6.85903 0.494141 8.38631 0.494141 9.99994C0.494141 11.6135 0.880505 13.1408 1.55778 14.4908L4.89869 11.8999Z"
              fill="#FBBC05"
            />
            <path
              fill-rule="evenodd"
              clipRule="evenodd"
              d="M10.4949 3.97727C11.9631 3.97727 13.2813 4.48182 14.3177 5.47273L17.1858 2.60455C15.454 0.990909 13.1904 0 10.4949 0C6.58586 0 3.20404 2.24091 1.55859 5.50909L4.8995 8.1C5.68586 5.73636 7.89041 3.97727 10.4949 3.97727Z"
              fill="#EA4335"
            />
          </svg>
        </GoogleButton>
      </SnsWrapper>
      <Title>원툴에 오신것을 환영합니다!</Title>
      <Wrapper>
        <span>아이디(이메일)</span>
        <Input type="email" placeholder="example@example.com" />
        <AuthButton>인증하기</AuthButton>
      </Wrapper>
      <Wrapper>
        <span>비밀번호</span>
        <p>영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합 (10-16자)</p>
        <Input type="password" placeholder="비밀번호" />
        <Input type="password" placeholder="비밀번호 확인" />
      </Wrapper>
      <Wrapper>
        <span>생년월일</span>
        <Input type="date" placeholder="example@example.com" />
      </Wrapper>
      <Wrapper>
        <span>이름</span>
        <Input type="text" placeholder="사용자 이름" />
      </Wrapper>
      <Wrapper>
        <span>휴대폰 번호</span>
        <Input type="text" placeholder="'-' 없이 입력 (예시) 01012345678" />
      </Wrapper>
      <Wrapper>
        <span>관련 직종</span>
        <Selector>
          <option value="student">학생</option>
          <option value="architect">건축관련 직종</option>
          <option value="etc">그외</option>
        </Selector>
      </Wrapper>
      <Wrapper>
        <span>국적</span>
        <Selector>
          <option value="korean">내국인</option>
          <option value="foreign">외국인</option>
        </Selector>
      </Wrapper>
      <Card>
        <CardTitleWrapper>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={ToggleAllChecked}
          />
          <span>모든 약관을 확인하고 전체 동의합니다.</span>
        </CardTitleWrapper>
        <CardTermsWrapper>
          <div>
            <input
              type="checkbox"
              name="usage"
              required={true}
              onChange={onChange}
              checked={checkBoxes.includes("usage")}
            />
            <p>
              이용약관 동의 <span>(필수)</span>
            </p>
          </div>
          <div>
            <input
              type="checkbox"
              name="info"
              required={true}
              onChange={onChange}
              checked={checkBoxes.includes("info")}
            />
            <p>
              개인정보 처리방침 동의 <span>(필수)</span>
            </p>
          </div>
          <div>
            <input
              type="checkbox"
              name="marketting"
              onChange={onChange}
              checked={checkBoxes.includes("marketting")}
            />
            <p>
              마케팅 수신 동의 <span>(선택)</span>
            </p>
          </div>
        </CardTermsWrapper>
      </Card>
      <JoinButton onClick={onClick}>가입하기</JoinButton>
    </Container>
  );
};

export default Join;
