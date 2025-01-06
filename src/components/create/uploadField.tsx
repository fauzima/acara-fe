"use client";

import Image from "next/image";
import Upload from "../../../public/upload.png";
import { FormikProps } from "formik";
import React, { useRef, useState } from "react";
import { LuImageUp } from "react-icons/lu";

interface UploadFieldProps {
  name: string;
  formik: FormikProps<any>;
}

const UploadField: React.FC<UploadFieldProps> = ({ name, formik }) => {
  const imgRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      formik.setFieldValue(name, file);
    }
  };
  return (
    <div className="flex w-full hover:cursor-pointer">
      <input
        id="name"
        type="file"
        name={name}
        className="hidden"
        ref={imgRef}
        onChange={handleChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />
      {!previewUrl ? (
        <div
          onClick={() => imgRef.current?.click()}
          className="flex aspect-[3/2] w-full border-b border-blue-300 bg-blue-300/25 p-1 transition-colors hover:bg-blue-300/50 sm:rounded-t-lg sm:p-3 lg:aspect-[2/1]"
        >
          <div className="group flex size-full flex-col place-content-center items-center border-4 border-dashed border-blue-600/50 px-2 text-center text-xs text-blue-800 transition-opacity hover:border-blue-600/50 sm:text-sm">
            <Image
              className="mb-4 hidden size-[200px] opacity-65 transition-opacity group-hover:opacity-100 sm:block md:size-[256px]"
              src={Upload}
              alt="Upload"
            />
            <LuImageUp className="mb-2 size-16 sm:hidden" />
            <p className="mb-2 text-lg font-semibold sm:mb-4 sm:text-xl">
              Klik di sini untuk unggah gambar/poster/banner
            </p>
            <div className="mb-1 italic">
              <span>(gambar disarankan berukuran </span>
              <span className="font-bold">724×340 pixel </span>
              <span>dan kurang dari </span>
              <span className="font-bold">2 MB</span>
            </div>
            <div className="italic">
              <span>format gambar yang didukung: </span>
              <span className="font-bold">.jpeg, .png, .jpg dan .webp</span>
              <span>).</span>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => imgRef.current?.click()}
          className="flex w-full flex-col gap-3 border-b border-blue-300 bg-blue-300/25 pb-3 text-center text-blue-800 transition-colors hover:bg-blue-300/50 sm:rounded-t-lg"
        >
          <div className="flex aspect-[2.13/1] w-full overflow-hidden sm:rounded-t-lg">
            <Image
              className="size-full object-cover"
              src={previewUrl}
              alt="preview"
              width={500}
              height={500}
              layout="responsive"
              objectFit="cover"
            />
          </div>
          <p className="px-2 text-xs font-bold italic sm:text-sm">
            (Pratinjau gambar. Klik kembali untuk unggah kembali/mengubah
            gambar).
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadField;
