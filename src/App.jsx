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
import { selectTotalItems } from "./features/product-list/productListSlice";

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
  ]);

  const dispatch = useDispatch();
  const user = useSelector(selectedLoggedInUser);
  const items = useSelector(selectTotalItems)
  console.log(items)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
