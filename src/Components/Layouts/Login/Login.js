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
      style={{ backgroundImage: `url(${images.backgroundLogin})` }}
    >
      <div className={cx("container")}>
        <div className={cx("content-left")}></div>
        <div
          className={cx("container_center")}
          style={{ backgroundImage: `url(${images.formLogin})` }}
        >
          <div className={cx("infor")}>
            <div>
              <img src={images.logo}></img>
            </div>
          </div>
          <div className={cx("formlogin")}>
            <div className={cx("form")}>
              <span className={cx("titleinput1")}>Tên đăng nhập</span>
              <div className={cx("container_input")}>
                <input
                  ref={refUsername}
                  type="text"
                  className={cx("username")}
                  name="username"
                ></input>
              </div>
              <span className={cx("titleinput2")}>Mật khẩu</span>
              <div className={cx("container_input")}>
                <input
                  ref={refPassword}
                  type="password"
                  className={cx("password")}
                  name="password"
                ></input>
              </div>
            </div>

            <div className={cx("warning_login")}>
              {warning.length > 1 ? (
                <span>Đăng nhập không thành công</span>
              ) : (
                <></>
              )}
            </div>
            <div className={cx("container_button")}>
              <img onClick={handleLogin} src={images.loginButton}></img>
              <img
                onClick={() => {
                  nav("/Account/Register");
                }}
                src={images.registerButton}
              ></img>
              {/* <button onClick={handleLogin} className={cx("login")}></button>
              <button
                onClick={() => {
                  nav("/Account/Register");
                }}
                className={cx("register")}
              >
                
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
