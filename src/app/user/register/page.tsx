"use client";

import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password does not match!")
    .required("Confirm password is required"),
  inputRef: Yup.string()
    .matches(/^[A-Z0-9]+$/, "Must be alphanumeric with capital letters")
    .min(7, "refCode must be seven characters")
    .max(7, "refCode must be seven characters")
    .nullable()
    .default(null),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  inputRef: string | null;
}

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    inputRef: "",
  };
  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/user", {
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
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="w-full max-w-md p-10">
        <div className="flex flex-col items-center">
          <Image
            src="https://tiketevent.com/assets/admin/img/te-dark.png"
            alt="Logo"
            width={240}
            height={150}
          />
          <h1 className="mt-4 text-xl font-bold text-gray-700">
            Buat akun untuk Membeli tiket
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
                  <label htmlFor="name" className="block text-gray-600">
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your name"
                  />
                  {touched.name && errors.name && (
                    <div className="text-sm text-red-500">{errors.name}</div>
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
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <div className="text-sm text-red-500">{errors.email}</div>
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
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-sm text-red-500">
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
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Confirm your password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="text-sm text-red-500">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <label htmlFor="inputRef" className="block text-gray-600">
                    Referral Code
                  </label>
                  <Field
                    type="text"
                    name="inputRef"
                    onChange={handleChange}
                    value={values.inputRef}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your referral code"
                  />
                  {touched.inputRef && errors.inputRef && (
                    <div className="text-sm text-red-500">
                      {errors.inputRef}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-12 w-full rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
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
