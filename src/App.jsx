import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import ProductDetails from "./features/product-list/components/ProductDetails";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { selectedLoggedInUser } from "./features/auth/authSlice";
// import { selectTotalItems } from "./features/product-list/productListSlice";
import PageNotFound from "./pages/PageNotFound";
import OrderSuccess from "./pages/OrderSuccess";
import UserOrderPage from "./pages/UserOrderPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import LogOut from "./features/auth/components/LogOut";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { Navigate } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Home />
        </Protected>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedAdmin>
          <AdminHome />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/signup",
      element: <SignUpPage />,
    },
    {
      path: "/cart",
      element: (
        <Protected>
          <CartPage />
        </Protected>
      ),
    },
    {
      path: "/checkout",
      element: (
        <Protected>
          <CheckOut />
        </Protected>
      ),
    },
    {
      path: "/product-details/:id",
      element: (
        <Protected>
          <ProductDetails />
        </Protected>
      ),
    },
    {
      path: "/admin/product-details/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductDetailsPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product-form/",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/product-form/edit/:id",
      element: (
        <ProtectedAdmin>
          <AdminProductFormPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/admin/orders",
      element: (
        <ProtectedAdmin>
          <AdminOrdersPage />
        </ProtectedAdmin>
      ),
    },
    {
      path: "/order-success/:id",
      element: (
        <Protected>
          <OrderSuccess />
        </Protected>
      ),
    },
    {
      path: "/orders",
      element: (
        <Protected>
          <UserOrderPage />
        </Protected>
      ),
    },
    {
      path: "/profile",
      element: (
        <Protected>
          <UserProfilePage />
        </Protected>
      ),
    },
    {
      path: "/logout",
      element: <LogOut />,
    },
    {
      path: "/forgotPassword",
      element: <ForgotPasswordPage />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  const dispatch = useDispatch();
  const user = useSelector(selectedLoggedInUser);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
      if (user.role == "admin") {
        <Navigate to="/admin" replace={true} />;
      } else {
        <Navigate to="/" replace={true} />;
      }
    }
  }, [dispatch, user]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
