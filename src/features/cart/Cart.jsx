import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { deleteCartItemAsync, selectItems, updateCartAsync } from "./cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const totalAmount = items.reduce(
    (amount, item) =>
      item && item.quantity ? item.product.price * item.quantity + amount : amount,
    0
  );

  const totalItems = items.reduce(
    (total, item) => (item && item.quantity ? item.quantity + total : total),
    0
  );

  const handleQuantity = (e, item) => {
    const value = Number(e.target.value);
    // const newQuantity = item.quantity + value;

    dispatch(updateCartAsync({ id: item.id, quantity: +value }));
  };

  const handelDeleteFromCart = (itemId) => {
    // console.log(itemId);
    dispatch(deleteCartItemAsync(itemId));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true} />}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex h-full flex-col bg-white shadow-xl">
          <h1 className="text-3xl p-5 font-medium text-gray-900">
            Shopping cart
          </h1>
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
            <div className="mt-5">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item?.product?.thumbnail}
                          // alt={item.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              {/* <a href={item.href}>{item?.name}</a> */}
                            </h3>
                            <p className="ml-4">${item?.product.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.color}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="text-gray-500">
                            <label
                              htmlFor="Quantity"
                              className="text-sm mr-3 font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select onChange={(e) => handleQuantity(e, item)} value={item.quantity}>
                              {[1, 2, 3, 4, 5].map((value) => (
                                <option key={value} value={value}>
                                  {value}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              onClick={() => handelDeleteFromCart(item._id)}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex my-2 justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${totalAmount}</p>
            </div>
            <div className="flex my-2 justify-between text-base font-medium text-gray-900">
              <p>Total items</p>
              <p>{totalItems} items</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link
                  to="/"
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
