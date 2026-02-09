import { View } from "react-native";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";

import { RegisterForm } from "./RegisterForm";

export const Register = () => {
    return (
        <DismissKeyboardView>
            <View className="flex-1 w-[82%] self-center">
                <RegisterForm />
            </View>
        </DismissKeyboardView>
    );
}