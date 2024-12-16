"use client";

import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/useSession";
import Input from "@/components/auth/input";
import Button from "@/components/button";

const LoginSchema = Yup.object().shape({
  data: Yup.string()
    .lowercase()
    .required("Nama akun atau alamat email diperlukan!"),
  password: Yup.string()
    .min(3, "Kata sandi minimal harus terdiri dari 3 karakter!")
    .required("Kata sandi diperlukan!"),
});

interface FormValues {
  data: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setIsAuth, setAcc } = useSession();

  const initialValue: FormValues = {
    data: "",
    password: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        credentials: "include",
      });
      const result = await res.json();
      if (!res.ok) throw result;
      setIsAuth(true);
      setAcc(result.user);
      router.push("/");
      toast.success(result.message);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-xl items-center p-20 px-4 md:px-8">
      <div className="flex w-full flex-col gap-5 rounded-xl bg-gradient-to-tr from-cyan-200 to-blue-200 px-3 py-8 sm:bg-none md:p-0">
        <p className="text-center text-xl font-bold">Masuk ke akun Pembeli</p>
        <Formik
          initialValues={initialValue}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            handleAdd(values);
            actions.resetForm();
          }}
        >
          {(props: FormikProps<FormValues>) => {
            return (
              <Form className="mx-auto flex w-full max-w-md flex-col items-center">
                <Input
                  formik={props}
                  id="data"
                  name="data"
                  placeholder="Nama akun atau alamat email"
                />

                <Input
                  formik={props}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Kata sandi"
                />
                <button type="submit" disabled={isLoading} className="w-full">
                  <Button
                    text={isLoading ? "Memuat..." : "Masuk"}
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
