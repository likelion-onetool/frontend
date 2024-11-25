import axios from "axios";

interface IGetItems {
  search: string;
  page: number;
}

// 검색어로 검색
export async function getItems({ search, page }: IGetItems) {
  try {
    const res = await axios.get(
      `/blueprint?s=${search}&page=${page}&size=${8}`
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
  category: string;
  page: number;
}

//카테고리별 음식 조회
export async function getCategoryItems({ category, page }: IGetCategoryItems) {
  try {
    const res = await axios.get(
      `/blueprint/c?category=${category}&page=${page}&size=${8}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getDetailItem(id: number) {
  try {
    const res = await axios.get(`/food/${id}`);
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
