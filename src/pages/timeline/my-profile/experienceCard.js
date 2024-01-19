import EditExperienceModal from 'components/modals/editExperienceModal';
import { corruptedDateFormat } from 'constants/constants';
import moment from 'moment';
import React, { useState } from 'react';

function ExperienceCard(props) {
    const { experience, allItem } = props;
    const [editModal, setEditModal] = useState(false);
    const handleToggleEditModal = () => {
        setEditModal(!editModal)
    }
    return (
        <>
            <div className='profileCardInfoBox'>
                <h5 className='title d-flex text-black fw-600'><span>Experience</span>
                    {!props.show ? <>
                    {/* <button type='button' className='actions ms-auto'><i className='icon-plus fs-6' /></button> */}
                        <button type='button' className='actions ms-auto' onClick={handleToggleEditModal}><i className='icon-edit' /></button></> : null}
                </h5>
                <ul className="listingStyle">
                    {experience?.workExperiences?.length > 0 && experience?.workExperiences?.map((item, i) => (
                        <li key={i}>
                            {/* <img src='/assets/images/profile.jpg' alt={item?.company} className='image-fit rounded-circle image' /> */}
                            <div className="text-area">
                                <h6 className='name'>{item?.role || '-'}</h6>
                                <p className='designation'>{item?.company || '-'}</p>
                                <p className='time-period'>{moment(item?.start_date).format('MMM YYYY')} - {item?.end_date && item?.end_date !== corruptedDateFormat ? moment(item?.end_date).format('MMM YYYY') : 'Present'}</p>
                            </div>
                        </li>
                    ))}
                    {experience?.workExperiences?.length == 0 ? 'No Experience Provided' : null}
                </ul>
            </div>
            {editModal ? <EditExperienceModal action={handleToggleEditModal} state={editModal} data={experience?.workExperiences} allItem={allItem} size={"md"} /> : null}
        </>
    );
}

export default ExperienceCard;