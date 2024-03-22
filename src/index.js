import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import StarRating from "./components/StarRating";
// import reportWebVitals from './reportWebVitals';
function Test() {
  const [testRating, setTestRating] = useState(0);
  return (
    <div>
      <StarRating color="blue" passRating={setTestRating} />
      <p>This movie was rated {testRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={5} showMessage />
    <StarRating size={24} color="red" showMessage />
    <Test/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
