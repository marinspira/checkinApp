import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { AuthContext } from '@/contexts/AuthContext/AuthContext.js'

export default function Index() {
    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const prepareApp = async () => {
            await SplashScreen.preventAutoHideAsync();
            
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula um carregamento de 2 segundos

            setIsLoading(false);
            await SplashScreen.hideAsync(); // Esconde o splash screen após o carregamento
        };

        prepareApp();
    }, []);

    if (isLoading) {
        return null
    } else if (user) {
        return <Redirect href='/(guest)/home' />;
    } else {
        return <Redirect href='/(publicScreens)/home' />;
    }
};