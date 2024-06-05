import classNames from "classnames/bind";
import styles from "./Class.module.scss";
import { useEffect, useRef, useState } from "react";
import ItemRow from "./ItemRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "../../Popup/Popup";
const cx = classNames.bind(styles);
function Class() {
  const [datauser, setdatauser] = useState([]);
  const [st, setst] = useState(false);
  const refNameClass = useRef();
  const handlePage = (state) => {
    setst(!st);
  };
  const [statepopup, setstatepopup] = useState(false);
  const handlePopup = () => {
    setstatepopup(!setstatepopup);
  };

  const handleAdd = () => {
    let nameclass = refNameClass.current.value;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ nameclass }),
    };
    fetch("https://toolslot.site/api/v1/addclass", options)
      .then((response) => {
        if (response.status == 200) {
          setstatepopup(!setstatepopup);
          fetch("https://toolslot.site/api/v1/getclass")
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
    let nameclass = e.target.value;
    if (nameclass.length > 0) {
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nameclass }),
      };
      fetch("https://toolslot.site/api/v1/findclass", options)
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
      fetch("https://toolslot.site/api/v1/getclass")
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
    fetch("https://toolslot.site/api/v1/getclass")
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
        <span>Quản lý phòng</span>
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
              <span>Nhập mật khẩu mới Ít nhất 2 ký tự*</span>
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
              <th style={{ width: "35%" }}>Phòng</th>
              <th style={{ width: "35%" }}>Trạng thái</th>
              <th style={{ width: "30%" }}>Action</th>
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

export default Class;
