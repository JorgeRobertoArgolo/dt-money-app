import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons' 

import { useTransactionContext } from "@/context/transaction.context";
import { colors } from "@/shared/colors";
import { useEffect, useState } from "react";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { TransactionsFilters } from "./TransactionsFilters";

export const FilterInput = () => {
    
    const { pagination, setSearchText, searchText, fetchTransactions } = useTransactionContext();
    const { openBottomSheet } = useBottomSheetContext();

    const [text, setText] = useState("");

    /**
     *  Com o setTimeout, a alteração no setSearchText
     *  Só é feita, após meio segundo sem digitar nada
     */
    useEffect(() => {
        const handler = setTimeout(() => {
            setSearchText(text);
        }, 500);

        return () => clearTimeout(handler);
    }, [text]);

    useEffect(() => {
        (async () => {
            try {
                await fetchTransactions({ page: 1});
            } catch (error) {
                
            }
        })()
    }, [searchText]);
    
    return (
        <View className="mb-4 w-[90%] self-center">
            <View className="w-full flex-row justify-between items-center mt-3 mb-4">
                <Text className="text-white text-xl font-bold">Transações</Text>
                <Text className="text-gray-700 text-base">
                    {pagination.totalRows} {pagination.totalRows === 1 ? "Item" : "Itens"} 
                </Text>
            </View>

            <TouchableOpacity className="flex-row items-center justify-between h-16">
                <TextInput 
                    className="h-[50px] text-white w-full bg-background-primary text-lg pl-4"
                    placeholderTextColor={colors.gray[600]}
                    placeholder="Busque uma transação"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity 
                    onPress={() => openBottomSheet(<TransactionsFilters />, 1)}
                    className="absolute right-0"
                >
                    <MaterialIcons 
                        name="filter-list" 
                        color={colors["accent-brand-light"]}
                        size={26}
                        className="mr-3"    
                    />
                </TouchableOpacity> 
            </TouchableOpacity>

        </View>
    );
}