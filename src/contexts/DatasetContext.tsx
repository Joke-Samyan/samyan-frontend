import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import { IDataset } from "../interfaces/IDataset";

interface Props {
  children: React.ReactNode;
}
interface IDatasetContext {
  datasetContext: IDataset[];
  setDatasetContext: Dispatch<SetStateAction<IDataset[]>>;
}

const DatasetContextState = {
  datasetContext: [],
  setDatasetContext: () => {},
};

export const DatasetContext =
  createContext<IDatasetContext>(DatasetContextState);

export const DatasetContextProvider = ({ children }: Props) => {
  const [datasetContext, setDatasetContext] = useState<IDataset[]>([]);

  return (
    <DatasetContext.Provider
      value={{
        datasetContext,
        setDatasetContext,
      }}
    >
      {children}
    </DatasetContext.Provider>
  );
};
