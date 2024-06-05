import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Games.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../store/Context";
import PopupUpPass from "../Admin/PopupUpPass";
import Popup from "../../Popup/Popup";
const cx = classNames.bind(styles);
function ItemRow({ data, statePage }) {
  const [state, setstate] = useState(false);
  const [test, settest] = useState(null);
  const [test1, settest1] = useState(null);
  const [test2, settest2] = useState(null);
  const [test3, settest3] = useState(null);
  const [test4, settest4] = useState(null);
  const [classes, setclasses] = useState([]);
  const [state1, setstate1] = useState(false);
  const [statepopup, setstatepopup] = useState(false);
  const refNameClass = useRef();
  const refImage = useRef();
  const refMin = useRef();
  const refMax = useRef();
  const selectRef = useRef();
  const handleInputClick = (e, data) => {
    setIsEditable(true);
    e.target.value = data;
    refNameClass.current.removeAttribute("readOnly");
  };
  const [isEditable, setIsEditable] = useState(false);
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
  const handleDelete = () => {
    const idgame = data.id_game;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ idgame }),
    };
    fetch("https://toolslot.site/api/v1/deletegame", options)
      .then((response) => {
        if (response.status == 200) {
          statePage(state1);
          setstate1(!state1);
          setstatepopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUpdateClass = () => {
    let namegame = refNameClass.current.value;
    let image = refImage.current.value;
    let min = refMin.current.value;
    let max = refMax.current.value;
    let idclass = selectRef.current.value;
    let id_game = data.id_game;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ namegame, image, min, max, idclass, id_game }),
    };
    fetch("https://toolslot.site/api/v1/updateGame", options)
      .then((response) => {
        if (response.status == 200) {
          statePage(state1);
          setstate1(!state1);
          setstatepopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePopup = (state) => {
    setstatepopup(state);
  };
  const handleUpdateState = () => {
    let idst = 0;
    let idgame = data.id_game;
    if (data.state == 0) {
      idst = 1;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ idgame, idst }),
    };
    fetch("https://toolslot.site/api/v1/updateGameState", options)
      .then((response) => {
        if (response.status == 200) {
          statePage(state1);
          setstate1(!state1);
          setstatepopup(!statepopup);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <td>{data.name_game}</td>
      <td>
        {" "}
        {data.min} - {data.max}
      </td>
      <td> a96888a6-aa37-4586-bd33-85dce65b1a4d</td>
      <td>{data.state == 1 ? "Hiển thị" : "Ẩn"}</td>
      <td>
        <div
          className={cx("icon")}
          onClick={() => {
            setstate(!state);
          }}
        >
          <FontAwesomeIcon icon="ellipsis-v" />
        </div>
        {state == true ? (
          <ul className={cx("combobox_item")}>
            <li onClick={handleUpdateState}>
              {data.state == 1 ? "Ẩn" : "Hiển thị"}
            </li>
            <li
              onClick={() => {
                setstatepopup(!statepopup);
              }}
            >
              Cập nhật
            </li>
            <li onClick={handleDelete}>Xóa</li>
          </ul>
        ) : (
          <></>
        )}
      </td>
      {statepopup == true ? (
        <Popup>
          <div className={cx("container_input")}>
            <span>Nhập tên game</span>
            <input
              ref={refNameClass}
              type="text"
              className={cx("username")}
              name="username"
              value={test == null ? data.name_game : test}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.name_game);
              }}
              onChange={(e) => settest(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Nhập giá trị min</span>
            <input
              ref={refMin}
              type="text"
              className={cx("username")}
              name="username"
              value={test1 == null ? data.min : test1}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.min);
              }}
              onChange={(e) => settest1(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Nhập giá trị max</span>
            <input
              ref={refMax}
              type="text"
              className={cx("username")}
              name="username"
              value={test2 == null ? data.max : test2}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.max);
              }}
              onChange={(e) => settest2(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Nhập Link ảnh</span>
            <input
              ref={refImage}
              type="text"
              className={cx("username")}
              name="username"
              value={test3 == null ? data.link_image : test3}
              readOnly={!isEditable}
              onClick={(e) => {
                handleInputClick(e, data.link_image);
              }}
              onChange={(e) => settest3(e.target.value)}
            ></input>
          </div>
          <div className={cx("container_input")}>
            <span>Chọn phòng</span>
            <select className={cx("combobox")} id="combo" ref={selectRef}>
              {classes.map((cls, index) => {
                if (data.id_class == cls.id_class) {
                  <option selected key={index} value={cls.id_class}>
                    {cls.name_class}
                  </option>;
                }
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
            <button onClick={handleUpdateClass} className={cx("update")}>
              <span>Sửa</span>
            </button>

            <button onClick={handlePopup} className={cx("close")}>
              <span>Hủy</span>
            </button>
          </div>
        </Popup>
      ) : (
        <></>
      )}
    </tr>
  );
}

export default ItemRow;
