import { useState } from "react";
import { getAge } from "../../utils/getAge";
import { ReadMoreComent } from "../ReadMoreComent/ReadMoreComent";
import css from "./NanniesList.module.css";
import { GoHeart, GoHeartFill, GoStarFill } from "react-icons/go";
import { CiLocationOn } from "react-icons/ci";

export function NanniesList({
  nannies,
  visibleCount,
  onSelectNanny,
  handleFavoriteClick,
  isFavorite,
}) {
  const [openReviewsId, setOpenReviewsId] = useState(null);

  return (
    <>
      <ul className={css.list}>
        {nannies.slice(0, visibleCount).map((nanny) => (
          <li key={nanny.id} className={css.listNannies}>
            <div onClick={() => handleFavoriteClick(nanny.id)}>
              {isFavorite[nanny.id] ? (
                <GoHeartFill className={css.iconHeaderFill} size={26} />
              ) : (
                <GoHeart className={css.iconHeader} size={26} />
              )}
            </div>

            <div className={css.divFrame}>
              <div className={css.frame}>
                <span className={css.circleWhite}>
                  <span className={css.circleGreen}></span>
                </span>
                <img
                  src={nanny.avatar_url}
                  alt={nanny.name}
                  width={96}
                  height={96}
                  className={css.photoNanny}
                />
              </div>
            </div>
            <div className={css.frameInfo}>
              <div className={css.briefInfoTitle}>
                <div>
                  <p>Nanny</p>
                  <h3 className={css.blackText}>{nanny.name}</h3>
                </div>
                <div className={css.locationRatingPriceDiv}>
                  <p className={css.blackText}>
                    <span className={css.icon}>
                      <CiLocationOn className={css.iconLocation} size={16} />
                    </span>
                    {nanny.location} <span className={css.iconI}>|</span>{" "}
                    <span className={css.icon}>
                      <GoStarFill className={css.iconStar} size={16} />
                    </span>
                    Rating: {nanny.rating} <span className={css.iconI}>|</span>{" "}
                    Price / 1 hour:{" "}
                    <span className={css.price}>{nanny.price_per_hour} $</span>
                  </p>
                </div>
              </div>

              <div className={css.briefInfo}>
                <p className={css.pill}>
                  Age:{" "}
                  <span className={css.underline}>
                    {getAge(nanny.birthday)}
                  </span>
                </p>
                <p className={css.pill}>
                  Experience:{" "}
                  <span className={css.blackText}>{nanny.experience}</span>
                </p>
                <p className={css.pill}>
                  Kids Age:{" "}
                  <span className={css.blackText}>{nanny.kids_age}</span>
                </p>
                <p className={css.pill}>
                  Characters:{" "}
                  <span className={css.blackText}>
                    {nanny.characters
                      .map(
                        (character) =>
                          character.charAt(0).toUpperCase() + character.slice(1)
                      )
                      .join(", ")}
                  </span>
                </p>
                <p className={css.pill}>
                  Education:{" "}
                  <span className={css.blackText}>{nanny.education}</span>
                </p>
              </div>
              <p className={css.about}>{nanny.about}</p>

              <ReadMoreComent
                nanny={nanny}
                isOpen={openReviewsId === nanny.id}
                onToggle={() =>
                  setOpenReviewsId(openReviewsId === nanny.id ? null : nanny.id)
                }
              />

              {openReviewsId === nanny.id && (
                <button
                  onClick={() => onSelectNanny(nanny)}
                  className={css.appointmentBtn}
                >
                  Make an appointment
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
