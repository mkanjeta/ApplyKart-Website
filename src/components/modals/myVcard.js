import React from 'react';
import ModalLayout from './modalLayout';

function MyVcard(props) {
    const { data } = props;
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>V Card <button type='button' className='cross-button' onClick={props.action}><i className='bi bi-x' /></button></h4>
                <div className="p-3 pt-4">
                    <div className='profileCardBox style_two mb-0 pt-0 pb-4'>
                        <div className="imageBox">
                            <img src={data?.profile_pic ? data?.profile_pic?.trim() : "/assets/images/profile.jpg"} alt={data?.first_name} className='image-fit rounded-circle image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                        </div>
                        <h5 className='name text-capitalize'>{props?.userName}</h5>
                        <p className='designation'>{data?.professionaldetails?.experience[0]?.job_Title || '-'}</p>
                        <p className='infoData mb-0'>
                            <span className='mb-3 d-inline-flex align-items-center'><i className='icon-exp' /> {data?.totalExperience || 0} {!data?.totalExperience?.toLowerCase().includes('years') ? ' months' : ''}</span>
                            <span className='mb-3 d-inline-flex align-items-center text-wrap'><i className='icon-location' /> {data?.job_location || '-'}</span>
                        </p>
                        <ul className='profileTags mt-3'>
                            {data?.skills?.slice(0, 3).map((skill, i) => (
                                <li key={i}>{skill?.skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default MyVcard;