import { useSelector } from "react-redux";

export const useFilterJobs = (data) => {
  const filters = useSelector((state) => state.filters);

  return data?.filter((listing) => {
    // Implement filtering logic based on filters object
    return (
      (!filters.minExp || listing.minExp <= filters.minExp) &&
      (!filters.jobRole.length ||
        filters.jobRole.some(
          (jobRole) => jobRole?.toLowerCase() === listing.jobRole?.toLowerCase()
        )) &&
      (!filters.companyName ||
        listing.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())) &&
      ((!filters.remote.length && !filters.location) ||
        filters.remote.some((location) =>
          location?.toLowerCase() === "in-office"
            ? listing.location?.toLowerCase() !== "remote"
            : location?.toLowerCase() === listing.location?.toLowerCase()
        ) ||
        (filters.location &&
          listing.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()))) &&
      (!filters.minJdSalary ||
        listing.minJdSalary >= filters.minJdSalary ||
        listing.maxJdSalary >= filters.minJdSalary)
    );
  });
};
