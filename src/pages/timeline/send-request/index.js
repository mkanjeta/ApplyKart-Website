import TimelineHeader from 'components/shared/timelineHeader';
import React from 'react';

function SendRequest(props) {
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
                            {/* <div className='buttonWrap mb-3'>
                                <button type='button' className='viewButton'>View V Card</button>
                            </div> */}
                            <button type='button' className='connect-btn primary active mb-2'><i className='icon-connect'/> Connect</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SendRequest;