import NavigationRoutes from "@/routes";
import "./src/styles/global.css"
import { Login } from '@/screens/Login';
import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";

export default function App() {
  return (
    <SnackbarContextProvider>
      <AuthContextProvider>
        <NavigationRoutes />
      </AuthContextProvider>
    </SnackbarContextProvider>
  );
}
