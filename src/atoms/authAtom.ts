import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
  },
});

interface OrderListProps {
  customerEmail: string;
  customerName: string;
  customerMobilePhone: string;
  bluePrintNames: string[];
  totalAmount: number;
}

export const payItems = atom<OrderListProps>({
  key: "payItems",
  default: {
    customerEmail: "example@example.com",
    customerName: "엄준식",
    customerMobilePhone: "01000000000",
    bluePrintNames: [],
    totalAmount: 0,
  },
});
