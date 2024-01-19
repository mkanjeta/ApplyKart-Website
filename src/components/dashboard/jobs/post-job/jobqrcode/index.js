import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { toggleHamburger } from "helper/helper";
import ShareQrCode from "../post-job-modals/shareqrcode";
import { useQRCode } from 'next-qrcode';
import { useSelector } from "react-redux";
import JobPlanModal from "../post-job-modals/jobplanmodal";
import { toast } from "react-toastify";
import PreviewJobQrCode from "../post-job-modals/previewqrmodal";
import { useRouter } from "next/router";


const JobQrCode = () => {
  const [showQrModal, setshowQrModal] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const handleClose = () => setshowQrModal(false);
  const handleShow = () => setshowQrModal(true);
  const router = useRouter();

  const { Image } = useQRCode();

  const { jobDetail } = useSelector(
    ({ jobBrowseReducer }) => jobBrowseReducer
  );
  const { currentSubscriptionPlan  } = useSelector(state=>state.AuthReducer);

  useEffect(()=>{
    if(!currentSubscriptionPlan){
      setShowPlan(true);
      toast.error('Please purchase a plan');
    } else if(currentSubscriptionPlan?.jobsLeft == 0){
      setShowPlan(true);
      toast.error('Please upgrade your plan');
    }else if(!currentSubscriptionPlan?.isActive){
      setShowPlan(true);
      toast.error('Please renew your plan');
    }else{
     
    }
  }, [currentSubscriptionPlan])

  const redirectToJobDetails = (e) => {
    e.preventDefault();
    router.push(`/jobs/details/${jobDetail?.job_Id}`)
  }

  return (
    <Fragment>
      <Head>
        <title>ApplyKart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className="main_wrapper">
        <div className="row p-3">
          <div className="col-xl-8 col-xs-12">
            <div className="dashboard_title_bar">
              <h3 className="title">
                <span
                  className="icon"
                  onClick={() => {
                    router.back();
                  }}
                >
                  <img
                    src={"/assets/images/icons/icon-ios-arrow-left.svg"}
                    alt="icon"
                  />
                </span>{" "}
                JOB QR CODE
              </h3>
            </div>
            <div className="Job-qr-code">

            </div>
            <div className="formpostjob">
              <div className="job-qr-box">
                <div className="qr-bx-inner">

                <div className='position-relative'>
                <Image
                    text={`${window.location.origin}jobs/details/${jobDetail?.id}`}
                    options={{
                      level: 'M',
                      margin: 3,
                      scale: 4,
                      width: 300,
                      color: {
                        dark: '#FFFFFF',
                        light: '#2F2F71',
                      },
                    }}
                  />
                  {/* <img className='qr-img1 position-absolute' style={{top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} height="50" src={"/assets/qr-pin.png"} alt="QrCode" /> */}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="jobTitle" className="label">
                  Company Name
                </label>
                <div className="form-control-with-btn">
                  <input
                    type="text"
                    className="form-control"
                    name="jobtitle"
                    id="jobTitle"
                    placeholder="Company Name"
                    value={jobDetail?.company}
                  />
                  <button type="submit" className="btn job-posted-add-btn btn-round ms-md-3" onClick={handleShow}>
                    <i className="fal fa-eye me-2" />
                    Preview 
                  </button>
                  <button type="submit" className="btn job-posted-add-btn btn-round ms-md-3" onClick={redirectToJobDetails}>
                    <i className="fal fa-eye me-2" />
                    Job Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Content Box ends */}
        <div
          className="sidebar-overlay"
          id="sidebar-overlay"
          onClick={toggleHamburger}
        />{" "}
      </main>
      <PreviewJobQrCode showModal={showQrModal} closeModal={handleClose} 
      qrType={currentSubscriptionPlan?.qrType == 0 ? 1 : currentSubscriptionPlan?.qrType}
      jobDetails={jobDetail}
      />
      <JobPlanModal showPlanModal={showPlan} closeModal={()=>{setShowPlan(false)}} jobId={jobDetail?.id} reditect={`jobs/details/${jobDetail?.id}`}/>
      {/* <ShareQrCode showModal={showQrModal} closeModal={handleClose}/> */}
    </Fragment>
  );
};

export default JobQrCode;
