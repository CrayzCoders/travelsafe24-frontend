import React, { useEffect } from 'react';

interface Criterion {
  name: string;
  value: number;
}

interface District {
  matchingScore: number;
  criteria: Criterion[];
}

interface CityData {
  infos: {
    city: string;
    minScore: number;
    maxScore: number;
  };
  districts: Record<string, District>;
}

interface DistrictInfoContainerProps {
  districtName: string;
}


function getDistrictInformation(name: string) {

  const districtInfo = JSON.parse(sessionStorage.getItem('onboarding') || '{}') as CityData;
    if (!districtInfo) return;
    if(name === "") return;
    
    const district: District = districtInfo.districts[name];
    console.log(district)

}



export default function DistrictInfoContainer({ districtName }: DistrictInfoContainerProps) {
    useEffect(() => {
        getDistrictInformation(districtName)
    })
    return (
        <div className={ "w-3xs h-auto bg-white" }>
            <div className={" flex justify-center "}>
                <h1>{districtName}</h1>
            </div>
            <div>

            </div>
        </div>
    );
}
