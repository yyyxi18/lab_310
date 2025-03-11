import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css"; // 保留原來的 CSS

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
