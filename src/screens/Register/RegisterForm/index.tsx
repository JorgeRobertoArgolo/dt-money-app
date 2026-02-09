import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { AuthHeader } from "@/components/AuthHeader"
import { AppInput } from "@/components/AppInput";
import { AppButton } from "@/components/AppButton";
import { PublicStackParamsList } from "@/routes/PublicRoutes";

import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

interface FormRegisterParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterForm = () => {

    const {
        control,
        handleSubmit,
        formState: { isSubmitting}
    } = useForm<FormRegisterParams>({
        defaultValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
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
                name="name"
                label="NOME"
                placeholder="Seu nome"
                leftIconName="person-outline"
            />

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

            <AppInput
                control={control}
                name="confirmPassword"
                label="CONFIRMAR SENHA"
                placeholder="Confirme sua senha"
                leftIconName="lock-outline"
                secureTextEntry
            />

            <View className="flex-1 justify-between mt-8 mb-6 min-h-[250px]">
                <AppButton mode="fill" iconName="arrow-forward" onPress={handleSubmit(onSubmit)}>
                    Cadastrar
                </AppButton>
        
                <View>
                    <Text className="mb-6 text-gray-300 text-base">Já possui uma conta ?</Text>
                    <AppButton mode="outline" iconName="arrow-forward" onPress={() => navigation.navigate("Login")}>
                        Acessar
                    </AppButton>
                </View>
            </View>
        </>
    )
}