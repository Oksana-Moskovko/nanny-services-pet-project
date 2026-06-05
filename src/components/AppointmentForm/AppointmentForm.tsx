import { useForm } from "react-hook-form";
import css from "./AppointmentForm.module.css";

export function AppointmentForm({ nanny, onClose }) {
  // const handleSubmit = (formData: FormData) => {
  //   const username = formData.get("username") as string;
  //   console.log("Name:", username);
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (!nanny) return null;

  return (
    <div className={css.appointmentDiv}>
      <button className={css.backBtn} onClick={onClose}>
        X
      </button>
      <h4 className={css.title}>Make an appointment with a babysitter</h4>
      <p className={css.text}>
        Arranging a meeting with a caregiver for your child is the first step to
        creating a safe and comfortable environment. Fill out the form below so
        we can match you with the perfect care partner.
      </p>
      <div className={css.nameDiv}>
        <img
          src={nanny.avatar_url}
          alt={nanny.name}
          width={96}
          height={96}
          className={css.photoNanny}
        />

        <div>
          <p className={css.subtext}>Your nanny</p>
          <p className={css.blackText}>{nanny.name}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input {...register("Address", { required: true })} />
        <input {...register("telefon", { required: true, pattern: /\d+/ })} />
        <input
          {...register("Child's age", { required: true, pattern: /\d+/ })}
        />
        <input {...register("date", { required: true, pattern: /\d+/ })} />
        <input {...register("email", { required: true })} />
        <input {...register("Father's or mother's name", { required: true })} />
        <input {...register("Comment", { required: true })} />

        {errors.email && <p>Email is required.</p>}
        {errors.age && <p>Please enter number for age.</p>}

        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
