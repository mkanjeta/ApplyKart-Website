import EditPortfolioModal from 'components/modals/editPortfolioModal';
import React, { useState } from 'react';

function PortfolioCard(props) {
    const { portfolio, item } = props;
    const [type, setType] = useState('');
    const [portFolioItem, setItem] = useState('');
    const [portfolioModal, setPortfolioModal] = useState(false);
    const handleTogglePortfolioModal = (caseType, item) => {
        setPortfolioModal(!portfolioModal);
        setType(caseType);
        setItem(item);
    }
    // console.log(portfolio,"portfolio")
    return (
        <>
            <div className='profileCardInfoBox'>
                <h5 className='title d-flex text-black fw-600'><span>Portfolio</span>
                    {!props.show ?
                        <>
                            <button type='button' className='actions ms-auto' onClick={() => handleTogglePortfolioModal('add', '')}><i className='icon-plus fs-6' /></button>

                        </>
                        : null}
                </h5>
                <ul className='listingPortfolio'>
                    {portfolio?.data?.length > 0 && portfolio?.data?.map((item, i) => (
                        <li key={i}>
                            <img src={item?.image ? item?.image?.trim() : "/assets/images/profile.jpg"} alt={item?.title} className='image-fit image' onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = "/assets/images/profile.jpg"; }} />
                            <p className='title'>{item?.title || '-'}</p>
                            <button type='button' className='actions' onClick={() => handleTogglePortfolioModal('edit', item)}><i className='icon-edit' /></button>
                        </li>
                    ))}
                    {portfolio?.data?.length == 0 ? 'No records found' : ''}
                </ul>
            </div>
            {portfolioModal ? <EditPortfolioModal action={handleTogglePortfolioModal} state={portfolioModal} size={"md"} data={portFolioItem} allItem={item} type={type} /> : null}
        </>
    );
}

export default PortfolioCard;