import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./Admin.module.scss";
import { useContext, useState } from "react";
import PopupUpPass from "./PopupUpPass";
import { Context } from "../../../store/Context";
const cx = classNames.bind(styles);
function ItemRow({ data, statePage }) {
  const [state, setstate] = useState(false);
  const [state1, setstate1] = useState(false);
  const [statepopup, setstatepopup] = useState(false);
  const { backgroundblack, setbackgroundblack } = useContext(Context);
  const handleUpdateAccu = () => {
    let idaccu = 0;
    let iduser = data.id_user;
    if (data.accuracy == 0) {
      idaccu = 1;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ iduser, idaccu }),
    };
    fetch("https://toolslot.site/api/v1/updateAccuracy", options)
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
  const handleDelete = () => {
    const iduser = data.id_user;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ iduser }),
    };
    fetch("https://toolslot.site/api/v1/deleteuser", options)
      .then((response) => {
        if (response.status == 200) {
          statePage(state1);
          setstate1(!state1);
          setstatepopup(false);
          setstate(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePopup = (state) => {
    setstatepopup(state);
    setbackgroundblack(state);
  };
  const handleUpdateState = () => {
    let idst = 0;
    let iduser = data.id_user;
    if (data.state == 0) {
      idst = 1;
    }
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ iduser, idst }),
    };
    fetch("https://toolslot.site/api/v1/updateState", options)
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
      <td>{data.username}</td>
      <td>{data.sdt}</td>
      <td>{data.accuracy == 1 ? "Đã xác thực" : "Chưa xác thực"}</td>
      <td>{data.state == 1 ? "Đang hoạt động" : "Khoá"}</td>
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
            <li onClick={handleUpdateAccu}>
              {data.accuracy == 1 ? "Hủy xác thực" : "Xác thực ngay"}
            </li>
            <li onClick={handleUpdateState}>
              {data.state == 1 ? "Khóa tài khoản" : "Mở Khóa"}
            </li>
            <li
              onClick={() => {
                setstatepopup(!statepopup);
                setbackgroundblack(!backgroundblack);
              }}
            >
              Đổi mật khẩu
            </li>
            <li onClick={handleDelete}>Xóa</li>
          </ul>
        ) : (
          <></>
        )}
      </td>
      {statepopup == true ? (
        <PopupUpPass handleClosePopup={handlePopup} iduser={data.id_user} />
      ) : (
        <></>
      )}
    </tr>
  );
}

export default ItemRow;
