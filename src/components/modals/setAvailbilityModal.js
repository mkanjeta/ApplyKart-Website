import React from 'react';
import ModalLayout from './modalLayout';
import { WeekSchedule } from "../../constants/constants";
import Checkboxlist from "../vCard/selectAll/Checkboxlist";
import { useState } from 'react';
import { useEffect } from 'react';
import { UPDATE_JOB_AVAILABILITY_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';
import * as action from "../../redux/actions/myProfileActions";
import { useDispatch, useSelector } from 'react-redux';


function SetAvailabilityModal(props) {
    const { allData } = props;
    const dispatch = useDispatch();
    const [error, setError] = useState(false);
    const [state, setState] = useState({ isAllSelected: false, checkList: WeekSchedule });
    const { updateJobAvailability } = useSelector(({ myProfileReducer }) => myProfileReducer);
    const onCheckBoxChange = (checkName, isChecked) => {
        let isAllChecked = checkName === "all" && isChecked;
        let isAllUnChecked = checkName === "all" && !isChecked;
        const checked = isChecked;
        const checkList = state.checkList.map((city, index) => {
            if (isAllChecked || city.value === checkName) {
                return Object.assign({}, city, {
                    checked,
                });
            } else if (isAllUnChecked) {
                return Object.assign({}, city, {
                    checked: false,
                });
            }
            return city;
        });

        let isAllSelected =
            checkList.findIndex((item) => item.checked === false) === -1 ||
            isAllChecked;
        setState({
            ...state,
            checkList,
            isAllSelected,
        });
        const filterCheckbox = checkList.filter((elm) => elm.checked == true);
        if (filterCheckbox?.length > 0) {
            setError(false);
        } else {
            setError(true);
        }
    }
    useEffect(() => {
        if (allData) {
            // console.log("all data ==>>", allData)
            // const availabilityData = allData?.availablity?.split(",");
            // console.log("availabilityData ==>>", availabilityData)
            const weekDays = [...state?.checkList];

            const availableWeekDays = weekDays?.map((item, index) => {
                if(allData?.availablity?.includes(item?.value)) {
                    return {
                        value: item?.value,
                        name: item?.name,
                        checked: true
                    }
                }
                return item;
            })

            setState({
                ...state,
                checkList: [...availableWeekDays]
            })
            // const array = Object.keys(availabilityData).map(key => {
            //     const value = availabilityData[key];
            //     const checked = value && value.from !== null && value.to !== null;
            //     return {
            //         value: key,
            //         name: key.charAt(0).toUpperCase() + key.slice(1),
            //         checked: checked
            //     };
            // });
            // const newArray = array.map(obj => {
            //     if (obj.checked === false) {
            //         obj.checked = true;
            //     }
            //     return obj;
            // });
            // setState({
            //     checkList: newArray,
            //     isAllSelected: false,
            // });
        }
    }, [allData])
    const handleSubmit = () => {
        const filterCheckbox = state.checkList.filter((elm) => elm.checked == true);
        if (filterCheckbox?.length > 0) {
            setError(false);
            // const checkedValues = {};
            // for (const obj of filterCheckbox) {
            //     if (obj.checked) {
            //         checkedValues[obj.value] = {
            //             from: null,
            //             to: null
            //         };
            //     }
            // }
            let availableDays = "";
            filterCheckbox.forEach((item, index) => {
                if(item?.checked && filterCheckbox?.length - 1 != index) {
                    availableDays = availableDays + item?.value + ","
                } else if(item?.checked && filterCheckbox?.length - 1 == index) {
                    availableDays = availableDays + item?.value
                }
            }) 

            // console.log("available days ==>>", availableDays)
            let obj = {
                "Availablity": availableDays
            }
            dispatch(action.putJobAvailability(obj));
        } else {
            setError(true);
        }
    }
    useEffect(() => {
        if (updateJobAvailability?.success) {
            dispatch({ type: UPDATE_JOB_AVAILABILITY_CLEAR })
            props.action();
            setError(false);
        }
    }, [updateJobAvailability?.success]);

    // console.log("state ==>>", state)
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>Set availability</h4>
                <div className="p-4">
                    <div className='setavailablity image_radio basic checkbox'>
                        <Checkboxlist
                            options={state.checkList}
                            isCheckedAll={state.isAllSelected}
                            onCheck={onCheckBoxChange}
                            viewType={"col-lg-12"}
                            hideTime={true}
                            hideSelectAll={true}
                        // onSelect={onHandleChangeFor}
                        />
                        {error ? 'Please Select at least one day' : null}
                    </div>
                </div>
                <div className="buttons-area justify-content-end">
                    <div className="action-buttons">
                        <button type="button" className="btn btn-transparent" onClick={props.action}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default SetAvailabilityModal;