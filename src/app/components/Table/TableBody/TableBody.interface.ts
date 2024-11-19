import { Table } from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { CallDataInterface } from "~interfaces/callListResponse.interface";

export interface TableBodyInterface
  extends DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement> {
  table: Table<CallDataInterface>;
}
