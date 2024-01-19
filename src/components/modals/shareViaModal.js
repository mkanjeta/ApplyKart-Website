import React from 'react';
import ModalLayout from './modalLayout';
import ShareUI from 'components/shared/shareUI';
import {EmailShareButton, TwitterShareButton, WhatsappShareButton, InstapaperShareButton, TelegramShareButton, PinterestShareButton, FacebookShareButton, FacebookMessengerShareButton, FacebookIcon, PinterestIcon, FacebookMessengerIcon} from "react-share";

function ShareViaModal(props) {
    const {postId} = props;
    return (
        <ModalLayout action={props.action} state={props.state} size={props.size}>
            <div className="timeline-modal-layout">
                <h4 className='title-header'>Share via <button type='button' className='cross-button' onClick={props.action}><i className='bi bi-x' /></button></h4>
                <div className='px-4 pt-5 pb-4'>
                    <div className="row">
                        <div className="col-lg-3">
                            <EmailShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <ShareUI icon="/assets/images/share/gmail.svg" />
                            </EmailShareButton>
                        </div>
                        <div className="col-lg-3">
                            <TwitterShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <ShareUI icon="/assets/images/share/twitter.svg" />
                            </TwitterShareButton>
                        </div>
                        <div className="col-lg-3">
                            <WhatsappShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <ShareUI icon="/assets/images/share/whatsapp.svg" />
                            </WhatsappShareButton>
                        </div>
                        <div className="col-lg-3">
                            <InstapaperShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <ShareUI icon="/assets/images/share/instagram.svg" />
                            </InstapaperShareButton>
                        </div>
                        <div className="col-lg-3">
                            {/* <ShareUI icon="/assets/images/share/slack.svg" /> */}
                            <PinterestShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <PinterestIcon size={44} round={true} /> 
                            </PinterestShareButton>
                        </div>
                        <div className="col-lg-3">
                            {/* <ShareUI icon="/assets/images/share/message.svg" /> */}
                            <FacebookShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <FacebookIcon size={44} round={true} />
                            </FacebookShareButton>
                        </div>
                        <div className="col-lg-3">
                            <TelegramShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <ShareUI icon="/assets/images/share/telegram.svg" />
                            </TelegramShareButton>
                        </div>
                        <div className="col-lg-3">
                            <FacebookMessengerShareButton url={`${typeof window !== "undefined" && window.location.origin}/timeline/post/${postId}`}>
                                <FacebookMessengerIcon size={44} round={true} />
                            </FacebookMessengerShareButton>
                            {/* <ShareUI icon="/assets/images/share/more.svg" /> */}
                        </div>
                    </div>
                </div>
            </div>
        </ModalLayout>
    );
}

export default ShareViaModal;