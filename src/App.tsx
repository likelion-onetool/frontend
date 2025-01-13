import { useEffect } from "react";
import { onSilentRefresh } from "./utils/api";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./Route";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/authAtom";

function App() {
  const [auth, setAuth] = useRecoilState(authState);

  useEffect(() => {
    onSilentRefresh(setAuth); // ✅ 앱 실행 시 토큰 갱신
  }, [setAuth]);

  return <RouterProvider router={router} />;
}

export default App;
