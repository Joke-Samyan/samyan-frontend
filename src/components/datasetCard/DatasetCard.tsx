import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import {
  Chat,
  Image,
  KeyboardVoice,
  QuestionMark,
  VolumeUp,
} from "@mui/icons-material";
import { IDataset, TLabelType } from "../../interfaces/IDataset";
import "./datasetCard.scss";

function getLabelTypeIcon(labelType: TLabelType): ReactNode {
  const iconStyle: object = {
    fontSize: "60px",
  };
  switch (labelType) {
    case "image":
      return <Image sx={iconStyle} />;
    case "sound":
      return <VolumeUp sx={iconStyle} />;
    case "speech":
      return <KeyboardVoice sx={iconStyle} />;
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
    case "speech":
      return "เสียง";
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
  const { question, labelType, pricePerTask }: IDataset = { ...props };
  return (
    <div ref={ref}>
      <div className="card-container">
        <div className="header">{question}</div>
        <div className="type-image">{getLabelTypeIcon(labelType)}</div>
        <div className="price-container">
          <div className="price">
            <div>{pricePerTask} บาท</div>
            <div>/</div>
            <div>{getAnswerType(labelType)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(DatasetCard);
