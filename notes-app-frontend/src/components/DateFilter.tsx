import { useState } from "react";
import "./../styles/DateFilter.css";

interface DateFilterProps {
  onFilter: (from: string, to: string) => void;
  onReset: () => void;
}

const DateFilter = ({ onFilter, onReset }: DateFilterProps) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromDate && !toDate) {
      alert("Будь ласка вкажіть хоча б одну дату");
      return;
    }

    console.log("Filtering with dates:", { fromDate, toDate });
    onFilter(fromDate, toDate);
  };

  const handleReset = () => {
    setFromDate("");
    setToDate("");
    onReset();
  };

  return (
    <div className="date-filter-wrapper">
      <form onSubmit={handleFilter} className="date-filter-form">
        <div className="date-inputs">
          <div className="date-input-group">
            <label>Від:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="date-input-group">
            <label>До:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="date-input"
            />
          </div>
        </div>
        <div className="filter-actions">
          <button type="submit" className="filter-button">
            Фільтрувати
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="filter-button reset"
          >
            Скинути
          </button>
        </div>
      </form>
    </div>
  );
};

export default DateFilter;
