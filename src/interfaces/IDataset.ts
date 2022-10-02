export const labelTypeArray = ["image", "sound", "speech", "word"] as const;

export const answerTypeArray = ["text", "multiple choice"];

export interface IDataset {
  uuid?: string;
  question: string;
  labelType: TLabelType;
  pricePerTask: number;
}

export interface INewDataset extends IDataset {
  datasetName: string;
  answerType: TAnswerType;
}

export type TLabelType = typeof labelTypeArray[number];

export type TAnswerType = typeof answerTypeArray[number];
