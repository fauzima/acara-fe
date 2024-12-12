"use client";

import * as Yup from "yup";
import { Formik, Form, Field, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSessionProm } from "@/context/useSessionProm";

const LoginSchema = Yup.object().shape({
  data: Yup.string().required("name or Email is required"),
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
  const { setIsAuth, setProm } = useSessionProm();

  const initialValue: FormValues = {
    data: "",
    password: "",
  };

  const handleAdd = async (promotor: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/promotor/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promotor),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      router.push("/");
      setIsAuth(true);
      setProm(result.promotor);
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
      <div className="w-full max-w-md p-8">
        <div className="flex flex-col items-center">
          <Image
            src="https://tiketevent.com/assets/admin/img/te-dark.png"
            alt="Logo"
            width={240}
            height={150}
          />
          <h1 className="mt-4 text-xl font-bold text-gray-700">
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
              <Form className="flex w-full max-w-md flex-col gap-4">
                <div>
                  <label
                    htmlFor="data"
                    className="block pt-5 text-sm font-medium text-gray-700"
                  >
                    name or Email
                  </label>
                  <Field
                    id="data"
                    name="data"
                    type="text"
                    onChange={handleChange}
                    value={values.data}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your name or Email"
                  />
                  {touched.data && errors.data && (
                    <p className="mt-1 text-xs text-red-500">{errors.data}</p>
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
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your password"
                  />
                  {touched.password && errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:bg-blue-600"
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
