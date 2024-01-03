import { useSelector } from "react-redux";
import { selectedLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectedLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true}/>
  }

  if (!user && user.role !== 'admin') {
    return <Navigate to="/admin" replace={true}/>
  }
  return children;
};

export default ProtectedAdmin;
