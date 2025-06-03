// src/pages/NotFoundPage.tsx
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1>404 - Сторінку не знайдено</h1>
      <p>Ой! Схоже, ви заблукали.</p>
      <Link to="/">Повернутися на головну</Link>
    </div>
  );
};

export default NotFoundPage;
