import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Class.module.scss";
import { useContext, useRef, useState } from "react";
import { Context } from "../../../store/Context";
import PopupUpPass from "../Admin/PopupUpPass";
import Popup from "../../Popup/Popup";
const cx = classNames.bind(styles);
function ItemRow({ data, statePage }) {
  const [state, setstate] = useState(false);
  const [state1, setstate1] = useState(false);
  const [statepopup, setstatepopup] = useState(false);
  const refNameClass = useRef();
  const handleUpdateClass = () => {
    let nameclass = refNameClass.current.value;
    let idclass = data.id_class;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ idclass, nameclass }),
    };
    fetch("https://toolslot.site/api/v1/updateNameClass", options)
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
  const handleDelete = () => {
    const idclass = data.id_class;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ idclass }),
    };
    fetch("https://toolslot.site/api/v1/deleteclass", options)
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
    let idclass = data.id_class;
    if (data.state == 0) {
      idst = 1;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ idclass, idst }),
    };
    fetch("https://toolslot.site/api/v1/updateStateClass", options)
      .then((response) => {
        if (response.status == 200) {
          statePage(state1);
          setstate1(!state1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <tr>
      <td>{data.name_class}</td>
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
            <span>Nhập tên mới cho room*</span>
            <input
              ref={refNameClass}
              type="text"
              className={cx("username")}
              name="username"
            ></input>
          </div>
          <div
            className={cx("container_btn")}
            style={{ width: "100%", display: "flex" }}
          >
            <button onClick={handleUpdateClass} className={cx("update")}>
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
    </tr>
  );
}

export default ItemRow;
