import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, TouchableOpacity } from "react-native";

import { PublicStackParamsList } from "@/routes/PublicRoutes";

export const Login = () => {

    const navigation = useNavigation<StackNavigationProp<PublicStackParamsList>>();

    return (
        <View className="flex-1 items-center justify-center bg-white">
            <Text>Tela de login</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}