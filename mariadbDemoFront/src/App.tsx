import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { Reservation } from "./interfaces/Reservations";
import { asyncGet } from "./utils/fetch";
import { apis } from "./enum/api";
import "./style.css"; 

const App: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    asyncGet(apis.test).then((resp: Reservation[]) => {
      setReservations(resp);
    });
  }, []);

  const columns: ColumnsType<Reservation> = [
    { title: "預約編號", dataIndex: "reservation_id", key: "reservation_id" },
    { title: "學生編號", dataIndex: "student_id", key: "student_id" },
    { title: "座位編號", dataIndex: "seat_id", key: "seat_id" },
    { title: "時段編號", dataIndex: "timeslot_id", key: "timeslot_id" },
    { title: "創建時間", dataIndex: "create_time", key: "create_time" },
  ];

  return (
    <div className="container">
      <Table dataSource={reservations} columns={columns} bordered className="table" />
    </div>
  );
};

export default App;
