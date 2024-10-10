import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";

export function Component() {
  const { t } = useTranslation("FriendsProfileLayout");
  return (
    <section className="w-full flex flex-col gap-5 p-3 bg-white rounded">
      <nav className="w-full flex justify-center items-center gap-5 bg-white border-b py-5">
        <NavLink
          end
          style={({ isActive }) => ({
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to="friends"
        >
          {t("navbar.friends")}
        </NavLink>
        <NavLink
          end
          style={({ isActive }) => ({
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to="followers"
        >
          {t("navbar.followers")}
        </NavLink>

        <NavLink
          end
          style={({ isActive }) => ({
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to="following"
        >
          {t("navbar.following")}
        </NavLink>
        <NavLink
          end
          style={({ isActive }) => ({
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to="recently-added"
        >
          {t("navbar.recently")}
        </NavLink>
        <NavLink
          end
          style={({ isActive }) => ({
            color: isActive ? "var(--primary-color)" : "#6C6C6C",
          })}
          to="current-city"
        >
          {t("navbar.current")}
        </NavLink>
      </nav>
      <Outlet />
    </section>
  );
}
