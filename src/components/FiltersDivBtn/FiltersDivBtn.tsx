import { useState } from "react";
import css from "./FiltersDivBtn.module.css";
import { GoChevronDown } from "react-icons/go";

// type FiltersDivProps = {
//   onSelectFilter: (filter: string) => void;
// };

export function FiltersDivBtn({ onSelectFilter, setFilterLabel, filterLabel }) {
  const [isOpen, setIsOpen] = useState(false);

  const filters = [
    { label: "A to Z", value: "AtoZ" },
    { label: "Z to A", value: "ZtoA" },
    { label: "Less than 10$", value: "Less10" },
    { label: "Greater than 10$", value: "Greater10" },
    { label: "Popular", value: "Popular" },
    { label: "Not popular", value: "NotPopular" },
    { label: "Show all", value: "All" },
  ];
  return (
    <>
      <div className={css.filtersDiv}>
        <p className={css.textP}>Filters</p>
        <button
          className={css.filtersBtn}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {filterLabel} <GoChevronDown size={20} />
        </button>

        {isOpen && (
          <div className={css.filtersNav}>
            <ul>
              {filters.map((filter) => (
                <li
                  key={filter.value}
                  className={`${css.listFilters} ${
                    filterLabel === filter.label ? css.active : ""
                  }`}
                  onClick={() => {
                    onSelectFilter(filter.value);
                    setFilterLabel(filter.label);
                    setIsOpen(false);
                  }}
                >
                  {filter.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
