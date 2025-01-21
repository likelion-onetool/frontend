import { createBrowserRouter, Navigate, useNavigate } from "react-router-dom";
import ListedItems from "./pages/products/ListedItems";
import DetailedItem from "./pages/products/DetailedItem";
import Login from "./pages/user/Login";
import ShoppingCart from "./pages/pay/ShoppingCart";
import Payment from "./pages/pay/Payment";
import FindUserPassword from "./pages/user/FindUserPassword";
import FindUserId from "./pages/user/FindUserId";
import FAQ from "./pages/faq/FAQ";
import FAQDetail from "./pages/faq/FAQDetail";
import CenterLayout from "./components/CenterLayout";
import WriteFAQ from "./pages/faq/WriteFAQ";
import PaymentSuccess from "./pages/pay/PaymentSuccess";
import Join from "./pages/user/Join";
import Profile from "./pages/user/Profile";
import ErrorComponent from "./components/ErrorComponent";
import MainPage from "./pages/home/MainPage";

import { useRecoilState } from "recoil";
import { authState } from "./atoms/authAtom";
import { TestPayment } from "./pages/pay/TestPayment";
import PaymentLoading from "./pages/pay/PaymentLoading";
import PaymentFail from "./pages/pay/PaymentFail";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [auth, setAuth] = useRecoilState(authState);

  if (!auth.isAuthenticated) {
    return <Navigate to="/users/login" />;
  }

  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/items/category/:id",
    element: <ListedItems />,
  },
  {
    path: "/items",
    element: <ListedItems />,
  },
  {
    path: "/items/:id",
    element: <DetailedItem />,
  },
  // home, products page

  {
    path: "/users",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <ErrorComponent />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "find/id",
        element: <FindUserId />,
      },
      {
        path: "find/password",
        element: <FindUserPassword />,
      },
      {
        path: "join",
        element: <Join />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // user page

  {
    path: "/cart",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: (
          <ProtectedRoute>
            <ShoppingCart />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/payment",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <Payment />,
      },
      {
        path: "loading",
        element: <PaymentLoading />,
      },
      {
        path: "success",
        element: <PaymentSuccess />,
      },
      {
        path: "fail",
        element: <PaymentFail />,
      },
      {
        path: "test",
        element: <TestPayment />,
      },
    ],
  },

  //pay page

  {
    path: "/faq",
    element: <CenterLayout />,
    children: [
      {
        path: "",
        element: <FAQ />,
      },
      {
        path: "write",
        element: <WriteFAQ />,
      },
      {
        path: ":id",
        element: <FAQDetail />,
      },
    ],
  },
  //faq page
]);

export default router;
