import { useTransactionContext } from "@/context/transaction.context";
import { TransactionTypes } from "@/shared/helpers/TransactionTypes";
import Checkbox from "expo-checkbox";
import { View, Text, TouchableOpacity } from "react-native"

export const TypeFilter = () => {

    const { filters, handleFilters } = useTransactionContext();

    const selectType = (typeId: TransactionTypes) => {
        handleFilters({key: "typeId", value: typeId})
    };

    return (
        <View className="mb-6">
            <Text className="text-base font-medium mb-5 text-gray-600">Tipo de transação</Text>
            
            <TouchableOpacity className="flex-row items-center py-2"
                onPress={() => selectType(TransactionTypes.REVENUE)}
            >
                <Checkbox 
                    className="mr-4"
                    onValueChange={() => selectType(TransactionTypes.REVENUE)}
                    value={filters.typeId === TransactionTypes.REVENUE}
                />
                <Text className="text-lg text-white">Entrada</Text>
            </TouchableOpacity>  

            <TouchableOpacity className="flex-row items-center py-2"
                onPress={() => selectType(TransactionTypes.EXPENSE)}
            >
                <Checkbox 
                    className="mr-4"
                    onValueChange={() => selectType(TransactionTypes.EXPENSE)}
                    value={filters.typeId === TransactionTypes.EXPENSE}
                />
                <Text className="text-lg text-white">Saída</Text>
            </TouchableOpacity>  
        </View>    

    );
}