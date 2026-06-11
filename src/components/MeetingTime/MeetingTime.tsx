import css from "./MeetingTime.module.css";

export function MeetingTime({ setTime, setIsOpen, setValue, selectedTime }) {
  const times = ["09 : 00", "09 : 30", "10 : 00", "10 : 30"];
  return (
    <div className={css.meetingTimeDiv}>
      <p className={css.title}>Meeting time</p>
      <ul>
        {times.map((item) => (
          <li className={css.timeBox} key={item}>
            <button
              className={`${css.number} ${
                selectedTime === item ? css.active : ""
              }`}
              type="button"
              onClick={() => {
                setTime(item);
                setValue("time", item, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setIsOpen(false);
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
