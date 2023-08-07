import classNames from "classnames/bind";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const Header = () => {
  return (
    <header id="container" className={cx("container")}>
      Header
    </header>
  );
};

export default Header;
