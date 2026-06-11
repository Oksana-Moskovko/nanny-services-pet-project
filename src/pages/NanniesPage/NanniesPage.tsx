import { useEffect, useMemo, useState } from "react";
import { get, ref } from "firebase/database";
import { fetchNannies, toggleFavorite } from "../../services/nannyService";
import css from "./NanniesPage.module.css";
import Modal from "../../components/Modal/Modal";
import { AppointmentForm } from "../../components/AppointmentForm/AppointmentForm";
import { NanniesList } from "../../components/NanniesList/NanniesList";
import { FiltersDivBtn } from "../../components/FiltersDivBtn/FiltersDivBtn";
import { useAuth } from "../../services/useAuth";
import { database } from "../../firebase/config";
import { filterNannies } from "../../utils/filterNannies";

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
  const [selectedFilter, setSelectedFilter] = useState("AtoZ");
  const [filterLabel, setFilterLabel] = useState("A to Z");
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState<Record<string, boolean>>({});

  const handleFavoriteClick = async (nannyId: string) => {
    if (!user || !nannyId) {
      console.log("увійдіть");
      return;
    }

    const isFav = !!isFavorite[nannyId];

    setIsFavorite((prev) => ({
      ...prev,
      [nannyId]: !isFav,
    }));

    try {
      await toggleFavorite(user.uid, nannyId, isFav);
    } catch (error) {
      console.log(error);

      setIsFavorite((prev) => ({
        ...prev,
        [nannyId]: isFav,
      }));
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setVisibleCount(3);
  };

  const filteredNannies = useMemo(() => {
    return filterNannies(nannies, selectedFilter);
  }, [nannies, selectedFilter]);

  const hasMore = visibleCount < filteredNannies.length;

  useEffect(() => {
    fetchNannies().then((data) => {
      console.log("NANNIES FROM FIREBASE:", data);
      setNannies(data ?? []);
    });
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      const snapshot = await get(ref(database, `users/${user.uid}/favorites`));

      setIsFavorite(snapshot.exists() ? snapshot.val() : {});
    };

    fetchFavorites();
  }, [user]);

  return (
    <section className={css.container}>
      <FiltersDivBtn
        onSelectFilter={handleFilterChange}
        setFilterLabel={setFilterLabel}
        filterLabel={filterLabel}
      />
      <NanniesList
        nannies={filteredNannies}
        visibleCount={visibleCount}
        onSelectNanny={setSelectedNanny}
        handleFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite}
      />
      {hasMore && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 3)}
          className={css.loadMoreBtn}
        >
          Load more
        </button>
      )}

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
