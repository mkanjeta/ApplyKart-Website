import TimelineHeader from 'components/shared/timelineHeader';
import React from 'react';

function PendingRequest(props) {
    return (
        <main className="main_wrapper wrapper_style_two">
            <TimelineHeader />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className='profileCardBox pb-4'>
                            <div className="imageBox">
                                <img src='https://picsum.photos/200/300' alt='img' className='image-fit rounded-circle image' />

                            </div>
                            <h5 className='name'>Andrea Piacquadio</h5>
                            <p className='designation'>Marketing Head at First National Bank</p>
                            <p className='infoData mb-0'><span className='mb-3 d-inline-flex'>University of Toronto</span><span className='mb-3 d-inline-flex'>Toronto Canada Area</span></p>
                            <div className="pending-request-box mb-2 mt-3">
                                <h6 className='title fw-600'>Anotonio Flores wants to connect with you.</h6>
                                <div className="button-box">
                                <button type='button' className='connect-btn success'><i className='icon-accept'/> Accept</button>
                            <button type='button' className='connect-btn danger'><i className='icon-reject'/> Reject</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default PendingRequest;