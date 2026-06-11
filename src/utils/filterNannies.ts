export function filterNannies(nannies, selectedFilter) {
  const copy = [...nannies];

  switch (selectedFilter) {
    case "AtoZ":
      return copy.sort((a, b) => a.name.localeCompare(b.name));

    case "ZtoA":
      return copy.sort((a, b) => b.name.localeCompare(a.name));

    case "Popular":
      return copy.sort((a, b) => b.rating - a.rating);

    case "NotPopular":
      return copy.sort((a, b) => a.rating - b.rating);

    case "Less10":
      return copy.sort((a, b) => a.price_per_hour - b.price_per_hour);

    case "Greater10":
      return copy.sort((a, b) => b.price_per_hour - a.price_per_hour);

    default:
      return copy;
  }
}