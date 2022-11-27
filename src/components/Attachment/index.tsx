import React, { FC, useState } from "react";
import "./index.css";

type Props = {
  data: string;
  removeFile: (file: string) => void;
  editing?: boolean;
};
const Attachment: FC<Props> = ({ data, removeFile, editing }) => {
  const [isIncreased, setIsIncreased] = useState<boolean>(false);
  return (
    <div className="attachment">
      <img src={data} alt="" onClick={() => setIsIncreased(true)} />
      {editing || typeof editing === "undefined" ? (
        <span onClick={() => removeFile(data)} />
      ) : null}
      {isIncreased && (
        <div className="increased_cont">
          <div
            className="increased_bcg"
            onClick={() => setIsIncreased(false)}
          />
          <img src={data} alt="" className="increased_img" />
        </div>
      )}
    </div>
  );
};

export default Attachment;
