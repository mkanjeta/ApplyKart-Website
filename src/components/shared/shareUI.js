import React from 'react';

function ShareUI(props) {
    return (
        <div className='shareIcon'>
            <img src={props.icon?.trim()} alt='icon' />
        </div>
    );
}

export default ShareUI;