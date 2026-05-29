import { Route, Routes } from "react-router";
import css from "../App/App.module.css";
import HomePage from "../../pages/HomePage/HomePage";
import NanniesPage from "../../pages/NanniesPage/NanniesPage";
import HomeLayout from "../../layouts/HomeLayout";
import MainLayout from "../../layouts/MainLayout";

type CustomStyle = React.CSSProperties & {
  "--theme-color": string;
};

const palette = ["#F03F3B", "#0957C3", "#103931"];

const randomColor = palette[Math.floor(Math.random() * palette.length)];
console.log(randomColor);

export default function App() {
  return (
    <div
      style={{ "--theme-color": randomColor } as CustomStyle}
      className={css.app}
    >
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/nannies" element={<NanniesPage />} />
        </Route>
        {/* <Route path="/" element={<HomePage />} /> */}
        {/* <Route path="/nannies" element={<NanniesPage />} /> */}
      </Routes>
    </div>
  );
}
