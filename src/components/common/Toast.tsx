import React, { useEffect, useCallback } from 'react';
import {
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { CheckCircle, XCircle, AlertCircle, Info } from 'lucide-react-native';
import { COLORS } from '../../constants';
import type { ToastType } from '../../contexts/ToastContext';

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onHide: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, onHide }) => {
    const translateY = new Animated.Value(-100);
    const opacity = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(translateY, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => onHide(id));
        }, 3000);

        return () => clearTimeout(timer);
    }, [id, translateY, opacity, onHide]);

    const handleHide = useCallback(() => {
        onHide(id);
    }, [id, onHide]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={24} color={COLORS.white} />;
            case 'error':
                return <XCircle size={24} color={COLORS.white} />;
            case 'warning':
                return <AlertCircle size={24} color={COLORS.white} />;
            default:
                return <Info size={24} color={COLORS.white} />;
        }
    };

    const getBackgroundColor = () => {
        switch (type) {
            case 'success':
                return COLORS.success;
            case 'error':
                return COLORS.error;
            case 'warning':
                return COLORS.warning;
            default:
                return COLORS.info;
        }
    };

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: getBackgroundColor(),
                    transform: [{ translateY }],
                    opacity,
                },
            ]}
        >
            <TouchableOpacity
                style={styles.content}
                onPress={handleHide}
                activeOpacity={0.9}
            >
                {getIcon()}
                <Text style={styles.message}>{message}</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
        zIndex: 9999,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 12,
    },
    message: {
        flex: 1,
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
    },
});