import { Text, View } from "react-native";
import { useForm } from "react-hook-form";

import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput";
import { AuthHeader } from "@/components/AuthHeader";
import { PublicStackParamsList } from "@/routes/PublicRoutes";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export interface FormLoginParams {
    email: string;
    password: string;
}

export const LoginForm = () => {
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting}
    } = useForm<FormLoginParams>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: yupResolver(schema),
    })
    
    const navigation = useNavigation<NavigationProp<PublicStackParamsList>>();

    const onSubmit = async () => {
        
    }

    return (
        <>
            <AuthHeader />

            <AppInput
                control={control}
                name="email"
                label="EMAIL"
                placeholder="mail@example.com"
                leftIconName="mail-outline"
            />
            <AppInput
                control={control}
                name="password"
                label="SENHA"
                placeholder="Sua senha"
                leftIconName="lock-outline"
                secureTextEntry
            />

            <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
                <AppButton mode="fill" iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
                    Login
                </AppButton>
        
                <View>
                    <Text className="mb-6 text-gray-300 text-base">Ainda não possui uma conta ?</Text>
                    <AppButton mode="outline" iconName="arrow-forward" onPress={() => navigation.navigate("Register")}>
                        Cadastrar
                    </AppButton>
                </View>
            </View>
        </>
    )
}