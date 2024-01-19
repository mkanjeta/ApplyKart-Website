import React, { useState } from "react";
import Checkbox from "./Checkbox";
import { TimeSchedule } from "constants/constants";
import { useDispatch } from "react-redux";
import TimePicker from "react-time-picker/dist/entry.nostyle";

export default function CheckBoxList({
  options,
  isCheckedAll,
  onCheck,
  onSelect,
  onClick,
  type,
  viewType,
  hideSelectAll,
  hideTime
}) {
  onClick = (event) => {
    event.preventDefault();
    const data = checkList.filter((item) => {
      return item.checked;
    });
    Router.push({
      pathname: "/vcard/intro-video",
    });
  };

  const checkBoxOptions = (
    <div className="row">
      {options.map((option, index) => {
        return (
          <div className={viewType ? viewType : "col-lg-6"} key={index}>
            <div className="form-group" style={{ marginBottom: 40 }}>
              <Checkbox
                key={index}
                name={option.name}
                value={option.value}
                tick={option.checked}
                onCheck={(e) => onCheck(option.value, e.target.checked)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {hideSelectAll ? <div className="select_all">{checkBoxOptions}</div> : 
      <div className="select_all">
        <Checkbox
          name="Select All"
          value="ALL"
          tick={isCheckedAll}
          onCheck={(e) => onCheck("all", e.target.checked)}
        />
        {checkBoxOptions}
      </div>}
    </>

  );
}
