import { useEffect, useState, useCallback } from "react";
import styles from "./Filter.module.css";
import { Button } from "../../../components/Button";

interface FilterProps {
  label?: string;
  placeholder?: string;
  initialValue?: string;
  onChange: (value: string) => void; 
  delay?: number;
}

export const Filter: React.FC<FilterProps> = ({
  label = "Search",
  placeholder = "Type to filter...",
  initialValue = "",
  onChange,
  delay = 300,
}) => {
  const [query, setQuery] = useState(initialValue);
  const [debouncedQuery, setDebouncedQuery] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);

  useEffect(() => {
    onChange(debouncedQuery);
  }, [debouncedQuery, onChange]);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  return (
    <div className={styles["filter-container"]}>
      {label && (
        <label className={styles["filter-label"]} htmlFor="filter-input">
          {label}
        </label>
      )}

      <div className={styles["filter-input-container"]}>
        <input
          id="filter-input"
          type="text"
          className={styles["filter-input"]}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {query && (
          <Button
            variant="outline"
            color="danger"
            onClick={handleClear}
          >
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};