import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInputProps,
  TextInput,
} from "react-native";
import { TextInputMask, TextInputMaskProps } from "react-native-masked-text";

type CustomTextInputProps = TextInputProps & {
  label?: string;
  errorMessage?: string;
  maskType?: "cpf" | "cnpj" | "custom";
  maskOptions?: TextInputMaskProps["options"];
  value?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
};

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  errorMessage,
  maskType,
  maskOptions,
  value,
  onChangeText,
  disabled = false,
  ...props
}) => {
  return (
    <View style={[styles.container]}>
      {label && <Text style={styles.label}>{label}</Text>}

      {maskType ? (
        <TextInputMask
          type={maskType}
          options={maskOptions}
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          {...props}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.textInput}
          editable={disabled}
          {...props}
        />
      )}

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgb(30, 30, 30)",
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
    height: 40,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fff",
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});
