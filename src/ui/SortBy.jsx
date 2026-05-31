import { useSearchParams } from "react-router-dom";
import Select from "../ui/Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sortBy", e.target.value);
    setSearchParams(newParams);
  }

  return (
    <Select
      options={options}
      value={sortBy}
      onChange={handleChange}
      $type="white"
    />
  );
}

export default SortBy;
