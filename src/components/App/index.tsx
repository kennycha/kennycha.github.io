import classNames from "classnames/bind";
import styles from "./index.module.scss";
import CardDeck from "../CardDeck";
import Header from "../Header";
import Footer from "../Footer";
import NoiseCanvas from "../NoiseCanvas";

const cx = classNames.bind(styles);

const App = () => {
  return (
    <div className={cx("container")}>
      <Header />
      <CardDeck />
      <Footer />
      <NoiseCanvas />
    </div>
  );
};

export default App;
