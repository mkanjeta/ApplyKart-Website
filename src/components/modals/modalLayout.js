import React from 'react';
import { Modal } from 'react-bootstrap';

function ModalLayout(props) {
    return (
        <Modal show={props.state} backdrop="static"
            keyboard={false} onHide={props.action} dialogClassName='timeline-modal' size={props.size} centered>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
}

export default ModalLayout;