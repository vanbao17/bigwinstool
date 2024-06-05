import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import images from "../../../Assets";
import ItemGamePercent from "./ItemGamePercent";
import Popup from "../../Popup/Popup";
import { useMediaQuery } from "react-responsive";
const cx = classNames.bind(styles);
function Home() {
  const navigate = useNavigate();
  const [classes, setclasses] = useState([]);
  const [games, setgames] = useState([]);
  const [statepopup, setstatepopup] = useState(false);
  const handlePopup = () => {
    setstatepopup(!setstatepopup);
  };
  const refPassword = useRef();

  const handleChooseRoom = (idClass) => {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ idClass }),
    };
    fetch("https://toolslot.site/api/v1/getGameWithClassState", options)
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined) {
          setgames(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAdd = () => {
    let username = sessionStorage.getItem("username");
    let password = refPassword.current.value;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username }),
    };
    fetch("https://toolslot.site/api/v1/findwithusername", options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data != undefined || data.length != 0) {
          const iduser = data[0].id_user;
          const options1 = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ password, iduser }),
          };
          fetch("https://toolslot.site/api/v1/updatePassword", options1)
            .then((response1) => {
              if (response1.status == 200) {
                setstatepopup(!setstatepopup);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetch("https://toolslot.site/api/v1/getclass")
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined) {
          setclasses(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const userSession = sessionStorage.getItem("username");

    if (!userSession) {
      navigate("/Account");
    } else {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div
      className={cx("wrapper")}
      style={{ backgroundImage: `url(${images.background})` }}
    >
      {statepopup == true ? (
        <Popup>
          <div className={cx("container_input")}>
            <span>Nhập mật khẩu mới Ít nhất 2 ký tự*</span>
            <input
              ref={refPassword}
              type="text"
              className={cx("username")}
              name="username"
            ></input>
          </div>
          <div
            className={cx("container_btn")}
            style={{ width: "100%", display: "flex" }}
          >
            <button onClick={handleAdd} className={cx("update")}>
              <span>Thêm</span>
            </button>
            <button onClick={handlePopup} className={cx("close")}>
              <span>Hủy</span>
            </button>
          </div>
        </Popup>
      ) : (
        <></>
      )}
      <div className={cx("container")}>
        <div className={cx("actions")}>
          <div
            className={cx("action1")}
            onClick={() => {
              setstatepopup(!statepopup);
            }}
          >
            <img src={images.action} alt="Example" />
            <span>Đổi mật khẩu</span>
          </div>
          <div
            className={cx("action2")}
            onClick={() => {
              sessionStorage.clear();
              navigate("/Account");
            }}
          >
            <img src={images.action} alt="Example" />
            <span>Đăng xuất</span>
          </div>
        </div>
        <div className={cx("classes")}>
          {classes.map((cls, index) => {
            return (
              <div
                key={index}
                className={cx("class_item")}
                onClick={() => {
                  handleChooseRoom(cls.id_class);
                }}
              >
                <img src={images.class} alt="Example" />
                <span>{cls.name_class}</span>
              </div>
            );
          })}
        </div>
        {games.length != 0 ? (
          <div className={cx("game_percent")}>
            {games.map((game, index) => {
              return <ItemGamePercent key={index} data={game} />;
            })}
          </div>
        ) : (
          <span className={cx("trainning")}>Vui lòng chọn phòng </span>
        )}
      </div>
    </div>
  );
}

export default Home;
