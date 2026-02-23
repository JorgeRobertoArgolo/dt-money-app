import { TotalTransactions } from "./totalTransactions";
import { Transaction } from "./transaction";

export interface Pagination {
  page: number;
  perPage: number;
  totalRows?: number;
  totalPages: number;
}

export interface GetTransactionParams {
    page: number;
    perPage: number;
    from?: Date;
    to?: Date;
    typeId?: number;
    categoryId?: number;
    searchText?: string;
}

export interface GetTransactionResponse {
  data: Transaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: TotalTransactions;
}