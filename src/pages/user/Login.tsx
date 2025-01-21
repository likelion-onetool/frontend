import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import UserFormGroup from "./components/UserFormGroup";
import UserLabel from "./components/UserLabel";
import { useForm } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { onLoginSuccess } from "../../utils/api";
import { useRecoilState } from "recoil";
import { authState } from "../../atoms/authAtom";
import { useEffect } from "react";
const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Option = styled.div`
  display: flex;
  padding: 50px 0px;
  gap: 12px;
  :last-child {
    font-weight: 700;
  }
`;

const OptionLabel = styled(Link)`
  font-size: 13px;
  font-weight: 400;
`;

export const Button = styled.button`
  width: 343px;
  height: 48px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

const LoginButton = styled(Button)`
  background-color: #212b36;
  color: #ffffff;
  font-weight: 700;
  margin-bottom: 24px;
`;

const GoogleButton = styled(Button)`
  background-color: #ffffff;
  color: black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  font-weight: 500;
  margin-top: 24px;
`;

const SMSSpan = styled.span`
  color: #919eab;
  font-size: 11px;
  display: flex;
  align-items: center;
  text-align: center;

  &::before,
  &::after {
    content: "-------------------------";
  }

  &::before {
    margin-right: 8px;
  }

  &::after {
    margin-left: 8px;
  }
`;

const LoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

interface ILoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<ILoginForm>();
  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate("/");
    }
  }, [auth, navigate]);

  const onValid = async ({ email, password }: ILoginForm) => {
    try {
      await axios
        .post(
          "/users/login",
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then((res) =>
          res.data.isSuccess
            ? onLoginSuccess(res.data.result, setAuth)
            : alert("아이디 비밀번호를 확인하세요!")
        );
    } catch (error) {
      alert("로그인 실패");
      console.error("Login failed", error);
    }
  };

  const onGoogleSubmit = async () => {
    try {
      await axios.post(
        "/oauth2/authorization/google",
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <UserFormGroup>
          <UserLabel>아이디 (이메일)</UserLabel>
          <Input
            type="text"
            placeholder="example@example.com"
            {...register("email", { required: true })}
          />
        </UserFormGroup>
        <UserFormGroup>
          <UserLabel>비밀번호</UserLabel>
          <Input
            type="password"
            placeholder="비밀번호 입력"
            {...register("password", { required: true })}
          />
        </UserFormGroup>

        <Option>
          <OptionLabel to="/users/find/id">아이디 찾기</OptionLabel>|
          <OptionLabel to="/users/find/password">비밀번호 찾기</OptionLabel>|
          <OptionLabel to="/users/join">회원가입</OptionLabel>
        </Option>

        <LoginButtons>
          <LoginButton type="submit">로그인</LoginButton>{" "}
          {/* 로그인 버튼을 submit으로 설정 */}
          <SMSSpan>SNS 계정으로 로그인</SMSSpan>
        </LoginButtons>
      </Form>
      <GoogleButton onClick={onGoogleSubmit}>
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.0941 10.2272C20.0941 9.51812 20.0305 8.8363 19.9123 8.18176H10.4941V12.0499H15.8759C15.6441 13.2999 14.9396 14.359 13.8805 15.0681V17.5772H17.1123C19.0032 15.8363 20.0941 13.2726 20.0941 10.2272Z"
            fill="#4285F4"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4949 20C13.1949 20 15.4586 19.1045 17.1131 17.5773L13.8813 15.0682C12.9858 15.6682 11.8404 16.0227 10.4949 16.0227C7.89041 16.0227 5.68586 14.2636 4.8995 11.9H1.55859V14.4909C3.20404 17.7591 6.58586 20 10.4949 20Z"
            fill="#34A853"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.89869 11.8999C4.69869 11.2999 4.58505 10.659 4.58505 9.99994C4.58505 9.34085 4.69869 8.69994 4.89869 8.09994V5.50903H1.55778C0.880505 6.85903 0.494141 8.38631 0.494141 9.99994C0.494141 11.6135 0.880505 13.1408 1.55778 14.4908L4.89869 11.8999Z"
            fill="#FBBC05"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.4949 3.97727C11.9631 3.97727 13.2813 4.48182 14.3177 5.47273L17.1858 2.60455C15.454 0.990909 13.1904 0 10.4949 0C6.58586 0 3.20404 2.24091 1.55859 5.50909L4.8995 8.1C5.68586 5.73636 7.89041 3.97727 10.4949 3.97727Z"
            fill="#EA4335"
          />
        </svg>
        Google 계정으로 로그인
      </GoogleButton>
    </Container>
  );
};

export default Login;
