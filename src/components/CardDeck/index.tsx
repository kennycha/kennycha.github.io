import { useSprings, animated, to } from "@react-spring/web";
import image0 from "../../resources/images/image0.png?url";
import image1 from "../../resources/images/image1.png?url";
import image2 from "../../resources/images/image2.png?url";
import image3 from "../../resources/images/image3.png?url";
import image4 from "../../resources/images/image4.png?url";
import classNames from "classnames/bind";
import styles from "./index.module.scss";
import { useState } from "react";

const GITHUB_BASE_URL = "https://github.com/kennycha";
const SITE_BASE_URL = "https://kennycha.github.io";

const CARDS = [
  {
    name: "Toursyouwaitingfor",
    stack: "Three.js",
    image: image0,
    link: `toursyouwaitingfor/`,
    color: "#0D1282",
  },
  {
    name: "Physics Topster",
    stack: "Three.js, Cannon-es",
    image: image1,
    link: `phy-topster/`,
    color: "#1A5D1A",
  },
  {
    name: "Simple Sound Graph",
    stack: "D3.js, Web Audio",
    image: image2,
    link: `simple-sound-graph/`,
    color: "#D71313",
  },
  {
    name: "Simple Drum Machine",
    stack: "Three.js, Web Audio",
    image: image3,
    link: `simple-drum-machine/`,
    color: "#F0DE36",
  },
  {
    name: "Zelda's Rolling Balls",
    stack: "Three.js, Cannon-es, React.js",
    image: image4,
    link: `zelda-rolling-balls/`,
    color: "#3D246C",
  },
];
const TOTAL_CARD_COUNT = CARDS.length;

enum Direction {
  "left" = -1,
  "right" = 1,
}

const cx = classNames.bind(styles);

const getAnimatedValues = (i: number) => {
  const zIndex = TOTAL_CARD_COUNT - i;

  return {
    x: 0,
    y: zIndex * -1,
    scale: 1,
    zIndex,
    rotation: -10 + Math.random() * 20,
    boxShadow: 8,
    boxShadowIntensity: 0.04,
    delay: i * 100,
    config: { friction: 50, tension: 300 },
  };
};

const CardDeck = () => {
  const [gone] = useState(new Set());
  const [props, api] = useSprings(TOTAL_CARD_COUNT, (i) => getAnimatedValues(i));

  const onNextButtonClick = (direction: Direction) => {
    const cursor = CARDS.findIndex((_, idx) => !gone.has(idx));
    if (cursor === -1) return;

    gone.add(cursor);
    api.start((i) => {
      if (i !== cursor) return;

      return {
        x: (window.innerWidth + 200) * direction,
        delay: 0,
        boxShadow: 64,
        boxShadowIntensity: 0.12,
        scale: 1.1,
        config: { friction: 70, tension: 100 },
      };
    });

    if (gone.size === CARDS.length) {
      setTimeout(() => {
        gone.clear();
        api.start((i) => getAnimatedValues(i));
      }, 500);
    }
  };

  return (
    <main className={cx("container")}>
      {props.map((prop, idx) => {
        const { x, y, rotation, boxShadow, boxShadowIntensity, scale, zIndex } = prop;
        const card = CARDS[idx];

        return (
          <animated.div className={cx("card")} key={idx} style={{ x, y, zIndex }}>
            <animated.div
              className={cx("inner")}
              style={{
                boxShadow: to([boxShadow, boxShadowIntensity], (bs, bsi) => `0 2px ${bs}px rgba(0, 0, 0, ${bsi})`),
                transform: to(
                  [rotation, scale],
                  (r, s) => `perspective(2000px) rotateX(10deg) rotateZ(${r}deg) scale(${s})`
                ),
                color: card.color,
                borderColor: card.color,
              }}
            >
              <div className={cx("image")} style={{ backgroundImage: `url(${card.image})` }} />
              <p className={cx("description")}>{`${card.name}\nwith ${card.stack}`}</p>
              <a className={cx("link")} href={`${SITE_BASE_URL}/${card.link}`} target="_blank"></a>
              <a className={cx("link")} href={`${GITHUB_BASE_URL}/${card.link}`} target="_blank"></a>
            </animated.div>
          </animated.div>
        );
      })}
      <div className={cx("buttons")}>
        <button className={cx("nextButton")} onClick={() => onNextButtonClick(Direction.left)}></button>
        <button className={cx("nextButton")} onClick={() => onNextButtonClick(Direction.right)}></button>
      </div>
    </main>
  );
};

export default CardDeck;
