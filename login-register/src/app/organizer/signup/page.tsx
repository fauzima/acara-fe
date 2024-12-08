"use client";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match!")
    .required("Confirm password is required"),
});

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth", {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] justify-center">
      <div className="hidden lg:block w-[50%] h-full" style={{ backgroundImage: 'url(https://ik.imagekit.io/tiketevent/banner-home/daftar-cr.png)', backgroundSize: 'cover' }}>
        {/* <Image
         className="hidden lg:flex "
          src="https://ik.imagekit.io/tiketevent/banner-home/daftar-cr.png"
          alt="gambar"
          width={300}
          height={300}
        /> */}
      </div>
      <div className="py-10 lg:px-36 lg:w-[50%]">
        <div className="flex flex-col items-center">
          <Image
            src="https://tiketevent.com/assets/admin/img/te-dark.png"
            alt="Logo"
            width={240}
            height={150}
          />
          <h1 className="text-xl font-bold text-gray-700 mt-4">
            Daftar untuk Membuat Event
          </h1>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            handleAdd(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form>
                <div className="mt-6">
                  <label htmlFor="username" className="block text-gray-600">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="username"
                    onChange={handleChange}
                    value={values.username}
                    className="mt-1 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                  {touched.username && errors.username && (
                    <div className="text-red-500 text-sm">
                      {errors.username}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    className="mt-1 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  )}
                </div>
                <div className="mt-4">
                  <label htmlFor="password" className="block text-gray-600">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={values.password}
                    className="mt-1 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-500 text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={values.confirmPassword}
                    className="mt-1 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Confirm your password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="text-red-500 text-sm">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-12 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  {isLoading ? "Loading..." : "Register"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
