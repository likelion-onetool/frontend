import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import Input from "../../components/Input";
import UserFormGroup from "./components/UserFormGroup";
import UserLabel from "./components/UserLabel";
import { Button } from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

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

const SuccessWrapper = styled.div`
  text-align: center;
  margin-top: 50px;
  span {
    font-weight: 700;
  }
  font-weight: 400;
  font-size: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

interface IForm {
  name: string;
  phoneNum: number;
}

const FindUserId = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [findId, setFindId] = useState<string>("");
  const [findName, setFindName] = useState<string>("");

  const onValid = async ({ name, phoneNum }: IForm) => {
    try {
      const res = await axios.post(`/users/email/find-email`, {
        name,
        phone_num: phoneNum,
      });
      if (res.data.isSuccess) {
        setFindId(res.data.result);
        setFindName(name);
      } else {
        alert("에러가 발생했습니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Tab>
        <InnerTab to="/users/find/id" isActive={true}>
          <span>아이디 찾기</span>
        </InnerTab>
        <InnerTab to="/users/find/password" isActive={false}>
          <span>비밀번호 찾기</span>
        </InnerTab>
      </Tab>
      {findId ? (
        <SuccessWrapper>
          <span>{findName}</span>님의 아이디는
          <br />
          <span>{findId}</span> 입니다.
        </SuccessWrapper>
      ) : (
        <Form onSubmit={handleSubmit(onValid)}>
          <UserFormGroup>
            <UserLabel>이름</UserLabel>
            <Input
              type="text"
              placeholder="이름을 입력해주세요."
              {...register("name", { required: true })}
            />
          </UserFormGroup>
          <UserFormGroup>
            <UserLabel>전화번호</UserLabel>
            <Input
              type="text"
              placeholder="01012345678"
              {...register("phoneNum", { required: true })}
            />
          </UserFormGroup>
          <FindIdButton>아이디 찾기</FindIdButton>
        </Form>
      )}
    </Container>
  );
};

export default FindUserId;
