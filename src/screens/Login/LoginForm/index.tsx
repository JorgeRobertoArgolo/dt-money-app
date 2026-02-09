import { AppInput } from "@/components/AppInput";
import { useForm } from "react-hook-form";
import { Text } from "react-native";

export interface FormLoginParams {
    email: string;
    password: string;
}

export const LoginForm = () => {
    
    const {
        control,
        handleSubmit,
        formState: { isSubmitting}
    } = useForm<FormLoginParams>()
    
    return (
        <>
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
        </>
    )
}