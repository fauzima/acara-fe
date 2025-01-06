"use client";

import { PromotorRegisterSchema } from "@/libs/yupSchemas";
import { Form, Formik, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import Input from "@/components/input";
import InputName from "@/components/inputName";
import Button from "@/components/button";
import afterAuthGuard from "@/hoc/afterAuthGuard";
import { toastErr } from "@/helpers/toast";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const initialValue: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const handleAdd = async (promotor: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/auth/promotor`,
        {
          method: "POST",
          body: JSON.stringify(promotor),
          headers: { "Content-Type": "application/json" },
        },
      );
      const result = await res.json();
      if (!res.ok) throw result;
      router.push("/");
      toast.success(result.message);
      console.log(result);
    } catch (error) {
      console.log(error);
      toastErr(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col p-20 px-4 md:px-8 lg:flex-row">
      <div className="my-6 place-content-center text-center text-4xl font-semibold leading-tight md:text-5xl lg:my-0 lg:block lg:w-1/2 lg:text-left lg:text-7xl">
        <span>Manajemen acara tidak pernah semudah di </span>
        <span className="max-w-fit bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-bold tracking-wide text-transparent">
          acara.com
        </span>
        <span>.</span>
      </div>
      <div className="mt-4 flex h-fit w-full flex-col items-center lg:mt-[8vh] lg:h-[542px] lg:w-1/2 lg:p-0 lg:pt-[8vh] 2xl:items-end">
        <Formik
          initialValues={initialValue}
          validationSchema={PromotorRegisterSchema}
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-1 w-full disabled:cursor-not-allowed"
                >
                  <Button
                    text={isLoading ? "Memuat..." : "Daftar"}
                    style="w-full bg-blue-500/50"
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

export default afterAuthGuard(Register);
