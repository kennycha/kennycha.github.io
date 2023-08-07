import classNames from "classnames/bind";
import styles from "./index.module.scss";

const cx = classNames.bind(styles);

const Footer = () => {
  return (
    <footer className={cx("container")}>
      <p className={cx("copyright")}>&copy; kennycha</p>
      <p className={cx("separator")}>|</p>
      <a className={cx("link")} href="/assets/files/resume.pdf" target="_blank">
        <p>Resume</p>
      </a>
      <p className={cx("separator")}>|</p>
      <a className={cx("link")} href="https://github.com/kennycha/kennycha.github.io" target="_blank">
        <p>Github</p>
      </a>
    </footer>
  );
};

export default Footer;
