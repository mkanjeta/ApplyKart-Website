import EditSkillsModal from 'components/modals/editSkillsModal';
import React, { useState } from 'react';

function SkillsCard(props) {
    const { item } = props;
    const [type, setType] = useState('');
    const [editModal, setEditModal] = useState(false);
    const handleToggleEditModal = (caseType) => {
        setEditModal(!editModal);
        setType(caseType);
    }
    return (
        <>
            <div className='profileCardInfoBox'>
                <h5 className='title d-flex text-black fw-600'><span>Skills</span>
                    {!props.show ? <>
                        {/* <button type='button' className='actions ms-auto' onClick={() => handleToggleEditModal('add')}><i className='icon-plus fs-6' /></button> */}
                        <button type='button' className='actions ms-auto' onClick={() => handleToggleEditModal('edit')}><i className='icon-edit' /></button>
                    </> : null}
                </h5>
                <ul className='listingSkills'>
                    {item?.skills?.map((skill, i) => (
                        <li key={i}>{skill?.skill}</li>
                    ))}
                    {item?.skills?.length === 0 ? 'No Skills' : ''}
                </ul>
            </div>
            {editModal ? <EditSkillsModal action={handleToggleEditModal} state={editModal} size={"md"} data={item} type={type} /> : null}
        </>
    );
}

export default SkillsCard;