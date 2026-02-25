import { useTransactionContext } from "@/context/transaction.context";
import Checkbox from "expo-checkbox";
import { Text, TouchableOpacity, View } from "react-native";

export const CategoryFilter = () => {
    
    const { categories, handleCategoryFilter, filters } = useTransactionContext();

    
    return (
        <View className="mb-6">
            <Text className="text-base font-medium mb-5 text-gray-600">Categorias</Text>

            {
                categories.map(({ id, name }) => (
                    <TouchableOpacity 
                        key={`category-${id}`}
                        onPress={() => handleCategoryFilter(id)}
                        className="flex-row items-center py-2"
                    >
                        <Checkbox 
                            className="mr-4"
                            value={Boolean(filters.categoryIds[id])}
                            onValueChange={() => handleCategoryFilter(id)}    
                        />
                        <Text className="text-white text-lg">{name}</Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    );
}