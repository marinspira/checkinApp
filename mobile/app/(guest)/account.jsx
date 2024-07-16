import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthView from '@/components/containers/AuthView.jsx';
import Checkin from "@/components/checkin";

export default function Account() {
    const [view, setView] = useState('home');

    if (view === 'home') {
        return (
            <AuthView>
                <Text onPress={() => setView('checkin')}>Checkin</Text>
            </AuthView>
        );
    } else if (view === 'checkin') {
        return <Checkin closeWindow={() => setView('home')} />;
    }

    // return <Checkin />
}

const styles = StyleSheet.create({

});
