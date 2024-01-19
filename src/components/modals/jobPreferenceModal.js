import React, { useState } from 'react';
import ModalLayout from './modalLayout';
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from 'formik';
import MultiRangeSlider from 'components/shared/multiRangeSlider/MultiRangeSlider';
import MultiRange from 'components/shared/multiRangeSlider/MultiRange';
import { priceFormat, indianPriceFormat } from 'CommonHelper';
import Autocomplete from "react-google-autocomplete";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_JOB_PREFERENCE_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';
import * as action from "../../redux/actions/myProfileActions";
import { useEffect } from 'react';

const validationSchema = Yup.object().shape({
    jobType: Yup.string().required('Job Type is required'),
    jobPreference: Yup.string().required('Job Preference is required'),
    salaryRange: Yup.string().required('Salary Range is required'),
});

const initialValues = {
    jobType: "",
    jobPreference: "",
    salaryRange: "",
}
const salaryBaseData = [
    { id: 1, name: "Hourly" },
    { id: 2, name: "Weekly" },
    { id: 3, name: "Monthly" },
    { id: 4, name: "Annual" },
];

function JobPreferenceModal(props) {
    const { allData } = props;
    const dispatch = useDispatch(); 
    const [error, setError] = useState(null);
    const [address, setAddresses] = useState("");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [formData, setFormData] = useState(initialValues);
    const [range, setRange] = useState([allData?.minSalary, allData?.maxSalary]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(40000);
    const [countryCode, setCountryCode] = useState(null);
    const handleSubmit = async (values) => {
        let status = false;
        let errObj = { ...error };

        if (!address) {
            errObj["address"] = "Location Required";
            status = true;
        }
        if (status) {
            setError(errObj);
        } else {
            let obj = {
                "job_type": values.jobType,
                "Job_Preference":values?.jobPreference,
                "location": address?.formatted_address,
                "language": [],
                "latitude": address?.geometry?.viewport?.Ua?.hi,
                "longitude": address?.geometry?.viewport?.Ha?.hi,
                "base": values.salaryRange,
                "minSalary": range[0],
                "maxSalary": range[1]
            }
            dispatch(action.putJobPreference(obj));
        }

    }
    const handleReset = () => {
        // setFormData(initialValues);
    }
    const { allJobTypes, allJobPreferences, updateJobPreferences } = useSelector(({ myProfileReducer }) => myProfileReducer);
    useEffect(() => {
        dispatch(action.getJobType({}));
        dispatch(action.getJobPreference({}));
    }, []);

    useEffect(() => {
        if(typeof window != undefined) {
            let applyKartData = localStorage?.getItem("applyKart");
            const signUpCountryCode = localStorage?.countryCode;
            let countryCode = null;
            if(applyKartData) {
                applyKartData = JSON.parse(applyKartData);
                countryCode = applyKartData?.countryCode
            }
            
            if(!countryCode) {
                setCountryCode(signUpCountryCode);
            } else {
                setCountryCode(countryCode)
            }
        }
    },[])

    useEffect(() => {
        if (updateJobPreferences?.success) {
            props.action();
            dispatch({ type: UPDATE_JOB_PREFERENCE_CLEAR })
        }
    }, [updateJobPreferences?.success]);
    useEffect(() => {
        if (allData) {
            setFormData(() => {
                return {
                    jobType: allData?.preffered_job_type?.[0]?.Job_Type_id || "",
                    jobPreference: allData?.job_Preference || "",
                    salaryRange: allData?.base || "",
                }
            });
            setAddresses(allData?.job_location);
            setMinValue(allData?.minSalary);
            setMaxValue(allData?.maxSalary);
        }
    }, [allData])
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <Formik
                enableReinitialize
                initialValues={formData}
                onSubmit={handleSubmit}
                onReset={handleReset}
                validationSchema={validationSchema}
            >
                {({ values, errors, touched, handleSubmit, handleChange }) => {
                    return (
                        <form className='form_box' onSubmit={handleSubmit}>
                            <div className="timeline-modal-layout">
                                <h4 className='title-header'>Job preference</h4>
                                <div className="p-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="jobType" className='text-black'>Type of Job</label>
                                                <Field
                                                    as="select"
                                                    name="jobType"
                                                    className="form-control form-select"
                                                    autoComplete="off"
                                                >
                                                    <option value="" defaultValue="">Select</option>
                                                    {allJobTypes?.map((item, i) => (
                                                        <option value={item?.job_Type_id} key={i}>{item?.job_Type}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="jobType"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="jobPreference" className='text-black'>Job preference</label>
                                                <Field
                                                    as="select"
                                                    name="jobPreference"
                                                    className="form-control form-select"
                                                    autoComplete="off"
                                                >
                                                    <option value="" defaultValue="">Select</option>
                                                    {allJobPreferences?.jobCategories?.map((item, i) => (
                                                        <option value={item?.job_Category_id} key={i}>{item?.job_Category}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="jobPreference"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="salaryRange" className='text-black w-100'>Salary range <span className='d-block float-end'>{priceFormat(0)} - {countryCode == 61 ?priceFormat(40000) : indianPriceFormat(2500000)}</span></label>
                                                <Field
                                                    as="select"
                                                    name="salaryRange"
                                                    className="form-control form-select"
                                                    autoComplete="off"
                                                >
                                                    <option value="" defaultValue="">Select salary base</option>
                                                    {salaryBaseData?.map((item, i) => (
                                                        <option value={item?.id} key={i}>{item?.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="salaryRange"
                                                />
                                            </div>
                                            <div className="form-group">
                                                {/* <MultiRangeSlider
                                                    min={0}
                                                    max={40000}
                                                    onChange={({ min, max }) => {
                                                        setMinValue(min);
                                                        setMaxValue(max);
                                                    }
                                                    }
                                                /> */}
                                                <MultiRange 
                                                    range = {range}
                                                    setRange = {setRange}
                                                    min = {0}
                                                    max = {countryCode == 61 ? 40000 : 2500000}
                                                    countryCode = {countryCode}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="location" className='text-black'>Location</label>
                                                <Autocomplete
                                                    apiKey={apiKey}
                                                    options={{
                                                        types: ["establishment", "geocode"],
                                                        fields: ["formatted_address", "geometry", "name"],
                                                    }}
                                                    onPlaceSelected={(places) => {
                                                        setAddresses(places);
                                                    }}
                                                    defaultValue={address}
                                                    name="address"
                                                    className={`form-control form-select`}
                                                    placeholder={"Enter preferred job location"}
                                                />
                                                {error?.address && (
                                                    <div className="invalid-feedback d-block">{error?.address}</div>
                                                )}

                                            </div>
                                        </div>
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
                    );
                }}
            </Formik>
        </ModalLayout>
    );
}

export default JobPreferenceModal;