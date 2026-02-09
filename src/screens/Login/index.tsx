import { View } from "react-native";

import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { LoginForm } from "./LoginForm";
import { useAuthContext } from "@/context/auth.context";

export const Login = () => {

    const { user } = useAuthContext();

    return (
        <DismissKeyboardView>
            <View className="flex-1 w-[82%] self-center">
                <LoginForm />
            </View>
        </DismissKeyboardView>
    );
}