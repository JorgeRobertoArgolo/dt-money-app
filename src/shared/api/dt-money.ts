import axios from "axios";
import { Platform } from "react-native";

const baseURL = Platform.select({
    ios: "http://localhost:3001",
    android: "http://localhost:3001",
})

export const dtMoneyApi = axios.create({
    baseURL,
});