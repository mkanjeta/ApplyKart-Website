import EditAboutModal from 'components/modals/editAboutModal';
import React, { useState } from 'react';

function AboutCard(props) {
    const { item, allItem } = props;
    const [editModal, setEditModal] = useState(false);
    const handleToggleEditModal = () => {
        setEditModal(!editModal)
    }
    return (
        <>
            <div className='profileCardInfoBox'>
                <h5 className='title d-flex text-black fw-600'><span>About</span>
                    {!props.show ? <button type='button' className='actions ms-auto' onClick={handleToggleEditModal}><i className='icon-edit' /></button> : null}
                </h5>
                <p>{item?.description || '-'}</p>
            </div>
            {editModal ? <EditAboutModal action={handleToggleEditModal} state={editModal} allItem={allItem} data={item?.description} size={"md"} />:null}
        </>
    );
}

export default AboutCard;