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
  content: BlueprintProps[];
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

// user 관련 api

export async function onSilentRefresh(
  setAuth: (authState: { isAuthenticated: boolean }) => void
) {
  try {
    const res = await axios.post("/silent-refresh");

    if (!res.data.isSuccess) {
      throw new Error("Token refresh failed");
    }
    onLoginSuccess(res.data.result, setAuth);
  } catch (error) {
    console.log("로그인 실패");

    const updateAuth = { isAuthenticated: false };
    setAuth(updateAuth);
  }
}

const JWT_EXPIRY_TIME = 24 * 3600 * 1000;

export const onLoginSuccess = (
  token: string,
  setAuth: (authState: { isAuthenticated: boolean }) => void
) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const updateAuth = { isAuthenticated: true };
  setAuth(updateAuth);

  setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
};

export async function getUserInfo() {
  try {
    const res = await axios.get(`/users`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserPurchase() {
  try {
    const res = await axios.get(`/users/myPurchase`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserQna() {
  try {
    const res = await axios.get(`/users/myQna`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// 장바구니, 결제관련 로직
export async function getCartItems() {
  try {
    const res = await axios.get(`/cart`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addCartItems(blueprintId: number) {
  try {
    const res = await axios.post(`/api/cart/add/${blueprintId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCartItems(blueprintId: number) {
  try {
    const res = await axios.delete(`/api/cart/delete/${blueprintId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
