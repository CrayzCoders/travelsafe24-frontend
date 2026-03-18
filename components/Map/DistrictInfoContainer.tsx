import React from 'react';

function DistrictInfoContainer(props) {
    return (
        <div className={ "w-3xs h-auto bg-white" }>
            <div className={" flex justify-center "}>
                <h1>{props.districtName}</h1>
            </div>
            <div>

            </div>
        </div>
    );
}

export default DistrictInfoContainer;