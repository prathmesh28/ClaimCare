import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useToast } from '../../hooks/useToast';
import { Toast } from './Toast';

export const ToastContainer: React.FC = () => {
    const { toasts, hideToast } = useToast();

    return (
        <View style={styles.container} pointerEvents="box-none">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    message={toast.message}
                    type={toast.type}
                    onHide={hideToast}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    },
});
