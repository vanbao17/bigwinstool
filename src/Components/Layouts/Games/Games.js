import classNames from "classnames/bind";
import styles from "./Games.module.scss";
import { useEffect, useRef, useState } from "react";
import Popup from "../../Popup/Popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ItemRow from "./ItemRow";
const cx = classNames.bind(styles);
function Games() {
  const [datauser, setdatauser] = useState([]);
  const [st, setst] = useState(false);
  const refNameClass = useRef();
  const [classes, setclasses] = useState([]);
  const selectRef = useRef();
  const refImage = useRef();
  const refMin = useRef();
  const refMax = useRef();
  const handlePage = (state) => {
    setst(!st);
  };
  const [statepopup, setstatepopup] = useState(false);
  const handlePopup = () => {
    setstatepopup(!setstatepopup);
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
  const handleAdd = () => {
    let namegame = refNameClass.current.value;
    let image = refImage.current.value;
    let min = refMin.current.value;
    let max = refMax.current.value;
    let idclass = selectRef.current.value;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ namegame, image, min, max, idclass }),
    };
    fetch("https://toolslot.site/api/v1/addgame", options)
      .then((response) => {
        if (response.status == 200) {
          setstatepopup(!setstatepopup);
          fetch("https://toolslot.site/api/v1/getgame")
            .then((response) => response.json())
            .then((data) => {
              if (data != undefined) {
                setdatauser(data);
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
  const handleChangeSearch = (e) => {
    let namegame = e.target.value;
    if (namegame.length > 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ namegame }),
      };
      fetch("https://toolslot.site/api/v1/findgame", options)
        .then((response) => response.json())
        .then((data) => {
          if (data != undefined) {
            setdatauser(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch("https://toolslot.site/api/v1/getgame")
        .then((response) => response.json())
        .then((data) => {
          if (data != undefined) {
            setdatauser(data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetch("https://toolslot.site/api/v1/getgame")
      .then((response) => response.json())
      .then((data) => {
        if (data != undefined) {
          setdatauser(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [st]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("row2")}>
        <span>Quản lý games</span>
        <div
          className={cx("addclass")}
          onClick={() => {
            setstatepopup(!statepopup);
          }}
        >
          <span>Thêm mới tại đây </span>
        </div>
        {statepopup == true ? (
          <Popup>
            <div className={cx("container_input")}>
              <span>Nhập tên game</span>
              <input
                ref={refNameClass}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Nhập giá trị min</span>
              <input
                ref={refMin}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Nhập giá trị max</span>
              <input
                ref={refMax}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Nhập Link ảnh</span>
              <input
                ref={refImage}
                type="text"
                className={cx("username")}
                name="username"
              ></input>
            </div>
            <div className={cx("container_input")}>
              <span>Chọn phòng</span>
              <select className={cx("combobox")} id="combo" ref={selectRef}>
                {classes.map((cls, index) => {
                  return (
                    <option key={index} value={cls.id_class}>
                      {cls.name_class}
                    </option>
                  );
                })}
              </select>
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
      </div>

      <div className={cx("container_data")}>
        <div className={cx("container_search")}>
          <div className={cx("icon")}>
            <FontAwesomeIcon icon="search" />
          </div>
          <input
            onChange={handleChangeSearch}
            type="check"
            className={cx("search")}
            placeholder="Nhập từ cần tìm"
          ></input>
        </div>
        <table>
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Tên game</th>
              <th style={{ width: "15%" }}>Khoảng min - max</th>
              <th style={{ width: "30%" }}>Thuộc</th>
              <th style={{ width: "10%" }}>Trạng thái</th>
              <th style={{ width: "10%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {datauser !== undefined &&
              datauser.length !== 0 &&
              datauser.map((user, index) => {
                return (
                  <ItemRow key={index} data={user} statePage={handlePage} />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Games;
