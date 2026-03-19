interface DistrictInfoContainerProps {
  districtName?: string;
}

export default function DistrictInfoContainer({ districtName }: DistrictInfoContainerProps) {
  return (
    <div className="w-3xs h-auto bg-white">
      <div className="flex justify-center">
        <h1>{districtName}</h1>
      </div>
      <div></div>
    </div>
  );
}
