import { useEffect, useMemo, useState } from "react";
import css from "./FavoritesPage.module.css";
import { NanniesList } from "../../components/NanniesList/NanniesList";
import { useAuth } from "../../services/useAuth";
import {
  fetchFavorite,
  fetchNannies,
  toggleFavorite,
  type Nanny,
} from "../../services/nannyService";
import Modal from "../../components/Modal/Modal";
import { AppointmentForm } from "../../components/AppointmentForm/AppointmentForm";
import { FiltersDivBtn } from "../../components/FiltersDivBtn/FiltersDivBtn";
import { filterNannies } from "../../utils/filterNannies";

export function FavoritesPage() {
  const [nannies, setNannies] = useState<Nanny[]>([]);
  const [selectedNanny, setSelectedNanny] = useState<Nanny | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [filterLabel, setFilterLabel] = useState("Popular");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setVisibleCount(3);
  };

  const favoriteNannies = nannies.filter((nanny) => favorites[nanny.id]);

  const handleFavoriteClick = async (nannyId: string) => {
    if (!user) return;

    const isFav = !!favorites[nannyId];

    setFavorites((prev) => ({
      ...prev,
      [nannyId]: !isFav,
    }));

    try {
      await toggleFavorite(user.uid, nannyId, isFav);
    } catch (error) {
      console.log(error);
    }

    setFavorites((prev) => ({
      ...prev,
      [nannyId]: isFav,
    }));
  };

  const filteredNannies = useMemo(() => {
    return filterNannies(favoriteNannies, selectedFilter);
  }, [favoriteNannies, selectedFilter]);

  const hasMore = visibleCount < filteredNannies.length;

  useEffect(() => {
    fetchNannies().then(setNannies);
  }, []);

  useEffect(() => {
    if (!user) return;

    fetchFavorite(user.uid).then(setFavorites);
  }, [user]);

  return (
    <div className={css.container}>
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
        isFavorite={favorites}
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
    </div>
  );
}
