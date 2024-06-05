import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { useEffect, useRef } from "react";
const cx = classNames.bind(styles);
function PopupUpPass({ iduser, handleClosePopup }) {
  const refPassword = useRef();
  const handlePopup = () => {
    handleClosePopup(false);
  };
  const handleUpdate = () => {
    let password = refPassword.current.value;
    console.log(password);
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ iduser, password }),
    };

    fetch("https://toolslot.site/api/v1/updatePassword", options)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          handleClosePopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={cx("wrapper_popup")}>
      <div className={cx("container_popup")}>
        <div className={cx("form")}>
          <div className={cx("container_input")}>
            <span>Nhập mật khẩu mới Ít nhất 2 ký tự*</span>
            <input
              ref={refPassword}
              type="password"
              className={cx("username")}
              name="username"
            ></input>
          </div>
          <div className={cx("container_btn")}>
            <button onClick={handleUpdate} className={cx("update")}>
              <span>Cập nhật</span>
            </button>
            <button onClick={handlePopup} className={cx("close")}>
              <span>Hủy</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupUpPass;
