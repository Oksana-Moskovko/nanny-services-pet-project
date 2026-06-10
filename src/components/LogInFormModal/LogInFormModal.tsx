import css from "./LogInFormModal.module.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { GoX } from "react-icons/go";
import { logInUser } from "../../services/nannyService";

export function LogInFormModal({ onClose }) {
  const LogInFormSchema = Yup.object().shape({
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

  const onSubmit = async (data) => {
    try {
      const user = await logInUser(data.email, data.password);
      console.log(user);
      onClose();
    } catch {
      console.error(errors);
    }
  };

  return (
    <form className={css.formLogIn} onSubmit={handleSubmit(onSubmit)}>
      <button className={css.backBtn} onClick={onClose}>
        <GoX size={32} />
      </button>
      <h4 className={css.title}>Log in</h4>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your babysitter search.
      </p>
      <div className={css.inputeFormDiv}>
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

      <button type="submit" className={css.LogInBtn}>
        Log in
      </button>
    </form>
  );
}
