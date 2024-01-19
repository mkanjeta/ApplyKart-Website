import React, { useEffect } from 'react';
import ModalLayout from './modalLayout';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_EXPERIENCE_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';
import * as action from "../../redux/actions/myProfileActions";
import { getDiffrenceBetweenMonths } from 'CommonHelper';
import ReactDatePicker from 'react-datepicker';
import { corruptedDateFormat } from 'constants/constants';
import moment from 'moment';


function EditExperienceModal(props) {
    const { data, allItem } = props;
    const dispatch = useDispatch();
    const [startDate, setStartDate] = useState(new Date("2014/02/08"));
    const [endDate, setEndDate] = useState(new Date("2014/02/10"));
    const { updateExperience } = useSelector(({ myProfileReducer }) => myProfileReducer);
    const [fields, setFields] = useState([
        {
            id: 1,
            companyName: "",
            jobRole: "",
            jobSpecialization: "",
            startDate: "",
            endDate: "",
            isCurrentlyWork: false,

            companyNameError: null,
            jobRoleError: null,
            jobSpecializationError: null,
            startDateError: null,
            endDateError: null,
            isCurrentlyWorkError: null,
        },
    ]);
    // console.log("fields ==>>", fields)
    const handleAddField = () => {
        const newId = fields.length + 1;
        setFields([...fields, {
            id: newId,
            companyName: "",
            jobRole: "",
            jobSpecialization: "",
            startDate: "",
            endDate: "",
            isCurrentlyWork: false,

            companyNameError: null,
            jobRoleError: null,
            jobSpecializationError: null,
            startDateError: null,
            endDateError: null,
            isCurrentlyWorkError: null,
        }]);
    };
    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };
    const handleCompanyNameChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, companyName: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleJobRoleChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, jobRole: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleJobSpecializationChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, jobSpecialization: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleStartDateChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, startDate: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleEndDateChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, endDate: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleIsCurrentlyWorkChange = (id, value) => {
        // console.log(id)
        const newFields = fields.map((field) => {
            // console.log(field.id)
            if (field.id === id) {
                return { ...field, isCurrentlyWork: value };
            }
            return field;
        });
        setFields(newFields);
    };
    useEffect(() => {
        if (data.length > 0) {
            let newArr = [];
            data.forEach((item, i) => {
                let obj = {
                    id: i,
                    companyName: item?.company,
                    jobRole: item?.role,
                    jobSpecialization: item?.specialisation,
                    startDate: moment(item?.start_date).format('YYYY-MM-DD'),
                    endDate: item?.end_date && item?.end_date !== corruptedDateFormat ? moment(item?.end_date).format('YYYY-MM-DD') : '',
                    isCurrentlyWork: item?.end_date && item?.end_date !== corruptedDateFormat ? true : false,
                }
                newArr.push(obj);
            })
            setFields(newArr);
        }
    }, [data, allItem])

    function convertToYears(months) {
        if(months == 0) {
            return `0 years`
        } else if(months > 0) {
            const floorYears = Math.floor(months / 12);
            const floorMonths = months % 12;

            return `${floorYears} Years ${floorMonths} Months`
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = [];
        const newFields = fields.map((field) => {
            let companyNameError = null;
            let jobRoleError = null;
            let jobSpecializationError = null;
            let startDateError = null;
            let endDateError = null;
            let isCurrentlyWorkError = null;
            if (!field.companyName.trim()) {
                companyNameError = 'Company Name is required';
            }
            if (!field.jobRole.trim()) {
                jobRoleError = 'Job Role is required';
            }
            if (!field.jobSpecialization.trim()) {
                jobSpecializationError = 'Job Specialization is required';
            }
            if (!field.startDate) {
                startDateError = 'Start Date is required';
            }
            if (!field.endDate && !field.isCurrentlyWork) {
                endDateError = 'End Date is required';
            }
            if (!field.isCurrentlyWork && !field.endDate) {
                isCurrentlyWorkError = 'Working currently is required';
            }
            if (companyNameError || jobRoleError || jobSpecializationError || startDateError || endDateError || isCurrentlyWorkError) {
                errors.push({ id: field.id, companyNameError, jobRoleError, jobSpecializationError, startDateError, endDateError, isCurrentlyWorkError });
            }
            return { ...field, companyNameError, jobRoleError, jobSpecializationError, startDateError, endDateError, isCurrentlyWorkError };
        });
        setFields(newFields);
        if (errors.length === 0) {
            let exp = [];
            // console.log("newFields ==>>", newFields)

            newFields.map((item, i) => {
                const endDateCal = item?.isCurrentlyWork ? moment(new Date()).format('YYYY-MM-DD') : item?.endDate;
                let expObj = {
                    "months": convertToYears(getDiffrenceBetweenMonths(item?.startDate, endDateCal)),
                    "company": item?.companyName,
                    "role": item?.jobRole,
                    "specialisation": item?.jobSpecialization,
                    "start_date": item?.startDate,
                    "end_date": endDateCal
                }
                exp.push(expObj)
            })
            let obj = {
                "user_id": allItem?.user_Id,
                "visa_type": allItem?.visa_type,
                "worked_before": newFields?.length > 0 ? 1 : 0,
                "work_experience": exp,
            }

            // console.log(obj)
            dispatch(action.putUpdateExperience(obj));
        }
    };
    useEffect(() => {
        if (updateExperience?.success) {
            setFields([
                {
                    id: 1,
                    companyName: "",
                    jobRole: "",
                    jobSpecialization: "",
                    startDate: "",
                    endDate: "",
                    isCurrentlyWork: false,

                    companyNameError: null,
                    jobRoleError: null,
                    jobSpecializationError: null,
                    startDateError: null,
                    endDateError: null,
                    isCurrentlyWorkError: null,
                },
            ]);
            props.action();
            dispatch({ type: UPDATE_EXPERIENCE_CLEAR })
        }
    }, [updateExperience?.success]);
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <form className='form_box' onSubmit={handleSubmit}>
                <div className="timeline-modal-layout">
                    <h4 className='title-header d-flex align-items-center justify-content-between'>Edit work experience
                        <button type="button" className="btn btn-primary" onClick={handleAddField}>
                            Add more <i className='icon-plus' />
                        </button>
                    </h4>
                    <div className="p-4">

                        <div className="row">
                            {fields.map((field) => (
                                <div key={field.id} className="col-12 position-relative" style={{ borderBottom: '1px solid', marginBottom: '30px', paddingBottom: '10px' }}>
                                    <div className="form-group">
                                        <label htmlFor={`companyName-${field.id}`} className='text-black'>Company name</label>
                                        <input
                                            type="text"
                                            id={`companyName-${field.id}`}
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="Company name"
                                            value={field.companyName}
                                            onChange={(e) => handleCompanyNameChange(field.id, e.target.value)}
                                        />
                                        {field.companyNameError && <div className="invalid-feedback d-block">{field.companyNameError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`jobRole-${field.id}`} className='text-black'>Job role</label>
                                        <input
                                            type="text"
                                            id={`jobRole-${field.id}`}
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="Job role"
                                            value={field.jobRole}
                                            onChange={(e) => handleJobRoleChange(field.id, e.target.value)}
                                        />
                                        {field.jobRoleError && <div className="invalid-feedback d-block">{field.jobRoleError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`jobSpecialization-${field.id}`} className='text-black'>Job specialization</label>
                                        <input
                                            type="text"
                                            id={`jobSpecialization-${field.id}`}
                                            className="form-control"
                                            autoComplete="off"
                                            placeholder="Job specialization"
                                            value={field.jobSpecialization}
                                            onChange={(e) => handleJobSpecializationChange(field.id, e.target.value)}
                                        />
                                        {field.jobSpecializationError && <div className="invalid-feedback d-block">{field.jobSpecializationError}</div>}
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor={`startDate-${field.id}`} className='text-black'>Start date</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="Start date"
                                                    type="date"
                                                    id={`startDate-${field.id}`}
                                                    name="trip-start"
                                                    value={field?.startDate || ''}
                                                    onChange={(e) => {
                                                        handleStartDateChange(field.id, moment(e?.target?.value).format('YYYY-MM-DD'));
                                                    }}
                                                ></input>
                                                {/* <ReactDatePicker
                                                    id={`startDate-${field.id}`}
                                                    selected={field.startDate}
                                                    onChange={(date) => handleStartDateChange(field.id, date)}
                                                    selectsStart
                                                    startDate={field.startDate}
                                                    endDate={field.endDate}
                                                    maxDate={new Date()}
                                                    className="form-control"
                                                    placeholderText="mm/dd/yyyy"
                                                    disabledKeyboardNavigation 
                                                    onKeyDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                /> */}
                                                {field.startDateError && <div className="invalid-feedback d-block">{field.startDateError}</div>}
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor={`endDate-${field.id}`} className='text-black'>End date</label>
                                                <input
                                                    id={`endDate-${field.id}`}
                                                    className="form-control"
                                                    placeholder="End date"
                                                    type="date"
                                                    name="trip-start"
                                                    value={field?.endDate || ''}
                                                    onChange={(e) => {
                                                        handleEndDateChange(field.id, moment(e?.target?.value).format('YYYY-MM-DD'));
                                                    }}
                                                ></input>
                                                {/* <ReactDatePicker
                                                    id={`endDate-${field.id}`}
                                                    selected={field.endDate}
                                                    onChange={(date) => handleEndDateChange(field.id, date)}
                                                    selectsEnd
                                                    startDate={field.startDate}
                                                    endDate={field.endDate}
                                                    minDate={field.startDate}
                                                    maxDate={new Date()}
                                                    className="form-control"
                                                    placeholderText="mm/dd/yyyy"
                                                    disabledKeyboardNavigation
                                                    onKeyDown={(e) => {
                                                        e.preventDefault();
                                                    }}
                                                /> */}
                                                {field.endDateError && <div className="invalid-feedback d-block">{field.endDateError}</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`isCurrentlyWork-${field.id}`} className='text-black custom-checkbox-type'>
                                            <input
                                                type="checkbox"
                                                id={`isCurrentlyWork-${field.id}`}
                                                name={`isCurrentlyWork-${field.id}`}
                                                onChange={(e) => handleIsCurrentlyWorkChange(field.id, e.target.checked)}
                                                checked={field.isCurrentlyWork}
                                            />

                                            <span className='checkmark' />
                                            Working currently
                                        </label>

                                        {field.isCurrentlyWorkError && <div className="invalid-feedback d-block">{field.isCurrentlyWorkError}</div>}
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm btn-circle fs-3"
                                        style={{ position: 'absolute', top: '-20px', right: '10px' }}
                                        onClick={() => handleRemoveField(field.id)}
                                    >
                                        <i className='bi-x ms-0' />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="buttons-area justify-content-end">
                        <div className="action-buttons">
                            <button type="button" className="btn btn-transparent" onClick={props.action}>Cancel</button>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </form>

        </ModalLayout>
    );
}

export default EditExperienceModal;