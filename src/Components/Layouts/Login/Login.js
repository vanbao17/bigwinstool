import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import images from "../../../Assets";
const cx = classNames.bind(styles);

function Login() {
  const nav = useNavigate();
  const [warning, setwarning] = useState("");
  const refUsername = useRef();
  const refPassword = useRef();
  const handleLogin = () => {
    let username = refUsername.current.value;
    let password = refPassword.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    };
    fetch("https://toolslot.site/api/v1/login", options)
      .then((response) => {
        if (response.status == 200) {
          if (username == "admin") {
            sessionStorage.setItem("username", "Admin");
            nav("/Admin");
          } else {
            sessionStorage.setItem("username", username);
            nav("/");
          }
        } else {
          setwarning("Đăng nhập không thành công");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className={cx("wrapper")}
      style={{ backgroundImage: `url(${images.login})` }}
    >
      <div className={cx("container")}>
        <div className={cx("container_center")}>
          <div className={cx("infor")}>
            <div className={cx("image")}>
              <img src={images.logo}></img>
            </div>
            <div></div>
          </div>
          <div className={cx("formlogin")}>
            <span className={cx("title")}>Đăng nhập</span>
            <div className={cx("form")}>
              <div className={cx("container_input")}>
                <span>Tên đăng nhập*</span>
                <input
                  ref={refUsername}
                  type="text"
                  className={cx("username")}
                  name="username"
                ></input>
              </div>
              <div className={cx("container_input")}>
                <span>Mật khẩu*</span>
                <input
                  ref={refPassword}
                  type="password"
                  className={cx("password")}
                  name="password"
                ></input>
              </div>
            </div>
            <div className={cx("remember_pass")}>
              <input
                type="checkbox"
                className={cx("remember_input")}
                name="remember_input"
              ></input>
              <span>Ghi nhớ mật khẩu</span>
            </div>
            <div className={cx("warning_login")}>
              {warning.length > 1 ? (
                <span>Đăng nhập không thành công</span>
              ) : (
                <></>
              )}
            </div>
            <div className={cx("container_button")}>
              <button onClick={handleLogin} className={cx("login")}>
                <span>Đăng nhập</span>
              </button>
              <button
                onClick={() => {
                  nav("/Account/Register");
                }}
                className={cx("register")}
              >
                <span>Đăng ký</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
