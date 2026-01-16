import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
    return (
        <View style={styles.container}>
            {icon}
            <Text style={styles.title}>{title}</Text>
            {description && <Text style={styles.description}>{description}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 40,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderWidth: 0.5,
        borderColor: COLORS.gray[300]
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.gray[900],
        marginTop: 16,
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        color: COLORS.gray[500],
        marginTop: 8,
        textAlign: 'center',
    },
});
