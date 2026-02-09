import { useRef, useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";

import clsx from "clsx";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";


interface AppInputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    leftIconName?: keyof typeof MaterialIcons.glyphMap;
    label?: string;
}

export const AppInput = <T extends FieldValues>({
    control,
    name,
    leftIconName,
    label,
    secureTextEntry,
    ...rest
}: AppInputParams<T>) => {

    const [isFocused, setIsFocused] = useState(false);

    const [showText, setShowText] = useState(secureTextEntry);

    // Ref para o TextInput, caso seja necessário acessar diretamente o componente, por exemplo, saber se o campo está focado
    const inputRef = useRef<TextInput>(null);

    const checkFocus = () => {
        if (inputRef.current) {
            setIsFocused(inputRef.current.isFocused());
        }
    }


    return (
        <Controller 
            control={control}
            name={name}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
                return (
                    <View className="w-full mt-4">
                        {
                            label && (
                                <Text className={clsx("mb-2 mt-3 text-base", isFocused ? "text-accent-brand": "text-gray-600")}>
                                    {label}
                                </Text>
                            )
                        }

                        <TouchableOpacity 
                            className="flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2 h-16"
                        >
                            {
                                leftIconName && (
                                    <MaterialIcons 
                                        name={leftIconName} 
                                        size={24} 
                                        color={isFocused ? colors["accent-brand"] : colors.gray[600]} 
                                        className="mr-2"    
                                    />
                                )
                            }
                            <TextInput 
                                value={value} 
                                onChangeText={onChange} 
                                {...rest} 
                                placeholderTextColor={colors.gray[700]} 
                                className="flex-1 text-base text-gray-500"
                                ref={inputRef}
                                onFocus={checkFocus}
                                onEndEditing={checkFocus}
                                secureTextEntry={showText}
                            />

                            {
                                secureTextEntry && (
                                    <TouchableOpacity onPress={ () => setShowText((value) => !value)}>
                                        <MaterialIcons 
                                            name={showText ? "visibility" : "visibility-off" }
                                            color={colors.gray[600]}
                                            size={24}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                );
            }}
        />
    );
}