import React, { useState } from "react";
import "./MainPageDatVe.scss";
import { useDispatch, useSelector } from "react-redux";
import { chonGhe, datVe } from "../redux/danhSachSlice";

const MainPageDatVe = () => {
  const { gheData, gheDangDat } = useSelector((state) => state.danhSachSlice);
  const [datVeComplete, setDatVeComplete] = useState(false);
  const dispatch = useDispatch();
  const handleGhe = (ghe) => {
    if (!datVeComplete) {
      dispatch(chonGhe(ghe));
    }
  };
  const handleDatGhe = () => {
    dispatch(datVe());
    setDatVeComplete(true);
  };
  const total = gheDangDat.reduce((sum, ghe) => sum + ghe.gia, 0);

  return (
    <div className="main">
      <div className="main_cover">
        <div className="container">
          <div className="content">
            <div className="seat">
              <h1>ĐẶT VÉ XEM PHIM CYBERLEARN.VN</h1>
              <p>Màn hình</p>
              <div className="screen"></div>
              {gheData.map((row, rowIndex) => (
                <div className="seat_info" key={rowIndex}>
                  <span className="rowNumber">{row.hang}</span>
                  {row.danhSachGhe.map((ghe, gheIndex) => {
                    const isSelected = gheDangDat.find(
                      (item) => item.soGhe === ghe.soGhe
                    );
                    if (rowIndex == 0) {
                      return (
                        <span key={gheIndex} className="rowNumber">
                          {ghe.soGhe}
                        </span>
                      );
                    } else if (ghe.daDat) {
                      return (
                        <button className="gheDuocChon" key={gheIndex} disabled>
                          {ghe.soGhe}
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className={isSelected ? "gheDangChon" : "ghe"}
                          key={gheIndex}
                          onClick={() => handleGhe(ghe)}
                          disabled={datVeComplete}
                        >
                          {ghe.soGhe}
                        </button>
                      );
                    }
                  })}
                </div>
              ))}
              <button
                onClick={handleDatGhe}
                className="py-1 px-5 bg-green-500 text-xl text-white rounded"
                disabled={datVeComplete}
              >
                Đặt vé
              </button>
            </div>
            <div className="price">
              <h1>DANH SÁCH GHẾ BẠN CHỌN</h1>
              <div className="ghe_info">
                <button className="gheDuocChon" disabled></button>
                <span>Ghế đã đặt</span>
              </div>
              <div className="ghe_info">
                <button className="gheDangChon" disabled></button>
                <span>Ghế đang đặt</span>
              </div>
              <div className="ghe_info">
                <button className="ghe" disabled></button>
                <span>Ghế chưa chọn</span>
              </div>
              <table border={2} className="mt-5">
                <thead>
                  <tr>
                    <th>Số ghế</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {gheDangDat.map((ghe, index) => (
                    <tr key={index}>
                      <td>{ghe.soGhe}</td>
                      <td>{ghe.gia}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>Tổng giá tiền</td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageDatVe;
