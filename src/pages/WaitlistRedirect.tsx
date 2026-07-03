import { Navigate } from "react-router-dom";

export default function WaitlistRedirect() {
  return <Navigate to="/early-access" replace />;
}
