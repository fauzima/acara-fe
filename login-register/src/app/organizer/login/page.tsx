"use client";

import * as Yup from "yup";
import { Formik, Form, Field, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/useSession";
import Image from "next/image";

const LoginSchema = Yup.object().shape({
  data: Yup.string().required("Username or Email is required"),
  password: Yup.string()
    .min(3, "password must be 3 characters at minimum")
    .required("password is required"),
});

interface FormValues {
  data: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setIsAuth, setUser } = useSession();

  const initialValue: FormValues = {
    data: "",
    password: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/promotor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      router.push("/");
      setIsAuth(true);
      setUser(result.user);
      toast.success(result.message);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <Image
            src="https://tiketevent.com/assets/admin/img/te-dark.png"
            alt="Logo"
            width={240}
            height={150}
          />
          <h1 className="text-xl font-bold text-gray-700 mt-4">
            Masuk untuk membuat event
          </h1>
        </div>
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            handleAdd(values);
            actions.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            const { handleChange, values, touched, errors } = props;
            return (
              <Form className="w-full max-w-md flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="data"
                    className="block text-sm font-medium text-gray-700 pt-5"
                  >
                    Username or Email
                  </label>
                  <Field
                    id="data"
                    name="data"
                    type="text"
                    onChange={handleChange}
                    value={values.data}
                    className="mt-1 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your Username or Email"
                  />
                  {touched.data && errors.data && (
                    <p className="text-red-500 text-xs mt-1">{errors.data}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={values.password}
                    className="mt-1 w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg transition-all duration-300"
                >
                  {isLoading ? "Loading ..." : "Login"}
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}