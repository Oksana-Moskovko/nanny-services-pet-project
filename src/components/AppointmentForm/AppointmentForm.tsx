import { useForm } from "react-hook-form";
import css from "./AppointmentForm.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { MeetingTime } from "../MeetingTime/MeetingTime";
import { useState } from "react";
import { GoClock } from "react-icons/go";
import { GoX } from "react-icons/go";

export function AppointmentForm({ nanny, onClose }) {
  const [time, setTime] = useState("00:00");
  const [isOpen, setIsOpen] = useState(false);
  const rendezvousFormSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    telefon: Yup.string()
      .required("Telefon is required")
      .min(6, "Telefon is required"),
    age: Yup.string().required("Child's age is required"),
    time: Yup.string().required("Meeting time is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Father's or mother's name is required"),
    comment: Yup.string().required("Comment is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(rendezvousFormSchema),
    defaultValues: {
      telefon: "+380",
    },
  });

  if (!nanny) return null;

  return (
    <div className={css.appointmentDiv}>
      <button className={css.backBtn} onClick={onClose}>
        <GoX size={32} />
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
          {errors.address && <p>{errors.address.message}</p>}
        </label>
        <label>
          <input
            className={css.inputForm}
            name="telefon"
            {...register("telefon")}
          />{" "}
          {errors.telefon && <p>{errors.telefon.message}</p>}
        </label>
        <label>
          <input
            className={css.inputForm}
            name="age"
            placeholder="Child's age"
            {...register("age")}
          />
          {errors.age && <p>{errors.age.message}</p>}
        </label>
        <label className={css.inputIcon}>
          <input
            className={css.inputForm}
            name="time"
            placeholder={time}
            onClick={() => setIsOpen((prev) => !prev)}
            {...register("time")}
          />
          <GoClock className={css.iconTime} size={20} />
          {isOpen && (
            <MeetingTime
              setTime={setTime}
              setIsOpen={setIsOpen}
              setValue={setValue}
            />
          )}
          {errors.time && <p>{errors.time.message}</p>}
        </label>
        <label>
          <input
            type="email"
            className={`${css.inputForm} ${css.inputeLong}`}
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label>
          <input
            name="name"
            className={`${css.inputForm} ${css.inputeLong}`}
            placeholder="Father's or mother's name"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </label>
        <label>
          <textarea
            name="comment"
            className={css.inputFormComment}
            placeholder="Comment"
            {...register("comment")}
          ></textarea>
          {errors.comment && <p>{errors.comment.message}</p>}
        </label>

        <button type="submit" className={css.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
