"use client";

import promGuard from "@/hoc/PromGuard";
import { MdCreate } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toastErr } from "@/helpers/toast";
import { toast } from "react-toastify";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikProps,
} from "formik";
import { CreateEventSchema } from "@/libs/yupSchemas";
import UploadField from "@/components/create/uploadField";
import Button from "@/components/button";

interface TicketValues {
  ticketCategory: string;
  ticketDesc: string;
  seats: string;
  price: string;
  startDate: string;
  endDate: string;
}

interface FormValues {
  title: string;
  desc: string;
  category: string;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  thumbnail?: File | null;
  Ticket: TicketValues[];
}

const base_url = process.env.NEXT_PUBLIC_BASE_URL_FE!;

function CreateEvent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialValue: FormValues = {
    title: "",
    desc: "",
    category: "",
    location: "",
    venue: "",
    startDate: "",
    endDate: "",
    thumbnail: null,
    Ticket: [
      {
        ticketCategory: "",
        ticketDesc: "",
        seats: "",
        price: "",
        startDate: "",
        endDate: "",
      },
    ],
  };
  const router = useRouter();

  const onCreate = async (data: FormValues) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      for (const key in data) {
        if (key !== "Ticket") {
          const item: any = data[key as keyof FormValues];
          if (item) {
            formData.append(key, item);
          }
        } else {
          const item: any = data[key as keyof FormValues];
          if (item) {
            formData.append(key, JSON.stringify(item));
          }
        }
      }
      const res = await fetch(`${base_url}/api/events/create`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      router.push("/promotor/dashboard");
    } catch (err) {
      console.error(err);
      toastErr(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-screen-lg flex-col gap-6 py-20">
      <div className="mt-4 flex w-full place-content-center items-center gap-4 px-4 text-3xl font-bold sm:place-content-start md:px-8">
        <MdCreate className="text-cyan-600" />
        <p className="max-w-fit bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-bold tracking-wide text-transparent">
          Buat Acara
        </p>
      </div>
      <Formik
        initialValues={initialValue}
        validationSchema={CreateEventSchema}
        onSubmit={(values, action) => {
          onCreate(values);
          action.resetForm();
        }}
      >
        {(props: FormikProps<FormValues>) => {
          const { handleChange, values, touched, errors } = props;
          return (
            <div className="w-full sm:px-4 md:px-8">
              <div className="w-full items-center bg-gradient-to-tl from-blue-600 via-cyan-500 to-blue-600 py-1 sm:rounded-xl sm:p-1">
                <Form className="flex size-full flex-col gap-4 bg-white/90 pb-8 sm:rounded-lg">
                  <div className="flex w-full flex-col gap-4">
                    <UploadField name="thumbnail" formik={props} />
                    {touched.thumbnail && errors.thumbnail && (
                      <p className="text-center text-sm text-rose-500">
                        {errors.thumbnail}
                      </p>
                    )}
                  </div>
                  <div className="flex w-full flex-col gap-6 px-4 sm:px-8">
                    <div className="flex w-full flex-col gap-1">
                      <Field
                        name="title"
                        onChange={handleChange}
                        value={values.title}
                        placeholder="Nama Acara"
                        className="w-full border-b-2 border-neutral-600 bg-transparent py-1 text-2xl font-bold sm:text-4xl"
                      />
                      {touched.title && errors.title && (
                        <p className="text-sm text-rose-500">{errors.title}</p>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <div className="flex w-full flex-col gap-1">
                        <label className="font-semibold" htmlFor="category">
                          Kategori
                        </label>
                        <Field
                          name="category"
                          component="select"
                          onChange={handleChange}
                          value={values.category}
                          className="w-full border-b-2 border-neutral-600 bg-transparent py-1"
                        >
                          <option value="">Pilih kategori</option>
                          <option value="Konser">Konser</option>
                          <option value="Festival">Festival</option>
                          <option value="Pertandingan">Pertandingan</option>
                          <option value="Pameran">Pameran</option>
                          <option value="Konferensi">Konferensi</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Seminar">Seminar</option>
                          <option value="Pelatihan">Pelatihan</option>
                          <option value="Sertifikasi">Sertifikasi</option>
                        </Field>
                        {touched.category && errors.category && (
                          <p className="text-sm text-rose-500">
                            {errors.category}
                          </p>
                        )}
                      </div>
                      <div className="flex w-full flex-col gap-1">
                        <label className="font-semibold" htmlFor="location">
                          Kota
                        </label>
                        <Field
                          name="location"
                          component="select"
                          onChange={handleChange}
                          value={values.location}
                          className="w-full border-b-2 border-neutral-600 bg-transparent py-1"
                        >
                          <option value="">Pilih kota</option>
                          <option value="Jakarta">Jakarta</option>
                          <option value="Bandung">Bandung</option>
                          <option value="Yogyakarta">Yogyakarta</option>
                          <option value="Surabaya">Surabaya</option>
                          <option value="Solo">Solo</option>
                          <option value="Medan">Medan</option>
                          <option value="Bali">Bali</option>
                        </Field>
                        {touched.location && errors.location && (
                          <p className="text-sm text-rose-500">
                            {errors.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                      <label className="font-semibold" htmlFor="venue">
                        Alamat lokasi
                      </label>
                      <Field
                        as="textarea"
                        name="venue"
                        onChange={handleChange}
                        value={values.venue}
                        placeholder="Alamat lokasi"
                        className="w-full rounded-lg rounded-br-sm rounded-tl-sm border-2 border-neutral-600 bg-transparent px-2 py-1"
                      />
                      {touched.venue && errors.venue && (
                        <p className="text-sm text-rose-500">{errors.venue}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
                      <div className="flex w-full flex-col gap-1">
                        <label className="font-semibold" htmlFor="startDate">
                          Tanggal mulai Acara
                        </label>
                        <Field
                          type="datetime-local"
                          name="startDate"
                          onChange={handleChange}
                          value={values.startDate}
                          className="w-full border-b-2 border-neutral-600 bg-transparent py-1"
                        />
                        {touched.startDate && errors.startDate && (
                          <p className="text-sm text-rose-500">
                            {errors.startDate}
                          </p>
                        )}
                      </div>
                      <div className="flex w-full flex-col gap-1">
                        <label className="font-semibold" htmlFor="endDate">
                          Tanggal selesai Acara
                        </label>
                        <Field
                          type="datetime-local"
                          name="endDate"
                          onChange={handleChange}
                          value={values.endDate}
                          className="w-full border-b-2 border-neutral-600 bg-transparent py-1"
                        />
                        {touched.endDate && errors.endDate && (
                          <p className="text-sm text-rose-500">
                            {errors.endDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                      <label className="font-semibold" htmlFor="desc">
                        Deskripsi Acara
                      </label>
                      <Field
                        as="textarea"
                        name="desc"
                        onChange={handleChange}
                        value={values.desc}
                        placeholder="Deskripsi Acara"
                        className="w-full rounded-lg rounded-br-sm rounded-tl-sm border-2 border-neutral-600 bg-transparent px-2 py-1"
                      />
                      {touched.desc && errors.desc && (
                        <p className="text-sm text-rose-500">{errors.desc}</p>
                      )}
                    </div>
                    <div className="flex w-full flex-col gap-3">
                      <div className="flex w-full flex-col gap-1">
                        <div className="flex items-center gap-1">
                          <p className="text-2xl font-bold">Buat Tiket</p>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Atur pengkategorian, jumlah, harga, dan waktu
                          penjualan tiket (maksimal sepuluh kategori tiket).
                          Atur seluruh harga tiket menjadi 0 rupiah untuk
                          menetapkan menjadi Acara gratis!
                        </p>
                        <hr className="mt-2 border-b border-neutral-600" />
                        <p className="mt-1 text-lg font-semibold">
                          Jumlah kategori tiket = {values.Ticket.length}
                        </p>
                      </div>
                      <FieldArray name="Ticket">
                        {({ remove, push }) => (
                          <div>
                            {values.Ticket.length > 0 &&
                              values.Ticket.map((_, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                  <div className="group mb-6 flex w-full flex-col rounded-bl-xl rounded-tr-xl border-2 border-sky-500">
                                    <div className="flex items-center justify-between rounded-tr-lg border-b-2 border-sky-500 bg-sky-600/75 transition-colors group-hover:bg-sky-500/75">
                                      <p className="py-2 pl-4 text-lg font-semibold text-white">
                                        Kategori tiket #{idx + 1}
                                      </p>
                                      <button
                                        onClick={() => remove(idx)}
                                        className={`pr-1 ${values.Ticket.length == 1 ? "hidden" : "block"}`}
                                      >
                                        <div className="h- group relative items-center rounded-xl bg-rose-600 px-4 py-2 text-center text-sm font-bold backdrop-blur-sm">
                                          <div className="absolute left-0 top-0 z-[2] size-full rounded-xl bg-gradient-to-tr from-red-600 via-pink-500 to-red-600 opacity-0 transition-opacity hover:opacity-100"></div>
                                          <p className="pointer-events-none absolute left-0 top-0 z-[3] size-full px-4 py-2 text-white transition-colors">
                                            Hapus
                                          </p>
                                          Hapus
                                        </div>
                                      </button>
                                    </div>
                                    <div className="flex w-full flex-col gap-6 rounded-bl-xl bg-sky-100 px-4 py-4 transition-colors group-hover:bg-sky-50">
                                      <div className="flex w-full flex-col gap-1">
                                        <label
                                          className="font-semibold"
                                          htmlFor={`Ticket.${idx}.ticketCategory`}
                                        >
                                          Nama kategori tiket
                                        </label>
                                        <Field
                                          name={`Ticket.${idx}.ticketCategory`}
                                          onChange={handleChange}
                                          value={
                                            values.Ticket[idx].ticketCategory
                                          }
                                          placeholder="Nama kategori tiket"
                                          className="w-full border-b-2 border-sky-500 bg-transparent py-1"
                                        />
                                        <ErrorMessage
                                          name={`Ticket.${idx}.ticketCategory`}
                                          component="p"
                                          className="text-sm text-rose-500"
                                        />
                                      </div>
                                      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
                                        <div className="flex w-full flex-col gap-1">
                                          <label
                                            className="font-semibold"
                                            htmlFor={`Ticket.${idx}.startDate`}
                                          >
                                            Tanggal mulai penjualan
                                          </label>
                                          <Field
                                            type="datetime-local"
                                            name={`Ticket.${idx}.startDate`}
                                            onChange={handleChange}
                                            value={values.Ticket[idx].startDate}
                                            className="w-full border-b-2 border-sky-500 bg-transparent py-1"
                                          />
                                          <ErrorMessage
                                            name={`Ticket.${idx}.startDate`}
                                            component="p"
                                            className="text-sm text-rose-500"
                                          />
                                        </div>
                                        <div className="flex w-full flex-col gap-1">
                                          <label
                                            className="font-semibold"
                                            htmlFor={`Ticket.${idx}.endDate`}
                                          >
                                            Tanggal selesai penjualan
                                          </label>
                                          <Field
                                            type="datetime-local"
                                            name={`Ticket.${idx}.endDate`}
                                            onChange={handleChange}
                                            value={values.Ticket[idx].endDate}
                                            placeholder="Nama kategori tiket"
                                            className="w-full border-b-2 border-sky-500 bg-transparent py-1"
                                          />
                                          <ErrorMessage
                                            name={`Ticket.${idx}.endDate`}
                                            component="p"
                                            className="text-sm text-rose-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col gap-6 sm:flex-row sm:gap-4">
                                        <div className="flex w-full flex-col gap-1">
                                          <label
                                            className="font-semibold"
                                            htmlFor={`Ticket.${idx}.seats`}
                                          >
                                            Jumlah tiket
                                          </label>
                                          <Field
                                            type="number"
                                            name={`Ticket.${idx}.seats`}
                                            onChange={handleChange}
                                            value={values.Ticket[idx].seats}
                                            placeholder="Jumlah tiket"
                                            min="0"
                                            max="1000"
                                            className="w-full border-b-2 border-sky-500 bg-transparent py-1"
                                          />
                                          <ErrorMessage
                                            name={`Ticket.${idx}.seats`}
                                            component="p"
                                            className="text-sm text-rose-500"
                                          />
                                        </div>
                                        <div className="flex w-full flex-col gap-1">
                                          <label
                                            className="font-semibold"
                                            htmlFor={`Ticket.${idx}.price`}
                                          >
                                            Harga tiket
                                          </label>
                                          <div className="flex items-center gap-1 border-b-2 border-sky-500">
                                            <p>Rp.</p>
                                            <Field
                                              type="number"
                                              name={`Ticket.${idx}.price`}
                                              onChange={handleChange}
                                              value={values.Ticket[idx].price}
                                              min="0"
                                              max="100000000"
                                              className="w-full bg-transparent py-1"
                                            />
                                          </div>
                                          <ErrorMessage
                                            name={`Ticket.${idx}.price`}
                                            component="p"
                                            className="text-sm text-rose-500"
                                          />
                                        </div>
                                      </div>
                                      <div className="flex w-full flex-col gap-1">
                                        <label
                                          className="font-semibold"
                                          htmlFor={`Ticket.${idx}.ticketDesc`}
                                        >
                                          Deskripsi kategori tiket
                                        </label>
                                        <Field
                                          as="textarea"
                                          name={`Ticket.${idx}.ticketDesc`}
                                          onChange={handleChange}
                                          value={values.Ticket[idx].ticketDesc}
                                          placeholder="Deskripsi kategori tiket"
                                          className="w-full rounded-lg rounded-br-sm rounded-tl-sm border-2 border-sky-500 bg-transparent px-2 py-1"
                                        />
                                        <ErrorMessage
                                          name={`Ticket.${idx}.ticketDesc`}
                                          component="p"
                                          className="text-sm text-rose-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            <button
                              onClick={() =>
                                push({
                                  ticketCategory: "",
                                  ticketDesc: "",
                                  seats: "",
                                  price: "",
                                  startDate: "",
                                  endDate: "",
                                })
                              }
                              className={`${values.Ticket.length == 10 ? "hidden" : "block"} flex w-full place-content-center`}
                            >
                              <Button
                                text="Tambah kategori tiket"
                                style="bg-sky-500/50 sm:w-1/2"
                              />
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-4 w-full disabled:cursor-not-allowed"
                    >
                      <Button
                        text={isLoading ? "Memuat..." : "Simpan Acara"}
                        style="w-full bg-blue-500/50"
                      />
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default promGuard(CreateEvent);
