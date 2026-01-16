import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, ListRenderItem } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { COLORS } from '../../constants';

interface SelectProps {
    label?: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    required?: boolean;
}

const SelectItem = React.memo(({ item, selected, onPress }: { item: string, selected: boolean, onPress: (o: string) => void }) => {
    const handlePress = () => onPress(item);
    return (
        <TouchableOpacity
            style={styles.option}
            onPress={handlePress}
        >
            <Text
                style={[
                    styles.optionText,
                    selected && styles.optionTextActive,
                ]}
            >
                {item}
            </Text>
        </TouchableOpacity>
    );
});

export const Select: React.FC<SelectProps> = ({
    label,
    value,
    options,
    onChange,
    required = false,
}) => {
    const [showOptions, setShowOptions] = useState(false);

    const handleSelect = useCallback((option: string) => {
        onChange(option);
        setShowOptions(false);
    }, [onChange]);

    const toggleShowOptions = useCallback(() => {
        setShowOptions(true);
    }, []);

    const toggleHideOptions = useCallback(() => {
        setShowOptions(false);
    }, []);

    const keyExtractor = useCallback((item: string) => item, []);

    const renderItem: ListRenderItem<string> = useCallback(({ item }) => (
        <SelectItem
            item={item}
            selected={value === item}
            onPress={handleSelect}
        />
    ), [value, handleSelect]);

    return (
        <View style={styles.container}>
            {label && (
                <Text style={styles.label}>
                    {label}
                    {required && <Text style={styles.required}> *</Text>}
                </Text>
            )}
            <TouchableOpacity style={styles.select} onPress={toggleShowOptions}>
                <Text style={styles.selectText}>{value}</Text>
                <ChevronDown size={20} color={COLORS.gray[500]} />
            </TouchableOpacity>

            <Modal visible={showOptions} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={toggleHideOptions}
                >
                    <View style={styles.modalContent}>
                        <FlatList
                            data={options}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.gray[900],
        marginBottom: 8,
    },
    required: {
        color: COLORS.error,
    },
    select: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray[300],
        borderRadius: 8,
        padding: 12,
    },
    selectText: {
        fontSize: 16,
        color: COLORS.gray[900],
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        maxHeight: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    option: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray[200],
    },
    optionText: {
        fontSize: 16,
        color: COLORS.gray[700],
    },
    optionTextActive: {
        color: COLORS.primary,
        fontWeight: '600',
    },
});