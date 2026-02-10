import { NavigationContainer } from '@react-navigation/native';

import { PublicRoutes } from './PublicRoutes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './PrivatesRoutes';

import { SystemBars } from 'react-native-edge-to-edge';
import { useAuthContext } from '@/context/auth.context';

const NavigationRoutes = () => {

    const { token, user } = useAuthContext();

    /**
     * Irá verificar se o usuário existe, ou seja, se está logado
     * se tiver irá renderizar as rotas privadas, senão irá renderizar as
     * rotas públicas.
     */
    const Routes = useCallback(() => {
        if (!user || !token) {
            return <PublicRoutes />;
        } else {
            return <PrivateRoutes />
        }
    }, [user, token]);

    return (
        <NavigationContainer>
            <SystemBars style={'light'} />
            <Routes />
        </NavigationContainer>
    );
}

export default NavigationRoutes;