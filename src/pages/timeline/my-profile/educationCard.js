import EditEducationModal from 'components/modals/editEducationModal';
import moment from 'moment';
import React, { useState } from 'react';

function EducationCard(props) {
    const { education, allItem } = props;
    const [editModal, setEditModal] = useState(false);
    const handleToggleEditModal = () => {
        setEditModal(!editModal)
    }
    return (
        <>
            <div className='profileCardInfoBox'>
                <h5 className='title d-flex text-black fw-600'><span>Education</span>
                    {!props.show ?
                        <>
                            {/* <button type='button' className='actions ms-auto'><i className='icon-plus fs-6' /></button> */}
                            <button type='button' className='actions ms-auto' onClick={handleToggleEditModal}><i className='icon-edit' /></button>
                        </>
                        : null}
                </h5>
                <ul className="listingStyle">
                    {education?.educationDetails?.length > 0 && education?.educationDetails?.map((item, i) => (
                        <li key={i}>
                            <i className='icon-hat image icon' />
                            <div className="text-area">
                                <h6 className='name'>{item?.university || '-'}</h6>
                                <p className='designation'>{item?.education_Level || '-'}</p>
                                <p className='time-period'>{moment(item?.start_date).format('YYYY')}-{item?.end_date ? moment(item?.end_date).format('YYYY') : 'Present'}</p>
                            </div>
                        </li>
                    ))}
                    {education?.educationDetails?.length == 0 ? 'No records found' : ''}
                </ul>
            </div>
            {editModal ? <EditEducationModal action={handleToggleEditModal} state={editModal} size={"md"} data={education?.educationDetails} allItem={allItem} /> : null}
        </>
    );
}

export default EducationCard;