import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import UserFormGroup from "./components/UserFormGroup";
import UserLabel from "./components/UserLabel";
import { Button } from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 32px;
`;

const InnerTab = styled(Link)<{ isActive: boolean }>`
  width: 171.5px;
  height: 40px;
  border-bottom: 2px solid
    ${(props) => (props.isActive ? "#333333" : "#cccccc")};
  text-align: center;
  color: ${(props) => (props.isActive ? "#333333" : "#cccccc")};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  &:hover {
    color: #333333;
  }
`;

const FindIdButton = styled(Button)`
  background-color: #999999;
  color: #ffffff;
`;

const Message = styled.div`
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  margin: 50px 0;
  line-height: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const SuccessWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  span {
    font-weight: 700;
  }
  font-weight: 400;
  font-size: 15px;
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

interface IForm {
  email: string;
}

const FindUserPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // 새 상태 변수 추가

  const onValid = async ({ email }: IForm) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`/users/email/find-password`, {
        email,
      });
      if (res.data.isSuccess) {
        setIsLoading(false);
        setIsSuccess(true); // 성공 시에만 true로 설정
      } else {
        setIsLoading(false);
        alert("해당 이메일을 사용하는 유저를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false); // 실패 시 로딩을 멈추도록 설정
      alert("요청에 실패하였습니다.");
    }
  };

  return (
    <>
      <Tab>
        <InnerTab to="/users/find/id" isActive={false}>
          <span>아이디 찾기</span>
        </InnerTab>
        <InnerTab to="/users/find/password" isActive={true}>
          <span>비밀번호 찾기</span>
        </InnerTab>
      </Tab>
      {isLoading ? (
        <LoadingWrapper>
          <Spinner />
          <Message>이메일 발송 중...</Message>
        </LoadingWrapper>
      ) : isSuccess ? ( // isSuccess가 true일 때만 성공 메시지 표시
        <SuccessWrapper>
          <Message>이메일이 발송되었습니다.</Message>
        </SuccessWrapper>
      ) : (
        <Form onSubmit={handleSubmit(onValid)}>
          <Message>
            회원정보의 이메일로
            <br />
            비밀번호 재설정 메일이 발송됩니다.
          </Message>
          <UserFormGroup>
            <UserLabel>이메일</UserLabel>
            <Input
              type="text"
              placeholder="이메일을 입력해주세요."
              {...register("email", {
                required: "이메일은 필수 입력 항목입니다.",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "유효한 이메일 주소를 입력하세요.",
                },
              })}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </UserFormGroup>
          <FindIdButton>이메일 발송</FindIdButton>
        </Form>
      )}
    </>
  );
};

export default FindUserPassword;
