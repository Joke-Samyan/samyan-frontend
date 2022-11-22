import { Dispatch, SetStateAction } from "react";
import { IDataset } from "./IDataset";

export interface TableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface TableToolbarProps {
  numSelected: number;
  setSearchInput: Dispatch<SetStateAction<string>>;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
