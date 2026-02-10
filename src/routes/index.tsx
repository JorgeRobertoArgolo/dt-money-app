import { NavigationContainer } from '@react-navigation/native';

import { PublicRoutes } from './PublicRoutes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './PrivatesRoutes';

import { SystemBars } from 'react-native-edge-to-edge';
import { useAuthContext } from '@/context/auth.context';
import { Loading } from '@/screens/Loading';

const NavigationRoutes = () => {

    const [loading, setLoading] = useState(true);

    const { token, user } = useAuthContext();

    /**
     * Irá verificar se o usuário existe, ou seja, se está logado
     * se tiver irá renderizar as rotas privadas, senão irá renderizar as
     * rotas públicas.
     */
    const Routes = useCallback(() => {
        if (loading) {
            return <Loading setLoading={setLoading}/>;
        }

        if (!user || !token) {
            return <PublicRoutes />;
        } else {
            return <PrivateRoutes />
        }
    }, [user, token, loading]);

    return (
        <NavigationContainer>
            <SystemBars style={'light'} />
            <Routes />
        </NavigationContainer>
    );
}

export default NavigationRoutes;