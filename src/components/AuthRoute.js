//封装高阶逻辑
//无token跳转login
import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

export function AuthRoute ({ children }) {
  const token = getToken()
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to={'/login'} replace />
  }
}