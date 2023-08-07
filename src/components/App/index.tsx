import classNames from "classnames/bind";
import styles from "./index.module.scss";
import CardDeck from "../CardDeck";
import Header from "../Header";
import Footer from "../Footer";

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx("container")}>
      <Header />
      <CardDeck />
      <Footer />
    </div>
  );
};

export default App;
