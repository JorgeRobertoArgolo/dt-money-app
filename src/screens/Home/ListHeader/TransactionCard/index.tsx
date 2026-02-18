import { FC } from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"

import { colors } from "@/shared/colors";
import { TransactionTypes } from "@/shared/helpers/TransactionTypes";

type TransactionCardType = TransactionTypes | "total";

interface Props {
    type: TransactionCardType;
    amount: number;
}

interface IconsData {
    name: keyof typeof MaterialIcons.glyphMap;
    color: string;
}

const ICONS: Record<TransactionCardType, IconsData> = {
    [TransactionTypes.REVENUE] : {
        color: colors["accent-brand-light"],
        name: "arrow-circle-up",
    },
    [TransactionTypes.EXPENSE] : {
        color: colors["accent-red"],
        name: "arrow-circle-down",
    },
    total: {
        color: colors.white,
        name: "attach-money",
    }
};

interface CardData {
    label: string;
    bgColor: string;
}

const CARD_DATA: Record<TransactionCardType, CardData> = {
    [TransactionTypes.EXPENSE]: {
        label: 'Saída',
        bgColor: "background-tertiary"
    },
    [TransactionTypes.REVENUE]: {
        label: 'Entrada',
        bgColor: "background-tertiary"
    },
    total: {
        label: "Total",
        bgColor: "accent-brand-background-primary"
    }
}

export const TransactionCard: FC<Props> = ({ amount, type }) => {
    
    const iconData = ICONS[type]
    const cardData = CARD_DATA[type];
    
    return (
        <View className={`bg-${cardData.bgColor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`}>
            <View className="flex-row justify-between items-center mb-1">
                <Text className="text-white text-base">{cardData.label}</Text>
                <MaterialIcons name={iconData.name} size={26} color={iconData.color}/>
            </View>
            <View>
                <Text className="text-2xl text-gray-400 font-bold">
                    R$ {amount.toFixed(2).replace(".", ",")}
                </Text>
            </View>
        </View>
    );
}