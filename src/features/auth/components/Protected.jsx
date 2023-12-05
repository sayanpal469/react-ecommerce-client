import { useSelector } from "react-redux";
import { selectedLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Protected = ({ children }) => {
  const user = useSelector(selectedLoggedInUser);

  if (!user) {
    return <Navigate to="/login" replace={true}/>
  }
  return children;
};

export default Protected;
