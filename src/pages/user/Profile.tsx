import styled from "styled-components";
import Input from "../../components/Input";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import {
  getOrder,
  getPayments,
  getUserInfo,
  getUserQna,
} from "../../utils/api";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { authState } from "../../atoms/authAtom";
import { formatPrice } from "../../utils/formatPrice";
import { statusMapper } from "../../utils/statusMapper";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Title = styled.span`
  font-size: 17px;
  font-weight: 600;
`;

const UserProfile = styled.div`
  display: flex;
  gap: 12px;
  padding: 10px 23px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 20px 0;
  border: 1px solid #cccccc;
  border-radius: 50px;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
`;

const UserProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 8px;
  span {
    margin-right: 8px;
  }
`;

const LogOutButton = styled.button`
  padding: 10px 8px;
  border: 1.5px solid red;
  border-radius: 20px;
  color: red;
`;

const Name = styled.span`
  font-size: 15px;
  font-weight: 800;
`;

const Rank = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #a2a2a4;
`;

const Email = styled.span`
  font-size: 11px;
  font-weight: 400;
  color: #a2a2a4;
`;

const Banner = styled.div`
  border-bottom: 1px solid black;
  padding-bottom: 24px;
  width: 100%;
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  gap: 6px;
  font-size: 17px;
  font-weight: 700;
  p {
    color: red;
    font-size: 12px;
    font-weight: 400;
  }
`;

const PasswordChangeButton = styled.button`
  width: 122px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  font-size: 13px;
  font-weight: 700;
  margin-left: 8px;
`;

const Form = styled.form`
  width: 100%;
`;

const TableRow = styled.div`
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid #dddddd;
  width: 100%;
  span {
    display: flex;
    align-items: center;
    min-width: 170px;
    padding: 0 20px;
    background-color: #f9f9f9;
  }
  i {
    color: red;
  }
  p {
    font-size: 14px;
    padding: 24px 0 24px 10px;
  }
  input {
    margin-left: 8px;
  }
`;

const TableRowDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  gap: 8px;
  padding: 24px 0;
`;

const TableRowCheckBoxDiv = styled.div`
  display: flex;
  padding-top: 24px;
  flex-direction: column;
  align-items: baseline;
  div {
    display: flex;
    align-items: center;
  }
`;
const WithDrawWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

const WithDrawButton = styled.button`
  color: black;
  width: 160px;
  height: 45px;
  border: 1px solid #cccccc;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: -20px;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 24px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 80px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid #cccccc;
  text-align: center;
  font-size: 13px;
  font-weight: 700;
`;

const AcceptButton = styled(Button)`
  border-color: rgba(38, 69, 172, 1);
  background-color: rgba(38, 69, 172, 1);
  color: white;
`;

const HistoryWrapper = styled.div`
  width: 100%;
  margin-top: 72px;
`;

const ProfilePic = styled.div`
  font-size: 40px;
`;
const HitoryTitle = styled.div`
  text-align: center;
  padding: 24px 0;
  border-bottom: 1px solid #cdcdcd;
  font-size: 18px;
  font-weight: 600;
`;

const HistoryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fafafc;
  font-weight: 600;
  font-size: 13px;
`;

const HistoryTableHeader = styled.thead`
  background-color: #fafafc;
  border-bottom: 1px solid #eaeaea;
`;

const HistoryTableRow = styled.tr`
  border-bottom: 1px solid #eaeaea;
`;

const HistoryTableCell = styled.td`
  padding: 10px 0;
  text-align: center;
  color: #333;
`;

const HistoryTableHeaderCell = styled.th`
  padding: 10px 0;
  text-align: center;
  color: #333;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
`;

const ItemName = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

interface ProfileResultProps {
  id: number;
  email: string;
  password: string;
  name: string;
  birthDate: string;
  development_field: string;
  phoneNum: string;
  isNative: boolean;
  service_accept: boolean;
  user_registered_at: string;
}

interface ProfileProps {
  isSuccess: string;
  code: string;
  message: string;
  result: ProfileResultProps;
}

interface IForm {
  name: string;
  newPassword: string;
  confirmPassword: string;
  phoneNum: string;
}

interface PurchasedItemResultProps {
  orderName: string;
  orderId: number;
  totalPrice: number;
  status: string;
  downloadUrl: string[];
}

interface PurchasedItemProps {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PurchasedItemResultProps[];
}

interface QnaItemProps {
  title: string;
  writer: string;
  postDate: string;
  views: number;
  replies: number;
}

interface QnaProps {
  isSuccess: boolean;
  code: string;
  message: string;
  result: QnaItemProps[];
}

interface PaymentsResultProps {
  id: number;
  accountName: string;
  accountNumber: string;
  bankName: string;
  totalPrice: number;
}

interface PaymentsProps {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PaymentsResultProps[];
}

