const Card = ({ redirect, description, image }) => {
  return (
    <div className="col-lg-4 col-md-12" news-date="May 16, 2024">
      <div className="col-wrapper p-2 rounded-4 shadow h-100 bg-white card-view-wrapper">
        <div className="image-container d-flex justify-content-center card-view-image">
          <img decoding="async" src={image} alt="" />
        </div>
        <div className="px-3 py-4">
          {/* Enter Date here */}
          {/* <p>May 16, 2024</p> */}
          <p className="fw-medium card-view-title">{description}</p>
          <a
            className="bi bi-chevron-right fw-medium d-flex flex-row-reverse align-items-center justify-content-end gap-2 card-view-read-more"
            href={redirect}
            target="_blank"
            rel="noreferrer nofollow noopener"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
