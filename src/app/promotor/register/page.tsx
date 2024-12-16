"use client";

import { Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import Input from "@/components/auth/input";
import InputName from "@/components/auth/inputName";
import Button from "@/components/button";

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .lowercase()
    .required("Nama akun diperlukan!")
    .matches(
      /^[a-z0-9]+$/,
      "Nama akun hanya boleh terdiri dari karakter huruf kecil dan angka!",
    )
    .max(16, "Nama akun maksimal terdiri dari 16 karakter!"),
  email: Yup.string()
    .email("Format alamat email salah!")
    .required("Alamat email diperlukan!"),
  password: Yup.string()
    .min(3, "Kata sandi minimal harus terdiri dari 3 karakter!")
    .required("Kata sandi diperlukan!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Kata sandi tidak cocok!")
    .required("Konfirmasikan kata sandi!"),
});

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleAdd = async (promotor: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/promotor", {
        method: "POST",
        body: JSON.stringify(promotor),
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      console.log(result);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col p-20 px-4 md:px-8 lg:h-[calc(100vh-168px)] lg:flex-row">
      <div className="my-6 place-content-center text-center text-4xl font-semibold leading-tight md:text-5xl lg:my-0 lg:block lg:w-1/2 lg:text-left lg:text-7xl">
        <span>Manajemen acara tidak pernah semudah di </span>
        <span className="max-w-fit bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-medium tracking-wide text-transparent">
          acara.com
        </span>
        <span>.</span>
      </div>
      <div className="flex h-fit w-full flex-col items-center rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-6 py-8 sm:bg-none lg:h-auto lg:w-1/2 lg:place-content-center lg:p-0 2xl:items-end">
        <Formik
          initialValues={initialValue}
          validationSchema={RegisterSchema}
          onSubmit={(values, action) => {
            handleAdd(values);
            action.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form className="flex w-full max-w-md flex-col">
                <p className="mb-5 text-center text-xl font-bold">
                  Daftar sekarang sebagai Promotor!
                </p>
                <InputName
                  formik={props}
                  id="name"
                  name="name"
                  placeholder="Nama akun"
                />
                <Input
                  formik={props}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Alamat email"
                />
                <Input
                  formik={props}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Kata sandi"
                />
                <Input
                  formik={props}
                  id="password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Konfirmasi kata sandi"
                />
                <button type="submit" disabled={isLoading} className="w-full">
                  <Button
                    text={isLoading ? "Memuat..." : "Daftar"}
                    width="100%"
                    background="blue-500/50"
                  />
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
