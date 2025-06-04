import { useState } from "react";
import "./../styles/SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="searchForm">
      <input
        type="text"
        placeholder="Пошук за заголовком..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="searchInput"
      />
      <button type="submit" className="searchButton">
        Пошук
      </button>
    </form>
  );
};

export default SearchBar;
