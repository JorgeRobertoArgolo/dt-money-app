import NavigationRoutes from "@/routes";
import "./src/styles/global.css"
import { Login } from '@/screens/Login';
import { AuthContextProvider } from "@/context/auth.context";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationRoutes />
    </AuthContextProvider>
  );
}
