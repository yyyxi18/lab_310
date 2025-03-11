import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Reservation } from "./interfaces/Reservations";
import { asyncGet } from "./utils/fetch";
import { apis } from "./enum/api";
import "./style.css";

const { Search } = Input;

const App: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredData, setFilteredData] = useState<Reservation[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  // 獲取 API 資料
  useEffect(() => {
    asyncGet(apis.test).then((resp: Reservation[]) => {
      setReservations(resp);
      setFilteredData(resp); // 預設顯示全部資料
    });
  }, []);

  // 處理搜尋
  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (value) {
      const filtered = reservations.filter((item) =>
        item.student_id.toString().includes(value)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(reservations); // 若輸入框為空，顯示全部資料
    }
  };

  // 表格欄位設定
  const columns: ColumnsType<Reservation> = [
    { title: "預約編號", dataIndex: "reservation_id", key: "reservation_id" },
    { title: "學生編號", dataIndex: "student_id", key: "student_id" },
    { title: "座位編號", dataIndex: "seat_id", key: "seat_id" },
    { title: "時段編號", dataIndex: "timeslot_id", key: "timeslot_id" },
    { title: "創建時間", dataIndex: "create_time", key: "create_time" },
  ];

  return (
    <div className="container">
      <div className="search-container">
        <Search
          placeholder="輸入學號查詢"
          allowClear
          enterButton="查詢"
          size="large"
          onSearch={handleSearch}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="table-container">
        <Table
          dataSource={filteredData.map((item) => ({ ...item, key: item.reservation_id }))}
          columns={columns}
          bordered
          className="table"
          pagination={{ pageSize: 10 }}
        />
      </div>
    </div>
  );
};

export default App;
