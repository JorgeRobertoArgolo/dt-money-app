import { NavigationContainer } from '@react-navigation/native';

import { PublicRoutes } from './PublicRoutes';
import { useCallback, useState } from 'react';
import { PrivateRoutes } from './PrivatesRoutes';

const NavigationRoutes = () => {

    const [user, setUser] = useState(undefined);

    /**
     * Irá verificar se o usuário existe, ou seja, se está logado
     * se tiver irá renderizar as rotas privadas, senão irá renderizar as
     * rotas públicas.
     */
    const Routes = useCallback(() => {
        if (!user) {
            return <PublicRoutes />;
        } else {
            return <PrivateRoutes />
        }
    }, [user]);

    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    );
}

export default NavigationRoutes;