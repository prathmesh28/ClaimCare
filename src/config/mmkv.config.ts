import { createMMKV } from 'react-native-mmkv';

export const storage = new createMMKV({
    id: 'medical-claims-storage',
    encryptionKey: 'medical-claims-encryption-key-2025',
});

