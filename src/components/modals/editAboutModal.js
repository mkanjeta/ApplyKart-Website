import React, { useState, useRef, useEffect } from 'react';
import ModalLayout from './modalLayout';
import { useDispatch, useSelector } from "react-redux";
import * as action from "../../redux/actions/myProfileActions";
import { UPDATE_MY_PROFILE_CLEAR, UPDATE_PROFILE_ITEMS_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';

function EditAboutModal(props) {
    const { data, allItem } = props;
    const dispatch = useDispatch();
    const { updateMyProfile } = useSelector(({ myProfileReducer }) => myProfileReducer);
    const contentEditableRef = useRef(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (contentEditableRef.current && props.state) {
            contentEditableRef.current.textContent = data;
        }
    }, [data && props.state]);
    const handleEditData = () => {
        const content = contentEditableRef.current?.textContent.trim();
        if (!content) {
            setError('Content cannot be empty.');
            return;
        }
        let obj = {
            user_id: allItem?.user_Id,
            first_name: allItem?.first_name,
            last_name: allItem?.last_name,
            contact_no: allItem?.contact_no,
            profile_pic: null,
            description: contentEditableRef.current.textContent
        }
        dispatch(action.updateMyProfile(obj));
    }
    useEffect(() => {
        if (updateMyProfile?.success) {
            props.action();
            dispatch({ type: UPDATE_MY_PROFILE_CLEAR })
        }
    }, [updateMyProfile?.success])
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>Edit About</h4>
                <div className="p-4">
                    <div className='editableText' contentEditable="true" data-placeholder='About' ref={contentEditableRef} onBlur={handleEditData}></div>
                    {error && <div className="text-danger">{error}</div>}
                </div>
                <div className="buttons-area justify-content-end">
                    <div className="action-buttons">
                        <button type="button" className="btn btn-transparent" onClick={props.action}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default EditAboutModal;