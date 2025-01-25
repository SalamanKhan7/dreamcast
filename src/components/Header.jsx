import styles from "./Header.module.css";
import SearchInventory from "./SearchInventory";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="/dreamcastMain.png"
          alt="Dreamcast"
          className={styles.logoImage}
        />
      </div>
      <div className={styles.SearchInventory}>
        <SearchInventory />
      </div>
      <ExitToAppIcon className={styles.logoutIcon} fontSize="large" />
    </header>
  );
};

export default Header;
