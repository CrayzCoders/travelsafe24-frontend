import React from 'react';
import closeIcon from '@/public/close-icon.svg';
import Image from "next/image";

function closeInfobox() {
    //TODO implement closing Infobox
    console.log("close");
}

function Infobox() {
    return (
        <div className="bg-white border-t-2 border-gray-300 flex flex-col absolute top-16 bottom-0 right-0 z-20 p-4 min-w-50">
            <div className="flex justify-end pb-2">
                <button onClick={closeInfobox} className="bg-gray-300 p-1 rounded-full cursor-pointer">
                    <Image src={closeIcon} alt="Close Icon" width={20} height={20}/>
                </button>
            </div>

            <h1>Infobox</h1>
            <h2>Stadteil: </h2>
        </div>
    );
}

export default Infobox;