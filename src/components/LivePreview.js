import axios from 'axios';
import cheerio from 'cheerio';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function LivePreview(props) {
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/proxy', { params: { url: encodeURIComponent(props.url) } });
                const html = response.data;
                const $ = cheerio.load(html);
                const title = $("head title").text();
                const description = $('head meta[name="description"]').attr("content");
                const image = $('head meta[property="og:image"]').attr("content");
                const linkPreviewData = { title, description, image, link: props.url };
                setPreview(linkPreviewData);
            } catch (error) {
                console.error("Error fetching link preview:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <div>
            {preview ?
                <a className="sc-bZQynM IDGvz react_tinylink_card" href={preview?.link} rel="noopener noreferrer" target="_blank">
                    <div className="react_tinylink_card_media" type="TYPE_AMAZON">
                        {preview?.image ? <img src={preview?.image?.trim()} alt={preview?.title} /> : <svg className="bd-placeholder-img card-img-top" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /></svg>}
                    </div>
                    <div className="react_tinylink_card_content_wrapper">
                        <header className="react_tinylink_card_content_header">
                            <p className="react_tinylink_card_content_header_description">
                                {preview?.title}
                            </p>
                        </header>
                        {preview?.description && (<div className="react_tinylink_card_content">
                            <p className="react_tinylink_card_content_description">{preview?.description}</p>
                        </div>)}

                        <footer className="react_tinylink_footer">
                            <p className="react_tinylink_card_footer_description">{preview?.link}</p>
                        </footer>
                    </div>
                </a>
                :
                <div className="card" aria-hidden="true">
                    <svg className="bd-placeholder-img card-img-top" width="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#868e96" /></svg>

                    <div className="card-body">
                        <h5 className="card-title placeholder-glow">
                            <span className="placeholder col-6" />
                        </h5>
                        <p className="card-text placeholder-glow mb-0">
                            <span className="placeholder col-7" />
                            <span className="placeholder col-4" />
                            <span className="placeholder col-4" />
                            <span className="placeholder col-6" />
                            <span className="placeholder col-8" />
                        </p>
                    </div>
                    <div className='transform-center text-center'>
                        <div className="spinner-border text-primary " role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}

export default LivePreview;