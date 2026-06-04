import { useEffect, useState } from "react";
import { fetchNannies } from "../../services/nannyService";
import css from "./NanniesPage.module.css";
import { getAge } from "../../utils/getAge";
import { ReadMoreComent } from "../../components/ReadMoreComent/ReadMoreComent";

export interface Nanny {
  about: string;
  avatar_url: string;
  birthday: string;
  characters: string[];
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  reviews: Review[];
}

export interface Review {
  comment: string;
  rating: number;
  reviewer: string;
}

export default function NanniesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetchNannies().then((data) => {
      setNannies(Object.values(data || {}));
    });
  }, []);

  return (
    <section className={css.container}>
      <ul className={css.list}>
        {nannies.slice(0, visibleCount).map((nanny, index) => (
          <li
            key={`${nanny.name}-${nanny.birthday}-${index}`}
            className={css.listNannies}
          >
            <div className={css.divFrame}>
              <div className={css.frame}>
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
                <div>
                  <p className={css.blackText}>
                    <span className={css.icon}></span>
                    {nanny.location} <span className={css.iconI}>|</span>{" "}
                    <span className={css.icon}></span>Rating: {nanny.rating}{" "}
                    <span className={css.iconI}>|</span> Price / 1 hour:{" "}
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
                key={`${nanny.name}-${nanny.birthday}`}
                nanny={nanny}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setVisibleCount((prev) => prev + 3)}
        className={css.loadMoreBtn}
      >
        Load more
      </button>
    </section>
  );
}
