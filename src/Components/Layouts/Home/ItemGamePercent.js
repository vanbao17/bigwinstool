import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import images from "../../../Assets";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);
function ItemGamePercent({ data }) {
  const [percent, setpercent] = useState();
  const [percent1, setpercent1] = useState();
  const [percent2, setpercent2] = useState();
  const [percent3, setpercent3] = useState();
  const [color, setcolor] = useState("");
  const [randomNumbers, setRandomNumbers] = useState([]);
  const isSmallScreen = useMediaQuery({ query: "(max-width:768px)" });
  const isminScreen = useMediaQuery({ query: "(min-width:768px)" });
  const isScreen = useMediaQuery({
    query: "(max-width:1550px)",
  });
  const isLageScreen = useMediaQuery({
    query: "(min-width:1550px)",
  });
  const lagrgeScreen = useMediaQuery({
    query: "(max-width:2000px)",
  });

  const lagrgeScreenLage = useMediaQuery({
    query: "(min-width:2000px)",
  });
  const lagrgeScreenLageLage = useMediaQuery({
    query: "(max-width:2500px)",
  });
  const handleCheckColor = (num) => {
    if (num >= 0 && num <= 30) {
      return "#b00c0c";
    } else {
      if (num > 30 && num <= 70) {
        return "#faf205";
      } else {
        return "#05f721";
      }
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      const min = 0;
      const max = 10;
      const newRandomNumber = Math.random() * (max - min + 1) + min;
      setpercent1(newRandomNumber.toFixed(1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const min = 10;
      const max = 20;
      const newRandomNumber = Math.random() * (max - min + 1) + min;
      setpercent2(newRandomNumber.toFixed(1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const min = 25;
      const max = 35;
      const newRandomNumber = Math.random() * (max - min + 1) + min;
      setpercent3(newRandomNumber.toFixed(1));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const currentNumber = () => {
      const min = data.min;
      const max = data.max;
      const newRandomNumber = Math.random() * (max - min + 1) + min;
      return newRandomNumber.toFixed(1);
    };
    const intervalId = setInterval(() => {
      const min = Math.max(currentNumber() - 7, data.min);
      const max = Math.min(currentNumber() + 7, data.max);
      const newRandomNumber = Math.random() * (max - min + 1) + min;
      setpercent(newRandomNumber.toFixed(1));
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newNumbers = Array.from({ length: 6 }, () => {
        return (Math.random() * 100).toFixed(1);
      });
      setRandomNumbers(newNumbers);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (percent >= 0 && percent <= 50) {
      setcolor("red");
    } else {
      if (percent >= 50 && percent <= 80) {
        setcolor("blue");
      } else {
        setcolor("green");
      }
    }
  }, [percent]);
  return (
    <div className={cx("container_game")}>
      <div className={cx("game_item")}>
        <div className={cx("imagesgame")}>
          <img src={images.test} alt="Example" />
        </div>
        <span className={cx("name_game")}>{data.name_game}</span>

        <div className={cx("image_infor")}>
          <img src={data.link_image}></img>
        </div>
        <span className={cx("num_percent")}>{percent}%</span>
        <div className={cx("progress")}>
          <div
            style={{
              width: `${
                isScreen == true && isminScreen == true
                  ? Math.floor((400 * percent) / 100)
                  : isSmallScreen == true
                  ? Math.floor((130 * percent) / 100)
                  : isLageScreen == true && lagrgeScreen == true
                  ? Math.floor((350 * percent) / 100)
                  : lagrgeScreenLage == true && lagrgeScreenLageLage == true
                  ? Math.floor((435 * percent) / 100)
                  : (435 * percent) / 100

                // isSmallScreen == true
                //   ? Math.floor((130 * percent) / 100)
                //   : isScreen == true
                //   ? Math.floor((435 * percent) / 100)
                //   : isLageScreen == true
                //   ? Math.floor((325 * percent) / 100)
                //   : 0
              }px`,
              backgroundColor: `${handleCheckColor(percent)}`,
            }}
            className={cx("progress_bar")}
          ></div>
          <div className={cx("background_progress")}></div>
        </div>

        <div className={cx("background_linear")}></div>
      </div>
      <div className={cx("percent_game")}>
        <img src={images.percent} alt="Example" />
        <span className={cx(`item1`)}>10P</span>
        <span className={cx(`item2`)}>20P</span>
        <span className={cx(`item3`)}>30P</span>
        <span style={{ color: "red" }} className={cx(`item6`)}>
          {percent1}%
        </span>
        <span style={{ color: "red" }} className={cx(`item5`)}>
          {percent2}%
        </span>
        <span style={{ color: "blue" }} className={cx(`item4`)}>
          {percent3}%
        </span>
        {/* {randomNumbers.map((item, index) => {
          const colort = handleCheckColor(item);
          if (index + 1 >= 4) {
            if (index + 1 == 4 && item <= 10) {
              return (
                <span
                  key={index}
                  style={{ color: `${colort}` }}
                  className={cx(`item${index + 1}`)}
                >
                  {item}%
                </span>
              );
            }
            if (index + 1 == 5 && item <= 10) {
              return (
                <span
                  key={index}
                  style={{ color: `${colort}` }}
                  className={cx(`item${index + 1}`)}
                >
                  {item}%
                </span>
              );
            }
            if (index + 1 == 6 && item <= 10) {
              return (
                <span
                  key={index}
                  style={{ color: `${colort}` }}
                  className={cx(`item${index + 1}`)}
                >
                  {item}%
                </span>
              );
            }
          }
        })} */}
      </div>
    </div>
  );
}

export default ItemGamePercent;
