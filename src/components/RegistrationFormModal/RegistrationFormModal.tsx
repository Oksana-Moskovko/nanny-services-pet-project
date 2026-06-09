import css from "./RegistrationFormModal.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";

export function RegistrationFormModal({ onClose }) {
  const LogInFormSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
  });

  return (
    <form
      className={css.formregistration}
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <button className={css.backBtn} onClick={onClose}>
        <GoX size={32} />
      </button>
      <h4 className={css.title}>Registration</h4>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
      <div className={css.inputeFormDiv}>
        <label>
          <input
            className={css.inputForm}
            {...register("name")}
            placeholder="Name"
          />
          <span className={css.iconEye}></span>
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <label>
          <input
            className={css.inputForm}
            {...register("email")}
            placeholder="Email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label>
          <input
            className={css.inputForm}
            {...register("password")}
            placeholder="Password"
          />
          <span className={css.iconEye}></span>
          {errors.password && <p>{errors.password.message}</p>}
        </label>
      </div>

      <button type="submit" className={css.signUpBtn}>
        Sign Up
      </button>
    </form>
  );
}
