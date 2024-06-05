import classNames from "classnames/bind";
import styles from "./Accounts.module.scss";
const cx = classNames.bind(styles);
function Accounts() {
  return <div className={cx("wrapper")}>Accounts</div>;
}

export default Accounts;
