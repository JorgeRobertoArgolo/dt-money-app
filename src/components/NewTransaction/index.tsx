import { useState } from "react";
import { TouchableOpacity, View, Text, TextInput, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"
import * as yup from 'yup';

import CurrencyInput from 'react-native-currency-input'

import { CreateTransactionInterface } from "@/shared/interfaces/https/create-transaction-request";
import { colors } from "@/shared/colors";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { TransactionTypeSelector } from "../SelectType";
import { SelectCategoryModel } from "../SelectCategoryModel";
import { transactionSchema } from "./schema";
import { AppButton } from "../AppButton";
import { ErrorMessage } from "../ErrorMessage";
import { useTransactionContext } from "@/context/transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

type ValidationErrorsTypes = Record<keyof CreateTransactionInterface, string>;

export const NewTransaction = () => {

    const { closeBottomSheet } = useBottomSheetContext();
    const { createTransaction } = useTransactionContext();
    const { handleError } = useErrorHandler();

    const [loading, setLoading] = useState(false);
    
    const [transaction, setTransaction] = useState<CreateTransactionInterface>({
        categoryId: 0,
        description:"",
        typeId: 0,
        value: 0,
    });
    
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>();

    const handleCreateTransaction = async () => {
    try {
        setLoading(true)
        await transactionSchema.validate(transaction, { abortEarly: false, })
        await createTransaction(transaction)
        closeBottomSheet()
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            const errors = {} as ValidationErrorsTypes
            error.inner.forEach((err) => {
                if (err.path) {
                    errors[err.path as keyof CreateTransactionInterface] = err.message
                }
            })
        setValidationErrors(errors)
      } else {
            handleError(error, 'Falha ao criar transação')
      }
    } finally {
        setLoading(false)
    }
  }

    const setTransactionData = (key: keyof CreateTransactionInterface, value: string | number) => {
        setTransaction((prevData) => ({...prevData, [key]: value}));
    }

    return (
        <View className="px-8 py-5">
            <TouchableOpacity className="w-full flex-row items-center justify-between" onPress={closeBottomSheet}>
                <Text className="text-white text-xl font-bold">Nova Transação</Text>
                <MaterialIcons
                    name="close"
                    color={colors.gray['700']}
                    size={20}
                />
            </TouchableOpacity>
            <View className="flex-1 mt-8 mb-8">
                <TextInput 
                    className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
                    placeholder="Descrição"
                    placeholderTextColor={colors.gray['700']}
                    value={transaction.description}
                    onChangeText={(text) => setTransactionData("description", text)}
                />
                {
                    validationErrors?.description && (
                        <ErrorMessage>{validationErrors.description}</ErrorMessage>
                    )
                }

                <CurrencyInput
                    className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-[6] pl-4"
                    value={transaction.value}
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    onChangeValue={(value) => setTransactionData("value", value ?? 0)}
                />
                {
                    validationErrors?.value && (
                        <ErrorMessage>{validationErrors.value}</ErrorMessage>
                    )
                }

                <SelectCategoryModel 
                    selectedCategory={transaction.categoryId}
                    onSelected={(categoryId) => setTransactionData("categoryId", categoryId)}
                />
                {
                    validationErrors?.categoryId && (
                        <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>
                    )
                }
                
                <TransactionTypeSelector 
                    typeId={transaction.typeId}
                    setTransactionType={(typeId) => {setTransactionData("typeId", typeId)}}
                />
                {
                    validationErrors?.typeId && (
                        <ErrorMessage>{validationErrors.typeId}</ErrorMessage>
                    )
                }

                <View className="mt-4">
                    <AppButton onPress={handleCreateTransaction}>
                        {
                            loading ? <ActivityIndicator color={colors.white} /> : "Registrar"
                        }
                    </AppButton>
                </View>
            </View>
        </View>
    );
}