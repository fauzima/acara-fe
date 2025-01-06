"use client";

import { LoginSchema } from "@/libs/yupSchemas";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/context/useSession";
import Input from "@/components/input";
import Button from "@/components/button";
import { toastErr } from "@/helpers/toast";
import afterAuthGuard from "@/hoc/afterAuthGuard";

interface FormValues {
  data: string;
  password: string;
}

function Login() {
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_FE!}/api/auth/user/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        },
      );
      const result = await res.json();
      if (!res.ok) throw result;
      localStorage.setItem("token", result.token);
      setIsAuth(true);
      setAcc(result.user);
      router.push("/");
      toast.success(result.message);
    } catch (err) {
      console.error(err);
      toastErr(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-xl items-center p-[20vh] px-4 md:px-8">
      <div className="flex w-full flex-col gap-5">
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-1 w-full disabled:cursor-not-allowed"
                >
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

export default afterAuthGuard(Login);
