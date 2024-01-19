import React, { useState, useEffect } from 'react';
import ModalLayout from './modalLayout';
import Select from "react-select";
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_SKILLS_CLEAR } from 'redux/actionTypes/myProfile.actionTypes';
import * as action from "../../redux/actions/myProfileActions";


function EditSkillsModal(props) {
    const [selectOptions, setSelectOptions] = useState([]);
    const dispatch = useDispatch();
    const [selectedData, setSelectedData] = useState([]);
    const { allSkills, updateSkills } = useSelector(({ myProfileReducer }) => myProfileReducer);
    const { type, data } = props;
    useEffect(() => {
        dispatch(action.getSkills({}));
    }, []); 
    useEffect(() => {
        if (allSkills) {
            const updatedSkills = allSkills?.map((item) => (
                {
                    ...item,
                    label: item?.skill,
                    value: item?.skill,
                    id: item?.skill_id,
                }
            )); 
            setSelectOptions(updatedSkills);
        }
    }, [allSkills])
    useEffect(() => {
        if (updateSkills?.success) {
            props.action();
            dispatch({ type: UPDATE_SKILLS_CLEAR })
        }
    }, [updateSkills?.success]);
    useEffect(() => {
        if (type === 'edit') {
            const selectedSkills = data?.skills?.map((item) => (
                {
                    ...item,
                    label: item?.skill,
                    value: item?.skill,
                    id: item?.skill_id,
                }
            ));
            setSelectedData(selectedSkills);
        } else {
            setSelectedData([])
        }
    }, [type])
    const handleSelectSkills = (data) => {
        setSelectedData(data);
    }
    const handleSubmitSkills = () => {
        if(selectedData?.length>0){
            let obj = {
                user_id:data?.user_Id,
                Skill:JSON.stringify(selectedData?.map(item => item.id))
            }
            dispatch(action.putUpdateSkills(obj));
        }
    }
    useEffect(() => {
        if (updateSkills?.success) {
            props.action();
            dispatch({ type: UPDATE_SKILLS_CLEAR })
        }
    }, [updateSkills?.success])
    // const handleRemoveSkill = (data, index) => {
    //     const newFiles = selectedData.filter((f, i) => i !== index)
    //     setSelectedData(newFiles)
    // }
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <form className='form_box'>
                <div className="timeline-modal-layout">
                    <h4 className='title-header'><span className='text-capitalize'>{type}</span> skills</h4>
                    <div className="p-4">
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group">
                                    <label htmlFor="skills" className='text-black'>Add Skills</label>
                                    <Select
                                        defaultValue={type === 'edit' ? data?.skills?.map((item) => (
                                            {
                                                ...item,
                                                label: item?.skill,
                                                value: item?.skill,
                                                id: item?.skill_id,
                                            }
                                        )):null}
                                        id="college"
                                        instanceId="college"
                                        options={selectOptions}
                                        placeholder="Add Skills"
                                        className="form-control form-select"
                                        closeMenuOnSelect={true}
                                        isMulti={true}
                                        onChange={(item) => { handleSelectSkills(item) }}
                                        name="skills"
                                    />
                                    {/* {error && <div className="text-danger">{error}</div>} */}
                                </div>
                                <div className="form-group mt-4 mb-0">
                                    {/* {selectedData?.map((skill, i) => (
                                        <div className='selectedSkills' key={i}>
                                            {skill.label} <button type='button' onClick={(e) => handleRemoveSkill(skill, i)}> <i className='bi bi-x' /> </button>
                                        </div>
                                    ))} */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons-area justify-content-end">
                        <div className="action-buttons">
                            <button type="button" className="btn btn-transparent" onClick={props.action}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitSkills}>Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </ModalLayout>
    );
}

export default EditSkillsModal;