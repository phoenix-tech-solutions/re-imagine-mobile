import * as React from "react";
import { TextInput, View } from "react-native";
import { cn } from "~/lib/utils";
import { Text } from "./text";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: string;
}

const Input = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  InputProps
>(({ className, label, labelClasses, inputClasses, error, ...props }, ref) => {
  return (
    <View className={cn("flex flex-col space-y-1.5", className)}>
      {label && (
        <Text
          className={cn("text-sm font-medium text-foreground", labelClasses)}
        >
          {label}
        </Text>
      )}
      <TextInput
        ref={ref}
        className={cn(
          "flex h-12 native:h-14 native:text-lg web:ring-offset-background file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 lg:text-sm native:leading-[1.25] text-foreground rounded-lg border border-input bg-background px-4 py-2 file:text-foreground disabled:cursor-not-allowed disabled:opacity-50",
          inputClasses,
        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-sm text-red-500 mt-1">
          {error}
        </Text>
      )}
    </View>
  );
});

Input.displayName = "Input";

export { Input };
