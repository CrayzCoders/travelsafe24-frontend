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
  onClose: () => void;
}

function getDistrictData(districtName: string) {
  const districtInfo = JSON.parse(
    sessionStorage.getItem("onboarding") || "{}",
  ) as CityData;
  const district: District = districtInfo.districts[districtName];
  if (!district) return;
  return district;
}

export default function DistrictInfoContainer({
  districtName,
  onClose,
}: DistrictInfoContainerProps) {
  const district = getDistrictData(districtName) as District;

  return (
    <>
      <div className="slide-in-right w-72 bg-white text-zinc-900 rounded-xl overflow-hidden shadow-xl border border-zinc-200">
        <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-1">
              District
            </p>
            <h1 className="text-xl font-bold text-zinc-900 leading-tight tracking-tight">
              {districtName}
            </h1>
          </div>
          <button
            onClick={onClose}
            className="ml-3 mt-0.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-md p-1 transition-colors"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

            <div className="slide-in-right w-72 bg-white text-zinc-900 rounded-xl overflow-hidden shadow-xl border border-zinc-200">
                <div className="px-5 py-4 border-b border-zinc-100 bg-zinc-50 flex items-start justify-between">
                    <div>
                        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-zinc-400 mb-1">
                            District
                        </p>
                        <h1 className="text-xl font-bold text-zinc-900 leading-tight tracking-tight">
                            {districtName}
                        </h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-3 mt-0.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200 rounded-md p-1 transition-colors"
                        aria-label="Close"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="px-5 py-3 divide-y divide-zinc-100">
                    {district?.criteria.map((criteria) => (
                        <div key={criteria.name} className="flex justify-between items-center py-2.5">
                            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                                {criteria.name}
                            </span>
                            <span className="text-sm font-semibold text-zinc-800 font-mono">
                                {criteria.value}
                            </span>
                        </div>
                    ))}
                    {!district && <p>No Data Available</p>}
                </div>

                <div className="h-0.5 bg-linear-to-r from-[rgb(247,100,94)] via-[rgb(247,140,100)] to-transparent" />
            </div>
          ))}
        </div>

        <div className="h-0.5 bg-linear-to-r from-[rgb(247,100,94)] via-[rgb(247,140,100)] to-transparent" />
      </div>
    </>
  );
}
