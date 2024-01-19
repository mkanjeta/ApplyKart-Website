import React from 'react';

function HighlightCard(props) {
    const { item } = props;
    return (
        <div className='profileCardInfoBox pb-0'>
            <h5 className='title d-flex text-black fw-600'><span>Highlights</span>
            </h5>
            <ul className="listingStyle style_three row mt-4">
                <li className='col-lg-6'>
                    <img src='/assets/images/placeholder.jpg' alt='img' className='image-fit rounded-circle image' />
                    <div className="text-area">
                        <h6 className='name'>{item?.mutualConnections} Mutual Connections</h6>
                        <p className='designation'>{item?.mutualFriends || '-'}</p>
                        {/* <p className='designation'>You and Andrea both know Kuliecarroll, Margie Jensen, and 15 others</p> */}
                    </div>
                </li>
                <li className='col-lg-6'>
                    <i className='icon-hat image icon'/>
                    {/* <img src='https://picsum.photos/200/300' alt='img' className='image-fit rounded-circle image' /> */}
                    <div className="text-area">
                        <h6 className='name'>{item?.mutualUniversity ? `You both studied at university of Toronto` + item?.mutualUniversity : '-'}</h6>
                        <p className='designation'>{item?.mutualUniversityTimePeriod || '-'}</p>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default HighlightCard;