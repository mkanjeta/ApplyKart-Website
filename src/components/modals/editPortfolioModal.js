import React, { useState, useEffect } from 'react';
import ModalLayout from './modalLayout';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_PORTFOLIO_CLEAR, UPDATE_PORTFOLIO_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';
import * as action from "../../redux/actions/myProfileActions";

function EditPortfolioModal(props) {
    const { type, data, allItem } = props;
    const [fields, setFields] = useState([
        { id: 1, title: '', image: null, imagePreview: null, titleError: null, imageError: null },
    ]);
    const dispatch = useDispatch();
    const { updatePortfolio, addPortfolio } = useSelector(({ myProfileReducer }) => myProfileReducer);

    const handleTitleChange = (id, value) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, title: value };
            }
            return field;
        });
        setFields(newFields);
    };

    const handleImageChange = (id, file) => {
        const newFields = fields.map((field) => {
            if (field.id === id) {
                return { ...field, image: file, imagePreview: URL.createObjectURL(file) };
            }
            return field;
        });
        setFields(newFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = [];
        const newFields = fields.map((field) => {
            let titleError = null;
            let imageError = null;
            if (!field.title.trim()) {
                titleError = 'Title is required.';
            }
            if (!field.image) {
                imageError = 'Image is required.';
            }
            if (titleError && imageError) {
                errors.push({ id: field.id, titleError, imageError });
            }
            return { ...field, titleError, imageError };
        });
        setFields(newFields);
        if (errors.length === 0) {
            if (type === 'edit') {
                let obj = {
                    "portfolio_id": data?.portfolio_id,
                    "title": fields[0]?.title,
                    "description": "",
                    "image": fields[0]?.image?.name,
                    file: fields[0]?.image
                }
                dispatch(action.putPortfolioImage(obj));
            } else {
                let obj = {
                    "user_id": allItem?.user_Id,
                    "title": fields[0]?.title,
                    "description": "",
                    "image": fields[0]?.image?.name,
                    file: fields[0]?.image
                }
                dispatch(action.postPortfolioImage(obj));
            }
        }
    };
    useEffect(() => {
        if (type === 'edit') {
            setFields([
                { id: 1, title: data?.title, image: data?.image, imagePreview: data?.image, titleError: null, imageError: null },
            ]);
        }
    }, [type])
    useEffect(() => {
        if (updatePortfolio?.message) {
            setFields([
                { id: 1, title: '', image: null, imagePreview: null, titleError: null, imageError: null },
            ]);
            props.action();
            dispatch({ type: UPDATE_PORTFOLIO_CLEAR })
        }
    }, [updatePortfolio?.message]);
    useEffect(() => {
        if (addPortfolio?.success) {
            setFields([
                { id: 1, title: '', image: null, imagePreview: null, titleError: null, imageError: null },
            ]);
            props.action();
            dispatch({ type: ADD_PORTFOLIO_CLEAR })
        }
    }, [addPortfolio?.success]);
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <form className='form_box' onSubmit={handleSubmit}>
                <div className="timeline-modal-layout">
                    <h4 className='title-header d-flex align-items-center justify-content-between'>{type} portfolio </h4>
                    <div className="p-4">
                        {/*  */}
                        {fields.map((field) => (
                            <div className="portfolioBox mb-2" key={field.id}>
                                <div className="form-group">
                                    <label className="text-black">Add Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="portfolio title"
                                        value={field.title}
                                        onChange={(e) => handleTitleChange(field.id, e.target.value)}
                                    />
                                    {field.titleError && <div className="text-danger">{field.titleError}</div>}
                                </div>
                                <div className="image-box">
                                    <label htmlFor={`uploadImage${field.id}`} className="uploadImage">
                                        <input
                                            type="file"
                                            className="d-none"
                                            id={`uploadImage${field.id}`}
                                            onChange={(e) => handleImageChange(field.id, e.target.files[0])}
                                        />
                                        {field.imagePreview ? <img src={field.imagePreview?.trim()} alt="img" style={{width:'120px',height:'120px',objectFit:'cover'}} /> : <img src="/assets/images/profile.jpg" alt="img" style={{width:'120px',height:'120px',objectFit:'cover'}} />}

                                    </label>
                                    {field.imageError && <div className="text-danger">{field.imageError}</div>}
                                </div>
                            </div>
                        ))}
                        {/*  */}
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

export default EditPortfolioModal;