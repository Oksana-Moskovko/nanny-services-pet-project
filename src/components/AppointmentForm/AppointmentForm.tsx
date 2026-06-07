import { useForm } from "react-hook-form";
import css from "./AppointmentForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export function AppointmentForm({ nanny, onClose }) {
  const rendezvousFormSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    telefon: Yup.string().required("Telefon is required"),
    age: Yup.string().required("Child's age is required"),
    time: Yup.string().required("Meeting time is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Father's or mother's name is required"),
    comment: Yup.string().max(500, "Comment is too long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(rendezvousFormSchema) });

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
      <form
        className={css.formAppointment}
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <label>
          <input
            className={css.inputForm}
            name="address"
            placeholder="Address"
            {...register("address")}
          />
        </label>
        <label>
          {/* <span>+380</span> */}
          <input
            className={css.inputForm}
            name="telefon"
            {...register("telefon")}
          />
        </label>
        <label>
          <input
            className={css.inputForm}
            name="age"
            placeholder="Child's age"
            {...register("age")}
          />
        </label>
        <label>
          <input
            className={css.inputForm}
            name="time"
            placeholder="00:00"
            {...register("time")}
          />
        </label>
        <label>
          <input
            className={css.inputForm}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label>
          <input
            name="name"
            className={css.inputForm}
            placeholder="Father's or mother's name"
            {...register("name")}
          />
        </label>
        <label>
          <input
            name="comment"
            className={css.inputForm}
            placeholder="Comment"
            {...register("comment")}
          />
        </label>

        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
