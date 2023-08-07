import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { Fragment } from "react";

const cx = classNames.bind(styles);

const LINKS = [
  { key: "github", text: "Github", url: "https://github.com/kennycha" },
  { key: "resume", text: "Resume", url: "assets/files/resume.pdf" },
  { key: "mail", text: "Mail", url: "dudqn136@naver.com" },
];

const Header = () => {
  return (
    <header id="container" className={cx("container")}>
      <div className={cx("logo")}>
        <div className={cx("logoImage")}></div>
      </div>
      <ul className={cx("links")}>
        {LINKS.map((link, idx) => {
          return (
            <Fragment key={link.key}>
              <a className={cx("link")} target="_blank" href={link.key === "mail" ? `mailto:${link.url}` : link.url}>
                <p className={cx("linkText")}>{link.text}</p>
              </a>
              {idx !== LINKS.length - 1 && <div className={cx("separator")} />}
            </Fragment>
          );
        })}
      </ul>
    </header>
  );
};

export default Header;
