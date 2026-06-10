import { Route, Routes } from "react-router";
import css from "../App/App.module.css";
import HomePage from "../../pages/HomePage/HomePage";
import NanniesPage from "../../pages/NanniesPage/NanniesPage";
import Layout from "../../layouts/Layout";
import { useEffect, useState } from "react";
import { FavoritesPage } from "../FavoritesPage/FavoritesPage";
import { AuthProvider } from "../AuthContext/AuthContext";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";

type CustomStyle = React.CSSProperties & {
  "--theme-color": string;
  "--theme-bg": string;
  "--text-color": string;
};

const themes: CustomStyle[] = [
  {
    "--theme-color": "#f03f3b",
    "--theme-bg": "rgba(240, 63, 59, 0.2)",
    "--text-color": "#f03f3b",
  },
  {
    "--theme-color": "#103931",
    "--theme-bg": "rgba(16, 57, 49, 0.2)",
    "--text-color": "#103931",
  },
  {
    "--theme-color": "#0957c3",
    "--theme-bg": "rgba(9, 87, 195, 0.2)",
    "--text-color": "#0957c3",
  },
];

export default function App() {
  const [theme] = useState(
    () => themes[Math.floor(Math.random() * themes.length)]
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      theme["--theme-color"]
    );

    document.documentElement.style.setProperty(
      "--theme-bg",
      theme["--theme-bg"]
    );

    document.documentElement.style.setProperty(
      "--text-color",
      theme["--text-color"]
    );
  }, [theme]);

  return (
    <AuthProvider>
      <div className={css.app}>
        <Routes>
          <Route element={<Layout variant="home" />}>
            <Route path="/" element={<HomePage />} />
          </Route>
          <Route element={<Layout variant="nannies" />}>
            <Route path="/nannies" element={<NanniesPage />} />
          </Route>
          <Route element={<Layout variant="nannies" />}>
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}
