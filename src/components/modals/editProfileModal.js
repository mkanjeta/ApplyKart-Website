import React, { useState } from 'react';
import ModalLayout from './modalLayout';
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions/myProfileActions";
import { UPDATE_MY_PROFILE_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';


const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    emailAddress: Yup.string().email().required('Email Address is required'),
    // phoneNo: Yup.string().required('Phone No. is required'),
    phoneNo: Yup.string()
    .min(10, "Invalid number")
    .max(15, "Invalid number"),
});

const initialValues = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNo: "",
}

function EditProfileModal(props) { 
    const { data, dataTwo } = props;
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState('/assets/images/profile.jpg');
    const [fileSelected, setFileSelected] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState("");
    const [formData, setFormData] = useState(initialValues);
    const { updateMyProfile,updateMyProfileImage } = useSelector(({ myProfileReducer }) => myProfileReducer);
    useEffect(() => {
        if (data) {
            setFormData(() => {
                return {
                    firstName: data?.first_name || "",
                    lastName: data?.last_name || "",
                    emailAddress: data?.email || "",
                    phoneNo: data?.contact_no || "",
                }
            });
        }
    }, [data]);
    const fileChangeEvent = async (event) => {
        if (event.target.files && event.target.files.length) {
            setFileSelected(true);
            let file = event.target.files[0];
            let fileName = file.name;
            setImageUrl(URL.createObjectURL(file));
            setFileName(fileName);
            setFile(file);
        }
    }
    const handleSubmit = async (values) => {
        const obj = {
            profile:fileSelected ? file : null,
            profile_pic: fileSelected ? fileName : null,
            user_id:data?.user_Id,
            first_name:values?.firstName,
            last_name:values?.lastName,
            contact_no:values?.phoneNo,
            description:dataTwo?.description
        }
        dispatch(action.updateMyProfile(obj));
    }
    useEffect(() => {
        if (updateMyProfile?.success) {
            // setFormData(initialValues);
            setFileSelected(false);
            setFile('');
            setFileName('');
            props.action();
            dispatch({ type: UPDATE_MY_PROFILE_CLEAR })
        }
    }, [updateMyProfile?.success])
    const handleReset = () => {
        // setFormData(initialValues);
    }
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <Formik
                enableReinitialize
                initialValues={formData}
                onSubmit={handleSubmit}
                onReset={handleReset}
                validationSchema={validationSchema}
            >
                {({ handleSubmit }) => {
                    return (
                        <form className='form_box' onSubmit={handleSubmit}>
                            <div className="timeline-modal-layout">
                                
                                <h4 className='title-header'>Edit Profile</h4>
                                <div className='profileCardBox py-4 pb-5 rounded-0 mb-0'>
                                    <div className="imageBox mb-0">
                                        {fileSelected ?
                                            <img src={imageUrl?.trim()} alt='img' className='image-fit rounded-circle image' /> :
                                            <img src={data?.profile_pic ? data?.profile_pic?.trim() : imageUrl?.trim()} alt={data?.first_name} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                                        }
                                        <label htmlFor="imageUpload" className='text'>
                                            <input type="file" id='imageUpload' onChange={(e) => fileChangeEvent(e)} />
                                            <span className='icon '>
                                                Change Picture
                                            </span>
                                        </label>
                                    </div>

                                </div>
                                <div className="p-4">

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="firstName" className='text-black'>First name</label>
                                                <Field
                                                    type="text"
                                                    name="firstName"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    placeholder="First name"
                                                    // value='firsName'
                                                    
                                                />
                                                
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="firstName"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="lastName" className='text-black'>Last name</label>
                                                <Field
                                                    type="text"
                                                    name="lastName"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    placeholder="Last name"
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="lastName"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="emailAddress" className='text-black'>Email address</label>
                                                <Field
                                                    type="email"
                                                    name="emailAddress"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    placeholder="Email address"
                                                    // readOnly
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="emailAddress"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="phoneNo" className='text-black'>Phone number</label>
                                                <Field
                                                    type="text"
                                                    name="phoneNo"
                                                    className="form-control"
                                                    autoComplete="off"
                                                    placeholder="Phone number"
                                                    // readOnly
                                                />
                                                <ErrorMessage
                                                    component="div"
                                                    className="invalid-feedback d-block"
                                                    name="phoneNo"
                                                />
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

export default EditProfileModal;