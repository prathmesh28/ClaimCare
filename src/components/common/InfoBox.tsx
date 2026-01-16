import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

interface InfoBoxProps {
    message: string;
    type?: 'info' | 'warning' | 'success' | 'error';
}

export const InfoBox: React.FC<InfoBoxProps> = ({ message, type = 'info' }) => {
    const getColors = () => {
        switch (type) {
            case 'warning':
                return { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' };
            case 'success':
                return { bg: '#d1fae5', border: '#10b981', text: '#065f46' };
            case 'error':
                return { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' };
            default:
                return { bg: COLORS.blue[100], border: COLORS.blue[600], text: COLORS.blue[700] };
        }
    };

    const colors = getColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg, borderLeftColor: colors.border }]}>
            <Text style={[styles.text, { color: colors.text }]}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        marginBottom: 24,
    },
    text: {
        fontSize: 14,
    },
});