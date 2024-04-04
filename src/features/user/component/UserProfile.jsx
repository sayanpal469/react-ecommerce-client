import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useForm } from "react-hook-form";
import { useState } from "react";

const UserProfile = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);

  const handelEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handelRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handelEditForm = (index) => {
    setSelectedEditIndex(index);
    const address = userInfo.addresses[index];
    setValue("firstName", address.firstName);
    setValue("lastName", address.lastName);
    setValue("email", address.email);
    setValue("number", address.number);
    setValue("country", address.country);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pinCode", address.pinCode);
  };

  const handelAdd = (address) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddressForm(false);
  };

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex h-full flex-col bg-white shadow-xl p-5">
          <h3 className="text-sm px-5 font-medium">Email: {userInfo.email}</h3>
          {userInfo.role === "admin" && (
            <h3 className="text-sm px-5 capitalize font-medium">
              Role: {userInfo.role}
            </h3>
          )}

          <div className="px-4 py-6 sm:px-6">
            <p className="mt-0.5 text-sm text-gray-500">Your addresses</p>
            <button
              onClick={() => {
                setShowAddressForm(true);
              }}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5"
            >
              Add New Address
            </button>
            {showAddressForm ? (
              <form
                action=""
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  handelAdd(data);
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
                        onClick={() => setShowAddressForm(false)}
                        type="button"
                        className="text-sm font-semibold leading-6 text-red-600"
                      >
                        Cancel
                      </button>
                      <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add address
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : null}
            <div role="list" className="divide-y divide-gray-100 my-5">
              {userInfo.addresses.map((address, index) => (
                <div key={index}>
                  {/* form */}
                  <div className="lg:col-span-3 bg-white p-5">
                    {selectedEditIndex === index ? (
                      <form
                        action=""
                        onSubmit={handleSubmit((data) => {
                          console.log(data);
                          handelEdit(data, index);
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
                                Use a permanent address where you can receive
                                mail.
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
                                onClick={() => setSelectedEditIndex(-1)}
                                type="button"
                                className="text-sm font-semibold leading-6 text-red-600"
                              >
                                Cancel
                              </button>
                              <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Add address
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    ) : null}
                  </div>

                  <div
                    key={address.id}
                    className="flex justify-between gap-x-6 py-5 p-5 my-5 shadow-md hover:shadow-2xl"
                  >
                    <div className="flex min-w-0 gap-x-4 items-center">
                      {/* <h1 className="text-3xl p-5 font-medium text-gray-900">
                      {address.firstName} {address.lastName}
                    </h1> */}
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.firstName} {address.lastName}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.city}
                        </p>
                        <p className="text-xs leading-6 text-gray-900">
                          {address.state}
                        </p>
                        <p className="mt-1 truncate text-xs font-semibold leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {address.number}
                      </p>
                      <p className="text-sm font-bold leading-6 text-gray-900">
                        {address.country}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {address.street}
                      </p>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <button
                        onClick={() => handelEditForm(index)}
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e, index) => handelRemove(e, index)}
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
