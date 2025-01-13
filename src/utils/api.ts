import axios, { AxiosResponse } from "axios";

interface IGetItems {
  search: string;
  page: number;
}

// 검색어로 검색
export async function getItems({ search, page }: IGetItems) {
  try {
    const res = await axios.get(
      `/blueprint?s=${encodeURIComponent(search)}&page=${page}&size=${8}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export interface BlueprintProps {
  createdAt: string;
  updatedAt: string;
  id: number;
  blueprintName: string;
  categoryId: number;
  standardPrice: number;
  blueprintImg: string;
  blueprintDetails: string;
  extension: string;
  program: string;
  hits: number | null;
  salePrice: number;
  saleExpiredDate: string | null;
  creatorName: string;
  downloadLink: string;
  secondCategory: string;
  orderBlueprints: any[];
  cartBlueprints: any[];
}

interface ContentProps {
  blueprint: BlueprintProps;
}

interface SortProps {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface PageableProps {
  pageNumber: number;
  pageSize: number;
  sort: SortProps;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface ResultProps {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: ContentProps[];
  number: number;
  sort: SortProps;
  numberOfElements: number;
  pageable: PageableProps;
  empty: boolean;
}

export interface ItemProps {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ResultProps;
}

// 전체 카테고리
export async function getAllItems(page: number, size: number) {
  try {
    const res = await axios.get(`/blueprint/all?page=${page}&size=${size}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

interface IGetCategoryItems {
  category?: string;
  page: number;
}

//카테고리별 도면 조회
export async function getCategoryItems({ category, page }: IGetCategoryItems) {
  try {
    const res = await axios.get(
      `/blueprint/${category}?&size=${8}&page=${page}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDetailItem(id: number) {
  try {
    const res = await axios.get(`/blueprint/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCartItems() {
  try {
    const res = await axios.get(`/cart`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// user 관련 api

export async function onSilentRefresh(
  setAuth: (authState: { isAuthenticated: boolean; token: string }) => void
) {
  try {
    const res = await axios.post("/silent-refresh");

    if (!res.data.isSuccess) {
      throw new Error("Token refresh failed");
    }
    onLoginSuccess(res.data.result, setAuth);
  } catch (error) {
    console.error("Error during silent refresh:", error); //에러도 제거해야됨
    // recoil 상태 변경 필요??(기본값이 false니까 안해도 될지도..)

    alert("로그인 갱신 실패. 다시 로그인해주세요."); // alert 제거해야됨
  }
}

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

export const onLoginSuccess = (
  token: string,
  setAuth: (authState: { isAuthenticated: boolean; token: string }) => void
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const updateAuth = { isAuthenticated: true, token };
  setAuth(updateAuth);

  setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);

  alert("로그인 성공!");
};

export async function getUserInfo() {
  try {
    const res = await axios.get(`/users`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
