import styled from "styled-components";
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Container = styled.div`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 44px;
`;

const Title = styled.span`
  width: 250px;
  margin-top: -30px;
  border: 5px solid rgba(29, 53, 136, 1);
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  padding: 20px 10px;
  border-radius: 50px;
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
    color: rgba(29, 53, 136, 1);
  }
  padding-top: 20px;
  gap: 16px;
`;

const JoinButton = styled.button`
  width: 330px;

  border: 5px solid rgba(29, 53, 136, 1);
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  font-weight: 700;
  line-height: 30px;
  padding: 10px;
  border-radius: 50px;
  &:hover {
    background-color: rgba(29, 53, 136, 1);
    color: white;
    transition: 0.5s;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

// 스타일 추가
const VerificationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const VerificationInput = styled(Input)`
  width: 100%;
`;

const VerificationButton = styled.button`
  padding: 8px 16px;
  background-color: rgba(29, 53, 136, 1);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 12px;
  margin-top: 5px;
`;

interface IForm {
  email: string;
  password: string;
  passwordConfirm: string;
  birthDate: string;
  name: string;
  phoneNumber: string;
  field: string;
  isNative: string | boolean;
}

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>();
  const [checkBoxes, setCheckBoxes] = useState<string[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [showCode, setShowCode] = useState(false);
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

  const onValid = async (data: IForm) => {
    try {
      //이메일 인증 확인
      if (!isVerified) {
        alert("이메일인증을 해주세요.");
        return;
      }

      // 비밀번호 일치 확인
      if (data.password !== data.passwordConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      // 'isNative' 변환
      const isNative = data.isNative === "korean" ? true : false;

      // 전송할 데이터 객체 생성
      const payload = {
        email: data.email,
        password: data.password,
        birthDate: data.birthDate,
        name: data.name,
        phoneNum: data.phoneNumber,
        development_field: data.field,
        isNative: isNative,
      };

      // 데이터 전송
      const res = await axios.post(`/users/signup`, payload);
      if (res.data.isSuccess) {
        alert("회원가입이 완료되었습니다.");
        navigate("/users/login");
      } else if (!res.data.isSuccess && res.data.code === "COMMON-0002") {
        alert("이미 존재하는 회원입니다.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleVerifyClick = async () => {
    const email = watch("email"); // react-hook-form의 watch를 사용하여 이메일 값을 가져옴

    // 이메일 유효성 검사
    if (
      !email ||
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      alert("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.post(
        `/users/email/verification-requests?email=${email}`
      );
      if (res.data.isSuccess) {
        alert("이메일로 인증 코드가 발송되었습니다. 이메일을 확인해주세요.");
        setShowCode(true);
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("이메일 인증 요청에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleCodeVerification = async () => {
    const email = watch("email");

    if (!verificationCode) {
      alert("인증 코드를 입력해주세요.");
      return;
    }

    try {
      const res = await axios.get(
        `/users/email/verifications?email=${email}&code=${verificationCode}`
      );
      if (res.data.isSuccess) {
        alert("이메일 인증이 완료되었습니다.");
        setIsVerified(true);
      } else {
        alert("인증 코드가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      alert("인증 코드 검증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>원툴에 오신것을 환영합니다!</Title>
      <SnsWrapper>
        <span>SNS 계정으로 가입하기</span>
        <GoogleButton>
          {" "}
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
        </GoogleButton>
      </SnsWrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <Wrapper>
          <span>아이디(이메일)</span>
          <Input
            type="email"
            placeholder="example@example.com"
            {...register("email", {
              required: "이메일은 필수 입력 항목입니다.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "유효한 이메일 주소를 입력해주세요.",
              },
            })}
          />
          <VerificationButton type="button" onClick={handleVerifyClick}>
            {showCode ? "재전송" : "인증코드 요청"}
          </VerificationButton>
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </Wrapper>
        {/* 인증 코드 입력 필드 */}
        {showCode && (
          <VerificationWrapper>
            <span>인증 코드</span>
            <VerificationInput
              type="text"
              placeholder="이메일로 발송된 인증 코드를 입력하세요"
              value={verificationCode}
              onChange={(e: any) => setVerificationCode(e.target.value)}
              disabled={isVerified} // 인증 성공 시 비활성화
            />
            <VerificationButton
              type="button"
              onClick={handleCodeVerification}
              disabled={isVerified} // 인증 성공 시 비활성화
            >
              인증 코드 확인
            </VerificationButton>
            {isVerified && (
              <SuccessMessage>이메일 인증이 완료되었습니다.</SuccessMessage>
            )}
          </VerificationWrapper>
        )}

        <Wrapper>
          <span>비밀번호</span>
          <p>영문 대소문자, 숫자, 특수문자 중 2가지 이상 조합 (10-16자)</p>
          <Input
            type="password"
            placeholder="비밀번호"
            {...register("password", {
              required: "비밀번호는 필수 입력 항목입니다.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{10,16}$/,
                message: "비밀번호 형식에 맞게 입력해주세요.",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
          <Input
            type="password"
            placeholder="비밀번호 확인"
            {...register("passwordConfirm", {
              required: "비밀번호 확인은 필수 입력 항목입니다.",
              validate: (value) =>
                value === watch("password") || "비밀번호가 일치하지 않습니다.",
            })}
          />
          {errors.passwordConfirm && (
            <ErrorMessage>{errors.passwordConfirm.message}</ErrorMessage>
          )}
        </Wrapper>

        <Wrapper>
          <span>생년월일</span>
          <Input
            type="date"
            {...register("birthDate", {
              required: "생년월일은 필수 입력 항목입니다.",
            })}
          />
          {errors.birthDate && (
            <ErrorMessage>{errors.birthDate.message}</ErrorMessage>
          )}
        </Wrapper>

        <Wrapper>
          <span>이름</span>
          <Input
            type="text"
            placeholder="사용자 이름"
            {...register("name", { required: "이름은 필수 입력 항목입니다." })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </Wrapper>

        <Wrapper>
          <span>휴대폰 번호</span>
          <Input
            type="text"
            placeholder="'-' 없이 입력 (예시) 01012345678"
            {...register("phoneNumber", {
              required: "휴대폰 번호는 필수 입력 항목입니다.",
              pattern: {
                value: /^010\d{8}$/,
                message: "전화번호 형식에 맞게 입력해주세요. 예: 01012345678",
              },
            })}
          />
          {errors.phoneNumber && (
            <ErrorMessage>{errors.phoneNumber.message}</ErrorMessage>
          )}
        </Wrapper>

        <Wrapper>
          <span>개인/단체 선택</span>
          <Selector
            {...register("field", { required: "관련 직종을 선택해주세요." })}
          >
            <option value="individual">개인</option>
            <option value="company">단체</option>

            <option value="etc">그 외</option>
          </Selector>
          {errors.field && <ErrorMessage>{errors.field.message}</ErrorMessage>}
        </Wrapper>

        <Wrapper>
          <span>국적</span>
          <Selector
            {...register("isNative", { required: "국적을 선택해주세요." })}
          >
            <option value="korean">내국인</option>
            <option value="foreign">외국인</option>
          </Selector>
          {errors.isNative && (
            <ErrorMessage>{errors.isNative.message}</ErrorMessage>
          )}
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
        <JoinButton>가입하기</JoinButton>
      </Form>
    </Container>
  );
};

export default Join;
