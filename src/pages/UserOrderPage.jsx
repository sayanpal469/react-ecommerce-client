import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import UserOrders from "../features/user/component/UserOrders";

const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="text-xl font-semibold text-orange-500"><Link to='/'>Home</Link> {`>`} My Orders</h1>
        <UserOrders />
      </Navbar>
    </div>
  );
};

export default UserOrderPage;
