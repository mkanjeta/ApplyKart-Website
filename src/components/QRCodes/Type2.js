import React from 'react';
import { useQRCode } from 'next-qrcode';
import domtoimage from 'dom-to-image';

const Type2 = ({jobDetails}) => {

  
  const { Image } = useQRCode();

  const downloadQR = (e) => {
    e.preventDefault();
    domtoimage.toBlob(document.getElementById('type-2-qr-code'))
    .then(function (blob) {
        const link=window.URL.createObjectURL(blob);
    let downloadLink = document.createElement("a");
    downloadLink.href = link;
    downloadLink.download = `job-${jobDetails?.job_Id}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    });
  };

  const printQr = e => {
    e.preventDefault();
    domtoimage.toBlob(document.getElementById('type-2-qr-code'))
    .then(function (blob) {
        const link=window.URL.createObjectURL(blob);
        var printW = window.open(link);
       printW.document.close();
       printW.focus();
       printW.print();
    });
  }

  const shareQr = () => {
    domtoimage.toBlob(document.getElementById('type-1-qr-code'))
    .then(function (blob) {
      const link=window.URL.createObjectURL(blob);
      navigator.share(
        {
          link,
          title: 'Job QR',
          text: 'Job QR Code'
        }
      ).then((res)=>{console.log('res')}).catch(err=>{console.log(err)});
    })
  }

    return (
      
      <>
          <div className='option-card-box option-card2 mb-0' id='type-2-qr-code'>
            <div className='option-card-header'>
              <img className='option-card-header-logo' src={jobDetails?.companyLogo? jobDetails?.companyLogo?.trim() :"/assets/images/logo-icon.png"} alt="logo" />
              <h5 className='option-card-name'>{jobDetails?.company || ''}</h5>
            </div>
            <div className='option-card-body'>

            <div className='position-relative'>
            <Image
                    text={`${window.location.origin}/jobs/details/${jobDetails?.id || jobDetails?.job_Id}`}
                    options={{
                      level: 'M',
                      margin: 3,
                      scale: 4,
                      width: 200,
                      color: {
                        dark: '#000000',
                        light: '#FFFFFF',
                      },
                    }}
                  />
                  <img className='qr-img1 position-absolute' style={{top:"50%",left:"50%",transform:"translate(-50%,-50%)"}} height="50" src={"/assets/qr-pin.png"} alt="QrCode" />
                  </div>
              <div className='option-card-box-divider' />
              <p className="option-card-hriring-text">We are hiring for:</p>
              <h4 className='option-card-post'>{jobDetails?.job_Title || ''}</h4>
              <p className='option-card-know-more'>Scan QR code to know more and apply</p>
            </div>
          </div>

          <div className='modal-btn-grp flex-wrap'>
            <button className='btn mt-3' onClick={downloadQR}>
              <i className="far fa-arrow-to-bottom fs-6"></i>
              Save to device
            </button>
            <button className='btn mt-3' onClick={shareQr}>
              <i className="fas fa-share fs-6"></i>
              Share
            </button>
            <button className='btn mt-3' onClick={printQr}>
              <i className="far fa-print fs-6"></i>
              Print
            </button>
          </div>
      </>
      );
}
export default Type2;