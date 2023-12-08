import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrderAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { useEffect } from "react";

const UserOrders = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);
  console.log(orders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrderAsync(user.id));
  }, [dispatch, user]);

  return (
    <div>
      <div>
        {orders?.map((order) => (
          <div key={order.id}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <h1 className="text-3xl p-5 font-medium text-gray-900">
                  Order #{order.id}
                </h1>
                <h3 className="text-sm px-5 capitalize font-medium text-orange-600">
                  Order status: {order.status}
                </h3>
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-5">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {order?.items?.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item?.thumbnail}
                                // alt={item.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.href}>{item?.name}</a>
                                  </h3>
                                  <p className="ml-4">${item?.price}</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                  {item.color}
                                </p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="Quantity"
                                    className="text-sm mr-3 font-medium leading-6 text-gray-900"
                                  >
                                    Qty {item.quantity}
                                  </label>
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
                    <p>${order.totalAmount}</p>
                  </div>
                  <div className="flex my-2 justify-between text-base font-medium text-gray-900">
                    <p>Total items</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>

                  <ul role="list" className="divide-y divide-gray-100 my-5">
                    <li className="flex justify-between gap-x-6 py-5  p-5">
                      <div className="flex min-w-0 gap-x-4 items-center">
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {order.selectedAddress.firstName}{" "}
                            {order.selectedAddress.lastName}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {order.selectedAddress.city}
                          </p>
                          <p className="text-xs leading-6 text-gray-900">
                            {order.selectedAddress.state}
                          </p>
                          <p className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500">
                            {order.selectedAddress.pinCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          {order.selectedAddress.number}
                        </p>
                        <p className="text-sm font-bold leading-6 text-gray-900">
                          {order.selectedAddress.country}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {order.selectedAddress.street}
                        </p>
                      </div>
                    </li>
                  </ul>

                  {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
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
                </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;
