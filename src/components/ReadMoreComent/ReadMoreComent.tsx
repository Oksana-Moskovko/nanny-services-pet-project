import { useState } from "react";
import css from "./ReadMoreComent.module.css";

export function ReadMoreComent({ nanny }) {
  const [isOpen, setIsOpen] = useState(false);

  const reviews = nanny.reviews;
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {!isOpen && (
        <button onClick={toggle} className={css.readMoreBtn}>
          Read more
        </button>
      )}

      {isOpen && (
        <>
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className={css.list}>
                <div className={css.user}>
                  <div className={css.frameName}>
                    <span className={css.iconName}>
                      {review.reviewer.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className={css.blackText16}>{review.reviewer}</p>
                    <p className={css.blackText14}>{review.rating}</p>
                  </div>
                </div>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
          <button>Make an appointment</button>
        </>
      )}
    </>
  );
}
