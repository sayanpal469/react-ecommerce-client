import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import {
  deleteCartItemAsync,
  selectItems,
  updateCartAsync,
} from "../features/cart/cartSlice";
import { useForm } from "react-hook-form";
import { updateUserAsync } from "../features/auth/authSlice";
import { useState } from "react";
import {
  createOrderAsync,
  selectCurrentOrder,
} from "../features/order/orderSlice";
import { selectUserInfo } from "../features/user/userSlice";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const items = useSelector(selectItems);
  const user = useSelector(selectUserInfo);
  const currentOrder = useSelector(selectCurrentOrder);

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

  const handelAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handelPayment = (e) => {
    console.log(e.target.value);
    setPaymentMethod(e.target.value);
  };

  const handelOrder = () => {
    const order = {
      items,
      totalAmount,
      totalItems,
      user,
      selectedAddress,
      paymentMethod,
      status: "pending",
    };
    dispatch(createOrderAsync(order));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true} />}
      {currentOrder && (
        <Navigate to={`/order-success/${currentOrder.id}`} replace={true} />
      )}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-5">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3 bg-white p-5">
            <form
              action=""
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
              })}
            >
              <div className="space-y-12">
                <div>
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          First name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("firstName", {
                              required: "First name is required",
                            })}
                            id="firstName"
                            autoComplete="given-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.firstName && (
                            <p className="text-red-500">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="lastName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Last name
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("lastName", {
                              required: "Last name is required",
                            })}
                            id="lastName"
                            autoComplete="family-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.lastName && (
                            <p className="text-red-500">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", {
                              required: "email name is required",
                            })}
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-3">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Phone number
                        </label>
                        <div className="mt-2">
                          <input
                            id="number"
                            {...register("number", {
                              required: "Phone number is required",
                            })}
                            type="tel"
                            autoComplete="number"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.number && (
                            <p className="text-red-500">
                              {errors.number.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Country
                        </label>
                        <div className="mt-2">
                          <select
                            id="country"
                            {...register("country", {
                              required: "Country name is required",
                            })}
                            autoComplete="country-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                          >
                            <option>India</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                          </select>
                          {errors.country && (
                            <p className="text-red-500">
                              {errors.country.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label
                          htmlFor="street"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("street", {
                              required: "Street is required",
                            })}
                            id="street"
                            autoComplete="street-address"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.street && (
                            <p className="text-red-500">
                              {errors.street.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("city", {
                              required: "City is required",
                            })}
                            id="city"
                            autoComplete="address-level2"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="state"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("state", {
                              required: "State is required",
                            })}
                            id="state"
                            autoComplete="address-level1"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.state && (
                            <p className="text-red-500">
                              {errors.state.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label
                          htmlFor="pinCode"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            type="text"
                            {...register("pinCode", {
                              required: "Pin code is required",
                            })}
                            id="pinCode"
                            autoComplete="postal-code"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.pinCode && (
                            <p className="text-red-500">
                              {errors.pinCode.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="py-10 flex justify-end gap-x-6">
                    <button
                      type="button"
                      className="text-sm font-semibold leading-6 text-gray-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add address
                    </button>
                  </div>

                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                      Address
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose from existing addresses
                    </p>

                    <ul role="list" className="divide-y divide-gray-100 my-5">
                      {user.addresses.map((person, index) => (
                        <li
                          key={index}
                          className="flex justify-between gap-x-6 py-5 border p-5"
                        >
                          <div className="flex min-w-0 gap-x-4 items-center">
                            <input
                              onChange={handelAddress}
                              id="cash"
                              name="address"
                              type="radio"
                              value={index}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            {/* <img
                              className="h-12 w-12 flex-none rounded-full bg-gray-50"
                              src={person.imageUrl}
                              alt=""
                            /> */}
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {person.firstName} {person.lastName}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.city}
                              </p>
                              <p className="text-xs leading-6 text-gray-900">
                                {person.state}
                              </p>
                              <p className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500">
                                {person.pinCode}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {person.number}
                            </p>
                            <p className="text-sm font-bold leading-6 text-gray-900">
                              {person.country}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {person.street}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment method
                        </legend>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Choose one
                        </p>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handelPayment}
                              id="cash"
                              name="payments"
                              type="radio"
                              value="cash"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-everything"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              onChange={handelPayment}
                              id="card"
                              name="payments"
                              type="radio"
                              value="card"
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="push-email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card Payment
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Check out shopping cart area */}

          <div className="lg:col-span-2">
            <div className="mx-auto max-w-7xl sm:px-0 lg:px-0 mt-10">
              <div className="flex h-full flex-col bg-white shadow-xl">
                <h1 className="text-3xl p-5 font-medium text-gray-900">
                  Shopping cart
                </h1>
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-5">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item?.product.thumbnail}
                                // alt={item.imageAlt}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.href}>{item?.product.name}</a>
                                  </h3>
                                  <p className="ml-4">${item?.product.price}</p>
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
                                    Qty
                                  </label>
                                  <select
                                    onChange={(e) => handleQuantity(e, item)}
                                    value={item.quantity}
                                  >
                                    {[1, 2, 3, 4, 5].map((value) => (
                                      <option key={value} value={value}>
                                        {value}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={() =>
                                      handelDeleteFromCart(item.id)
                                    }
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
                    <div
                      onClick={handelOrder}
                      className="flex items-center cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order Now
                    </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
