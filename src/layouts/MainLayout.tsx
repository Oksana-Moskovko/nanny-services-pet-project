import { Outlet } from "react-router";
import MainHeader from "../components/MainHeader/MainHeader";

export default function MainLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
}
