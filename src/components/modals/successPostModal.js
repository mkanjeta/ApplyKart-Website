import React from 'react';
import ModalLayout from './modalLayout';
import Lottie from "lottie-react";
import successAnimation from "../../../public/assets/animations/success.json";

function SuccessPostModal(props) {
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <div className="success-modal small py-4">
                    <div className="icon">
                        <Lottie animationData={successAnimation} />
                    </div>
                    <h5 className='title fw-500'>Successfully Posted!</h5>
                </div>
            </div>
        </ModalLayout>
    );
}

export default SuccessPostModal;