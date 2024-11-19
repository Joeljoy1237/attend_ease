import React from "react";

interface TitleBarProps {
  title: string;
  className?: string;
  subTile?: string;
}

const TitleBar: React.FC<TitleBarProps> = ({ title, className, subTile }) => {
  return (
    <div
      className={`title-bar ${className} flex flex-row items-center space-x-4`}
    >
      <div className="h-[2vw] w-[5px] bg-azure-600 rounded-[5px]"></div>
      <div className="flex items-center flex-row space-x-5">
        <h5 className="text-xl font-semibold text-azure-600 capitalize">
          {title}
        </h5>
        {subTile &&
        <h5 className="text-base font-normal text-gray-500 capitalize">
        {"-- > "}
        {subTile}
      </h5>
        }
      </div>
    </div>
  );
};

export default TitleBar;
