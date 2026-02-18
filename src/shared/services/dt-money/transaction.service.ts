import { dtMoneyApi } from "@/shared/api/dt-money";
import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { GetTransactionParams, GetTransactionResponse } from "@/shared/interfaces/https/getTransactionRequest";
import { TransactionCategory } from "@/shared/interfaces/https/transaction-category-response";

import qs from 'qs';

export const getTransactionCategories = async (): Promise<TransactionCategory[]> => {
    const { data } = await dtMoneyApi.get<TransactionCategory[]>("/transaction/categories");
    return data;
}

export const createTransaction = async (transaction: CreateTransactionInterface) => {
    await dtMoneyApi.post("/transaction", transaction);
}

export const getTransactions = async (params: GetTransactionParams): Promise<GetTransactionResponse> => {
    const { data } = await dtMoneyApi.get<GetTransactionResponse>("/transaction", {
        params,
        paramsSerializer: (p) => qs.stringify(p, {arrayFormat: "repeat"}), 
    });
    return data;
}