const Profile = () => {
  const {
    data: profileData,
    isLoading: profileIsLoading,
    error: profileError,
  } = useQuery<ProfileProps>({ queryKey: ["profile"], queryFn: getUserInfo });

  const {
    data: purchasedData,
    isLoading: purchasedIsLoading,
    error: purchasedError,
  } = useQuery<PurchasedItemProps>({
    queryKey: ["userPurchased"],
    queryFn: getOrder,
  });

  const {
    data: paymentsData,
    isLoading: paymentsIsLoading,
    error: paymentsError,
  } = useQuery<PaymentsProps>({
    queryKey: ["profile", "userPayments"],
    queryFn: getPayments,
  });

  const {
    data: userQnaData,
    isLoading: userQnaIsLoading,
    error: userQnaError,
  } = useQuery<QnaProps>({
    queryKey: ["userQna"],
    queryFn: getUserQna,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (orderId: number) => {
    setExpandedRow((prev) => (prev === orderId ? null : orderId)); // 클릭 시 토글
  };

  const allChangeClick = async ({
    name,
    newPassword,
    phoneNum,
    confirmPassword,
  }: IForm) => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    try {
      await axios.patch("/users", {
        password: newPassword,
        name,
        phone_num: phoneNum,
      });
      alert("정보가 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error(error);
      alert("정보 수정에 실패했습니다.");
    }
  };

  const deleteUser = async () => {
    try {
      const res = await axios.delete("/users");
      if (res.status === 200) {
        alert("탈퇴가 완료되었습니다.");
        // 탈퇴시에도 로그아웃처럼 토큰 만료처리
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOutClick = async () => {
    const res = await axios.delete("/users/logout");
    if (res.data.isSuccess) {
      alert("로그아웃 되었습니다.");
      const updateAuth = { isAuthenticated: false };
      setAuth(updateAuth);
      navigate("/");
    } else {
      alert("이미 로그아웃 되었습니다.");
    }
  };

  if (
    profileIsLoading ||
    purchasedIsLoading ||
    userQnaIsLoading ||
    paymentsIsLoading
  ) {
    return <div>Loading...</div>;
  }

  if (profileError || purchasedError || userQnaError || paymentsError) {
    return <div>오류가 발생했습니다. 다시 시도해 주세요.</div>;
  }

  return (
    <>
      {profileData ? (
        <Container>
          <Title>회원정보</Title>
          <UserProfile>
            <UserProfileWrapper>
              <ProfilePic>
                <CgProfile />
              </ProfilePic>
              <UserProfileDetail>
                <div>
                  <Name>{profileData.result.name}</Name>
                  <Rank>일반회원</Rank>
                </div>
                <div>
                  <Email>{profileData.result.email}</Email>
                </div>
              </UserProfileDetail>
            </UserProfileWrapper>
            <LogOutButton onClick={logOutClick}>로그아웃</LogOutButton>
          </UserProfile>
          <Banner>
            <span>기본정보</span>
            <p>* 표시는 반드시 입력하셔야 하는 항목입니다.</p>
          </Banner>

          <Form onSubmit={handleSubmit(allChangeClick)}>
            <TableRow>
              <span>아이디</span>
              <p>{profileData.result.email}</p>
            </TableRow>
            <TableRow>
              <span>
                비밀번호<i>*</i>
              </span>
              <TableRowDiv>
                <Input
                  type="password"
                  placeholder="새 비밀번호"
                  {...register("newPassword", {
                    required: "비밀번호를 입력해주세요.",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{10,16}$/,
                      message: "비밀번호 형식에 맞게 입력해주세요.",
                    },
                  })}
                />
                {errors.newPassword && (
                  <ErrorMessage>{errors.newPassword.message}</ErrorMessage>
                )}
                <Input
                  type="password"
                  placeholder="새 비밀번호 확인"
                  {...register("confirmPassword", { required: true })}
                />
              </TableRowDiv>
            </TableRow>
            <TableRow>
              <span>
                이름<i>*</i>
              </span>
              <TableRowDiv>
                <Input
                  type="text"
                  defaultValue={profileData.result.name}
                  {...register("name", { required: true })}
                />
              </TableRowDiv>
            </TableRow>
            <TableRow>
              <span>
                휴대폰 번호<i>*</i>
              </span>
              <TableRowCheckBoxDiv>
                <Input
                  type="text"
                  defaultValue={profileData.result.phoneNum}
                  {...register("phoneNum", { required: true })}
                />
                <div>
                  <input type="checkbox" />
                  <p>이벤트 등의 마케팅 소식을 SMS로 받습니다.</p>
                </div>
              </TableRowCheckBoxDiv>
            </TableRow>
            <ButtonWrapper>
              <AcceptButton type="submit">수정 완료</AcceptButton>
              <Button type="button">취소</Button>
            </ButtonWrapper>
          </Form>
          <WithDrawWrapper>
            <WithDrawButton onClick={deleteUser}>
              회원 탈퇴하기 {">>"}
            </WithDrawButton>
          </WithDrawWrapper>
          <HistoryWrapper>
            <HitoryTitle>
              <span>최근 주문 내역</span>
            </HitoryTitle>
            <HistoryTable>
              <HistoryTableHeader>
                <tr>
                  <HistoryTableHeaderCell>상품 정보</HistoryTableHeaderCell>
                  <HistoryTableHeaderCell>주문 번호</HistoryTableHeaderCell>
                  <HistoryTableHeaderCell>상품 금액</HistoryTableHeaderCell>
                  <HistoryTableHeaderCell>주문 상태</HistoryTableHeaderCell>
                </tr>
              </HistoryTableHeader>
              <tbody style={{ cursor: "pointer" }}>
                {purchasedData!.result.length > 0 ? (
                  purchasedData!.result.map((item) => (
                    <>
                      <HistoryTableRow
                        key={item.orderId}
                        onClick={() => toggleRow(item.orderId)}
                      >
                        <HistoryTableCell>
                          <ItemName>{item.orderName}</ItemName>
                        </HistoryTableCell>
                        <HistoryTableCell>{item.orderId}</HistoryTableCell>
                        <HistoryTableCell>
                          {formatPrice(item.totalPrice)}원
                        </HistoryTableCell>
                        <HistoryTableCell>
                          {statusMapper[item.status] === "PAY_DONE" ? (
                            <ul>
                              {item.downloadUrl.map((e) => (
                                <li>{e}</li>
                              ))}
                            </ul>
                          ) : (
                            statusMapper[item.status] || "서버 에러"
                          )}
                        </HistoryTableCell>
                      </HistoryTableRow>

                      {expandedRow === item.orderId && ( // ✅ 토글된 행일 때만 표시
                        <tr style={{ cursor: "pointer" }}>
                          <td colSpan={4}>
                            <div
                              style={{
                                padding: "20px",
                                background: "#f9f9f9",
                                borderRadius: "8px",
                                border: "1px solid #e0e0e0",
                                margin: "10px 0",
                              }}
                            >
                              <p
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "600",
                                  marginBottom: "16px",
                                  padding: "5px",
                                  borderBottom: "1px solid black",
                                }}
                              >
                                <strong>결제요청 정보</strong>
                              </p>
                              {paymentsData!.result.find(
                                (payment) => payment.id === item.orderId
                              ) ? (
                                <div
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(2, 1fr)",
                                    gap: "12px",
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#555",
                                      }}
                                    >
                                      <strong>은행:</strong>{" "}
                                      {
                                        paymentsData!.result.find(
                                          (payment) =>
                                            payment.id === item.orderId
                                        )?.bankName
                                      }
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#555",
                                      }}
                                    >
                                      <strong>계좌주명:</strong>{" "}
                                      {
                                        paymentsData!.result.find(
                                          (payment) =>
                                            payment.id === item.orderId
                                        )?.accountName
                                      }
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "8px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#555",
                                      }}
                                    >
                                      <strong>계좌번호:</strong>{" "}
                                      {
                                        paymentsData!.result.find(
                                          (payment) =>
                                            payment.id === item.orderId
                                        )?.accountNumber
                                      }
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "#555",
                                      }}
                                    >
                                      <strong>총 결제 금액:</strong>{" "}
                                      {formatPrice(item.totalPrice)}원
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <p
                                  style={{
                                    fontSize: "14px",
                                    color: "#777",
                                    textAlign: "center",
                                  }}
                                >
                                  결제 정보가 없습니다.
                                </p>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                ) : (
                  <HistoryTableRow>
                    <HistoryTableCell colSpan={4}>
                      주문 내역이 없습니다.
                    </HistoryTableCell>
                  </HistoryTableRow>
                )}
              </tbody>
            </HistoryTable>
          </HistoryWrapper>

          <HistoryWrapper>
            <HitoryTitle>
              <span>나의 문의 내역</span>
            </HitoryTitle>
            <HistoryTable>
              <HistoryTableHeader>
                <tr>
                  <HistoryTableHeaderCell>날짜</HistoryTableHeaderCell>
                  <HistoryTableHeaderCell>문의 제목</HistoryTableHeaderCell>
                  <HistoryTableHeaderCell>문의 내용</HistoryTableHeaderCell>
                  <HistoryTableHeaderCell>문의 상태</HistoryTableHeaderCell>
                </tr>
              </HistoryTableHeader>
              <tbody>
                {userQnaData!.result.length > 0 ? (
                  userQnaData!.result.map((item, index) => (
                    <HistoryTableRow key={index}>
                      <HistoryTableCell>{item.postDate}</HistoryTableCell>
                      <HistoryTableCell>{item.title}</HistoryTableCell>
                      <HistoryTableCell>{item.writer}</HistoryTableCell>
                      <HistoryTableCell>
                        {item.replies > 0 ? "답변 완료" : "대기 중"}
                      </HistoryTableCell>
                    </HistoryTableRow>
                  ))
                ) : (
                  <HistoryTableRow>
                    <HistoryTableCell colSpan={4}>
                      문의 내역이 없습니다.
                    </HistoryTableCell>
                  </HistoryTableRow>
                )}
              </tbody>
            </HistoryTable>
          </HistoryWrapper>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Profile;
