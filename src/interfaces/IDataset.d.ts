export const labelTypeArray = ["image", "sound", "word"] as const;

export const answerTypeArray = ["text", "multipleChoice"];

export const prelabelTypeArray = ["IC", "OCR"];

export interface IDataset {
  dataset_id?: string;
  description: string;
  reward_dataset: number;
  prelabel: TPrelabelType;
  entries: IEntry[];
}

export interface IEntry {
  entry_type: TAnswerType;
  entry: string;
  reward?: number;
  entry_id?: string;
  labeler_id?: string;
  label?: string;
  prelabel?: string;
}

// export interface INewDataset extends IDataset {
//   datasetName: string;
//   answerType: TAnswerType;
// }

export interface ILabelEntrySchema {
  dataset_id: string;
  entry_id: string;
  labeler_id: string;
  label: string;
}

export type TLabelType = typeof labelTypeArray[number];

export type TAnswerType = typeof answerTypeArray[number];

export type TPrelabelType = typeof prelabelTypeArray[number];
