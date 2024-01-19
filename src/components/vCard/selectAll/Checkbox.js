import React from "react";
import { BASE_URL } from "constants/constants";

export default function Checkbox({ name, value, tick, onCheck }) {
  // console.log("name ==>>", name)
  // console.log("value ==>>", value)
  // console.log("tick ==>>", tick)
  // console.log("on Check ==>>", onCheck)
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name={name}
        id={value}
        value={value}
        checked={tick || false}
        onChange={onCheck}
      />
      <label className="form-check-label" htmlFor={value}>
        <span className="icon">
          <img
            src={"/assets/images/icons/checkbox/inactive.svg"}
            alt="icon"
          />
          <img
            src={"/assets/images/icons/checkbox/active.svg"}
            alt="icon"
          />
        </span>
        <div className="text">{name}</div>
      </label>
    </div>
  );
}
