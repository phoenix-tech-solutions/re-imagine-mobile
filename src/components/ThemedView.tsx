import { View } from 'react-native';
import { cssInterop } from 'nativewind';

cssInterop(View, { className: 'style' });

export const ThemedView = ({ children, className }) => {
  return (
    <View className={`bg-white dark:bg-black ${className}`}>
      {children}
    </View>
  );
};