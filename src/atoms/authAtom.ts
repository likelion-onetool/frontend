import { atom } from "recoil";

export const authState = atom({
  key: "authState",
  default: {
    isAuthenticated: false,
  },
});

interface OrderListProps {
  customerBank: string;
  customerName: string;
  customerBankNumber: string;
  bluePrintNames: string[];
  totalAmount: number;
}

export const payItems = atom<OrderListProps>({
  key: "payItems",
  default: {
    customerBank: "example@example.com",
    customerName: "엄준식",
    customerBankNumber: "01000000000",
    bluePrintNames: [],
    totalAmount: 0,
  },
});
