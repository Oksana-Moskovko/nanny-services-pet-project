import { Route, Routes } from "react-router";
import css from "../App/App.module.css";
import Header from "../Header/Header";
import HomePage from "../HomePage/HomePage";

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
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/nannies" element={<NanniesPage />} /> */}
      </Routes>
    </div>
  );
}
