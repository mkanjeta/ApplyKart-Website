import React, { useState, useCallback } from 'react';
import ModalLayout from './modalLayout';
import { useDropzone } from 'react-dropzone';
import DiscardPostModal from './discardPostModal';

function AttachPhotoModal(props) {
    const [discardModal, setDiscardModal] = useState(false);
    const handleToggleDiscardModal = () => {
        setDiscardModal(!discardModal)
    }
    const [myFiles, setMyFiles] = useState([]);
    const [selectedMedia, setSelectedMedia] = useState([]);

    const handleCancel = () => {
        props.action();
        setMyFiles([]);
    }

    const handleDone = () => {
        let arr = [];
        myFiles?.map((elm) => {
            let obj = {
                fileType: elm?.type.includes('image') ? 1 : 3,
                fileName: elm
            }
            arr.push(obj)
            // setSelectedMedia(obj);
        })
        props.action();
        props.selectedMedia(arr);
    }

    const onDrop = useCallback(acceptedFiles => {
        setMyFiles((prev) => [...prev, ...acceptedFiles]);

    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        // accept: {
        //     'image/*': ['.jpg','.jpeg', '.png'],
        //     "video/*": []
        // },
        accept: props.modalType?.includes('photo') ? { 'image/*': ['.jpg', '.jpeg', '.png'] } : { "video/*": [] },
        multiple: true,
        onDrop
        // maxFiles:3
    });
    const files = myFiles.map(file => URL.createObjectURL(file))

    const handleRemoveImage = (file, index) => {
        const newFiles = myFiles.filter((f, i) => i !== index)
        setMyFiles(newFiles)
    }
    if (discardModal) return <DiscardPostModal action={handleToggleDiscardModal} state={discardModal} size={"md"} />

    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>
                    <button type='button' className='back-button' onClick={props.action}>
                        <i className="fal fa-chevron-left" />
                    </button> Add your {props.modalType}
                </h4>
                <div className='px-4 pt-3'>
                    <div className="row">
                        {files?.length > 0 && files?.map((file, i) => (
                            <div className="col-lg-6" key={i}>
                                <div className='dropzone-image-box mb-3'>
                                    <button type='button' className='remove-image' onClick={(e) => handleRemoveImage(file, i)}>
                                        <i className='fas fa-times fw-500' />
                                    </button>
                                    {myFiles[i]?.type.startsWith('image') ?
                                        <div style={{ height: '165px', width: '100%', overflow: 'auto' }}>
                                            <img key={file} src={file?.trim()} style={{ objectFit: 'cover', height: '100px', width: '100%' }} alt="Image" />
                                        </div>
                                        : myFiles[i]?.type.startsWith('video') ?
                                            <div style={{ height: '165px', width: '100%', overflow: 'hidden' }}>
                                                <video src={file} controls style={{ objectFit: 'cover', height: '100%', width: '100%' }}></video>
                                            </div>
                                            : null
                                    }
                                </div>
                            </div>
                        ))}

                        <div className={files.length > 0 ? "col-lg-6 dropzone dropzone-small" : "col-lg-12 dropzone"}>
                            <div className="dropzone-area mb-3">
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()} />
                                    <i className='bi bi-cloud-upload icon' />
                                    <p className='title'>
                                        {files.length > 0 ? `Upload more ${props.modalType}` : `Drag ${props.modalType} or choose from your computer`}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="buttons-area justify-content-end">
                    <div className="action-buttons">
                        <button type="button" className="btn btn-transparent" onClick={() => handleCancel()}>Cancel</button>
                        <button type="button" className="btn btn-primary" onClick={() => handleDone()}>Done</button>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default AttachPhotoModal;