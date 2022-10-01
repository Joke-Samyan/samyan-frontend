export interface IDataset {
  question: string;
  labelType: TLabelType;
  pricePerTask: number;
}

export type TLabelType = "image" | "sound" | "speech" | "word";
