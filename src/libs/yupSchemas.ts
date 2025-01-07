import * as Yup from "yup";

const minDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
const maxDate = new Date(new Date().getFullYear() + 2, 0);

const toIDstring = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const PromotorRegisterSchema = Yup.object().shape({
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
    .min(5, "Kata sandi minimal harus terdiri dari 5 karakter!")
    .required("Kata sandi diperlukan!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Kata sandi tidak cocok!")
    .required("Konfirmasikan kata sandi!"),
});

export const UserRegisterSchema = Yup.object().shape({
  name: Yup.string()
    .lowercase()
    .matches(
      /^[a-z0-9]+$/,
      "Nama akun hanya boleh terdiri dari karakter huruf kecil dan angka!",
    )
    .required("Nama akun diperlukan!")
    .max(16, "Nama akun maksimal terdiri dari 16 karakter!"),
  email: Yup.string()
    .email("Format alamat email salah!")
    .required("Alamat email diperlukan!"),
  password: Yup.string()
    .min(5, "Kata sandi minimal harus terdiri dari 5 karakter!")
    .required("Kata sandi diperlukan!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Kata sandi tidak cocok!")
    .required("Konfirmasikan kata sandi!"),
  inputRef: Yup.string()
    .uppercase()
    .matches(/^[A-Z0-9]+$/, "Kode harus berupa karakter alfanumerik!")
    .min(7, "Kode rujukan harus terdiri dari 7 karakter!")
    .max(7, "Kode rujukan harus terdiri dari 7 karakter!")
    .nullable()
    .default(null),
});

export const LoginSchema = Yup.object().shape({
  data: Yup.string()
    .lowercase()
    .required("Nama akun atau alamat email diperlukan!"),
  password: Yup.string()
    .min(5, "Kata sandi minimal harus terdiri dari 5 karakter!")
    .required("Kata sandi diperlukan!"),
});

export const CreateEventSchema = Yup.object().shape({
  title: Yup.string()
    .min(5, "Nama acara minimal terdiri dari 5 karakter!")
    .max(50, "Nama acara maksimal terdiri dari 50 karakter!")
    .required("Nama acara diperlukan!"),
  desc: Yup.string()
    .min(20, "Deskripsi acara minimal terdiri dari 20 karakter!")
    .required("Deskripsi acara diperlukan!"),
  category: Yup.string().required("Pilih salah satu kategori!"),
  location: Yup.string().required("Pilih salah satu kota!"),
  venue: Yup.string()
    .min(5, "Alamat lokasi minimal terdiri dari 5 karakter!")
    .max(100, "Alamat lokasi maksimal terdiri dari 100 karakter!")
    .required("Alamat lokasi acara diperlukan!"),
  thumbnail: Yup.mixed<File>()
    .required("Gambar diperlukan!")
    .test(
      "fileSize",
      "Ukuran gambar terlalu besar (maksimal 2MB)",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024),
    )
    .test(
      "fileType",
      "Format file tidak didukung (hanya .jpeg, .png, .jpg dan .webp)",
      (value) =>
        !value ||
        (value instanceof File &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type,
          )),
    ),
  startDate: Yup.date()
    .default(() => new Date())
    .min(minDate, "Waktu mulai minimum adalah 24 jam dari sekarang")
    .max(maxDate, `Waktu mulai maksimum adalah ${toIDstring(maxDate)}`)
    .required("Waktu mulai diperlukan!"),
  endDate: Yup.date()
    .default(() => new Date())
    .min(minDate, "Waktu selesai minimum adalah 24 jam dari sekarang")
    .max(maxDate, `Waktu mulai maksimum adalah ${toIDstring(maxDate)}`)
    .when(
      "startDate",
      (startDate, yup) =>
        startDate &&
        yup.min(startDate, "Waktu selesai harus setelah Waktu mulai!"),
    )
    .required("Waktu selesai diperlukan!"),
  Ticket: Yup.array().of(
    Yup.object().shape({
      ticketCategory: Yup.string()
        .min(5, "Nama kategori tiket minimal terdiri dari 5 karakter!")
        .max(25, "Nama kategori tiket maksimal terdiri dari 25 karakter!")
        .required("Nama kategori tiket diperlukan!"),
      ticketDesc: Yup.string()
        .min(5, "Deskripsi minimal terdiri dari 5 karakter!")
        .max(100, "Deskripsi maksimal terdiri dari 100 karakter!")
        .required("Deskripsi kategori tiket diperlukan!"),
      seats: Yup.number()
        .required("Jumlah tiket diperlukan!")
        .min(10, "Jumlah tiket minimum adalah 10 tiket!")
        .max(1000, "Jumlah tiket maksimum adalah 1000 tiket!"),
      price: Yup.number()
        .required("Harga jual tiket diperlukan!")
        .min(0, "Harga tiket maksimum adalah Rp. 0,00!")
        .max(100000000, "Harga tiket maksimum adalah Rp. 100.000.000,00!"),
      startDate: Yup.date()
        .default(() => new Date())
        .min(minDate, "Waktu mulai minimum adalah 24 jam dari sekarang")
        .max(maxDate, `Waktu mulai maksimum adalah ${toIDstring(maxDate)}`)
        .required("Waktu mulai diperlukan!"),
      endDate: Yup.date()
        .default(() => new Date())
        .min(minDate, "Waktu selesai minimum adalah 24 jam dari sekarang")
        .max(maxDate, `Waktu mulai maksimum adalah ${toIDstring(maxDate)}`)
        .when(
          "startDate",
          (startDate, yup) =>
            startDate &&
            yup.min(startDate, "Waktu selesai harus setelah Waktu mulai!"),
        )
        .required("Waktu selesai diperlukan!"),
    }),
  ),
});
