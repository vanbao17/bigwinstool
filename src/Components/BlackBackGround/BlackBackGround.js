import classNames from "classnames/bind";
import styles from "./BlackBackGround.module.scss";
const cx = classNames.bind(styles);
function BlackBackGround() {
  return <div className={cx("wrapper")}></div>;
}

export default BlackBackGround;
