import { useEffect, useState } from "react";
import { fetchNannies } from "../../services/nannyService";
import css from "./NanniesPage.module.css";
import Modal from "../../components/Modal/Modal";
import { AppointmentForm } from "../../components/AppointmentForm/AppointmentForm";
import { NanniesList } from "../../components/NanniesList/NanniesList";

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
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    fetchNannies().then((data) => {
      setNannies(Object.values(data || {}));
    });
  }, []);

  return (
    <section className={css.container}>
      <NanniesList
        nannies={nannies}
        visibleCount={visibleCount}
        onSelectNanny={setSelectedNanny}
      />

      <button
        onClick={() => setVisibleCount((prev) => prev + 3)}
        className={css.loadMoreBtn}
      >
        Load more
      </button>

      {selectedNanny && (
        <Modal onClose={() => setSelectedNanny(null)}>
          <AppointmentForm
            nanny={selectedNanny}
            onClose={() => setSelectedNanny(null)}
          />
        </Modal>
      )}
    </section>
  );
}
