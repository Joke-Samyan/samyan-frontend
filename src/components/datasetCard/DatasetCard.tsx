import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { Chat, Image, QuestionMark, VolumeUp } from "@mui/icons-material";
import { IDataset, TLabelType } from "../../interfaces/IDataset";
import "./datasetCard.scss";
import { useNavigate } from "react-router-dom";

function getLabelTypeIcon(labelType: TLabelType): ReactNode {
  const iconStyle: object = {
    fontSize: "60px",
  };
  switch (labelType) {
    case "image":
      return <Image sx={iconStyle} />;
    case "sound":
      return <VolumeUp sx={iconStyle} />;
    case "word":
      return <Chat sx={iconStyle} />;
    default:
      return <QuestionMark sx={iconStyle} />;
  }
}

function getAnswerType(labelType: TLabelType): string {
  switch (labelType) {
    case "image":
      return "รูป";
    case "sound":
      return "ฟัง";
    case "word":
      return "คำตอบ";
    default:
      return "อะไรเอ่ยย";
  }
}

const DatasetCard: ForwardRefRenderFunction<HTMLDivElement, IDataset> = (
  props: IDataset,
  ref
) => {
  const navigate = useNavigate();
  const { description, reward_dataset, entries }: IDataset = { ...props };
  return (
    <div
      ref={ref}
      onClick={() => {
        navigate("/label-image", {
          state: { ...props },
        });
      }}
    >
      <div className="card-container">
        <div className="header">{description}</div>
        <div className="type-image">{getLabelTypeIcon("image")}</div>
        <div className="price-container">
          <div className="price">
            <div>{(reward_dataset / entries.length).toFixed(2)} บาท</div>
            <div>/</div>
            <div>{getAnswerType("image")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(DatasetCard);
