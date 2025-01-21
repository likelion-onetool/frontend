import { useEffect, useState } from "react";
import { onSilentRefresh } from "./utils/api";
import { RouterProvider, useNavigate } from "react-router-dom";
import router from "./Route";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "./atoms/authAtom";

function App() {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onSilentRefresh(setAuth).finally(() => setLoading(false));
  }, [setAuth]);

  if (loading) return <div></div>; // 로딩 중일 때 로딩 화면을 보여줌

  return <RouterProvider router={router} />;
}

export default App;
