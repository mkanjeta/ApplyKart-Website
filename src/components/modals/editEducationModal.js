import React from 'react';
import ModalLayout from './modalLayout';
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { UPDATE_EDUCATION_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';
import * as action from "../../redux/actions/myProfileActions";

const validationSchema = Yup.object().shape({
    instituteName: Yup.string().required('Education is required'),
    specializationType: Yup.string().required('Specialization is required'),
    visaType: Yup.string().required('Visa type is required'),
});

const initialValues = {
    educationType: "",
    specializationType: "",
    visaType: "",
}

function EditEducationModal(props) {
    const { data, allItem } = props;
    const dispatch = useDispatch();
    const { updateEducation, allUniversities, allVisaList, allDegreeList } = useSelector(({ myProfileReducer }) => myProfileReducer);
    useEffect(() => {
        if (data.length > 0) {
            let newArr = [];
            data.forEach((item, i) => {
                let obj = {
                    id: i,
                    instituteName: item?.university || '',
                    specializationType: item?.education_Level_Id || '-',
                    visaType: allItem?.visa_type,
                }
                newArr.push(obj);
            })
            setFields(newArr)
        }
    }, [data])
    const [fields, setFields] = useState([
        {
            id: 1,
            instituteName: "",
            specializationType: "",
            visaType: "",

            instituteNameError: null,
            specializationTypeError: null,
            visaTypeError: null,
        },
    ]);
    const handleAddField = () => {
        const newId = fields.length + 1;
        setFields([...fields, {
            id: newId,
            instituteName: "",
            specializationType: "",
            visaType: "",

            instituteNameError: null,
            specializationTypeError: null,
            visaTypeError: null,
        }]);
    };
    const handleRemoveField = (id) => {
        setFields(fields.filter((field) => field.id !== id));
    };
    const handleInstituteNameChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, instituteName: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleSpecializationTypeChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, specializationType: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleVisaTypeChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, visaType: value };
            }
            return field;
        });
        setFields(newFields);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = [];
        const newFields = fields.map((field) => {
            let instituteNameError = null;
            let specializationTypeError = null;
            let visaTypeError = null;
            if (!field.instituteName.trim()) {
                instituteNameError = 'University Name is required';
            }
            if (!field.specializationType) {
                specializationTypeError = 'Specialization is required';
            }
            if (!field.visaType?.trim()) {
                visaTypeError = 'Visa Type is required';
            }
            if (instituteNameError || specializationTypeError || visaTypeError) {
                errors.push({ id: field.id, instituteNameError, specializationTypeError, visaTypeError });
            }
            return { ...field, instituteNameError, specializationTypeError, visaTypeError };
        });
        setFields(newFields);
        if (errors.length === 0) {
            let arr = [];
            newFields.map((item, i) => {
                let eduObj = {
                    "education_level": item?.specializationType,
                    "specialization": item?.specializationType,
                    "university": item?.instituteName,
                    "skills": "[]"
                }
                arr.push(eduObj)
            })
            let obj = {
                "user_id": allItem?.user_Id,
                "education_details": arr
            }
            dispatch(action.putUpdateEducation(obj));
        }
    }
    useEffect(() => {
        dispatch(action.getAllUniversityList({}));
        dispatch(action.getVisaList({}));
        dispatch(action.getDegreeList({}));
    }, []);
    useEffect(() => {
        if (updateEducation?.success) {
            setFields([
                {
                    id: 1,
                    instituteName: "",
                    specializationType: "",
                    visaType: "",

                    instituteNameError: null,
                    specializationTypeError: null,
                    visaTypeError: null,
                },
            ]);
            props.action();
            dispatch({ type: UPDATE_EDUCATION_CLEAR })
        }
    }, [updateEducation?.success]);
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <form className='form_box' onSubmit={handleSubmit}>
                <div className="timeline-modal-layout">
                    <h4 className='title-header d-flex align-items-center justify-content-between'>Edit education
                        <button type="button" className="btn btn-primary" onClick={handleAddField}>
                            Add more <i className='icon-plus' />
                        </button>
                    </h4>
                    <div className="p-4">

                        <div className="row">
                            {fields.map((field) => (
                                <div key={field.id} className="col-12 position-relative" style={{ borderBottom: '1px solid', marginBottom: '30px', paddingBottom: '10px' }}>
                                    <div className="form-group">
                                        <label htmlFor={`educationType-${field.id}`} className='text-black'>Select University/Institute/College</label>
                                        <select
                                            id={`educationType-${field.id}`}
                                            name="educationType"
                                            className="form-control form-select"
                                            autoComplete="off"
                                            value={field.instituteName}
                                            onChange={(e) => handleInstituteNameChange(field.id, e.target.value)}
                                        >
                                            <option value="" defaultValue="">Select</option>
                                            {allUniversities?.data?.map((item, i) => (
                                                <option value={item?.university} key={i}>{item?.university}</option>
                                            ))}
                                        </select>
                                        {field.instituteNameError && <div className="invalid-feedback d-block">{field.instituteNameError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`specializationType-${field.id}`} className='text-black'>Select specialization</label>
                                        <select
                                            id={`specializationType-${field.id}`}
                                            name="specializationType"
                                            className="form-control form-select"
                                            autoComplete="off"
                                            value={field.specializationType}
                                            onChange={(e) => handleSpecializationTypeChange(field.id, e.target.value)}
                                        >
                                            <option value="" defaultValue="">Select</option>
                                            {allDegreeList?.map((item, i) => (
                                                <option value={item?.education_Level_Id} key={i}>{item?.education_Level}</option>
                                            ))}
                                        </select>
                                        {field.specializationTypeError && <div className="invalid-feedback d-block">{field.specializationTypeError}</div>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor={`visaType-${field.id}`} className='text-black'>Visa type</label>
                                        <select
                                            id={`visaType-${field.id}`}
                                            name="visaType"
                                            className="form-control form-select"
                                            autoComplete="off"
                                            value={field.visaType}
                                            onChange={(e) => handleVisaTypeChange(field.id, e.target.value)}
                                        >
                                            <option value="" defaultValue="">Select</option>
                                            {allVisaList?.map((item, i) => (
                                                <option value={item?.visa_type} key={i}>{item?.visa_type}</option>
                                            ))}
                                        </select>
                                        {field.visaTypeError && <div className="invalid-feedback d-block">{field.visaTypeError}</div>}
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

export default EditEducationModal;