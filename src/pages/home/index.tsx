import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import {
  CustomerDataBase,
  useCustomerDataBase,
} from "@/database/useCustomerDatabase";
import { useFocusEffect } from "expo-router";

export default function Home() {
  const [customers, setCustomers] = useState<CustomerDataBase[]>([]);
  const customerDataBase = useCustomerDataBase();

  async function handleGetCustomers() {
    try {
      const response = await customerDataBase.getAll();
      setCustomers(response || []);
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handleGetCustomers();
    }, [])
  );

  return (
    <FlatList
      data={customers}
      keyExtractor={(item) => item.cnpj}
      renderItem={({ item }) => {
        const address =
          typeof item.address === "string"
            ? JSON.parse(item.address)
            : item.address;
        const imageUri = item.photo
          ? `data:image/jpeg;base64,${item.photo}`
          : undefined;

        return (
          <View style={styles.clienteCard}>
            {item.photo && (
              <Image source={{ uri: imageUri }} style={styles.clienteImage} />
            )}
            <View style={styles.clienteInfo}>
              <Text style={styles.clienteText}>CNPJ: {item.cnpj}</Text>
              <Text style={styles.clienteText}>
                Razão Social: {item.business_name}
              </Text>
              <Text style={styles.clienteText}>
                Endereço:{" "}
                {`${address.street}, ${address.number}, ${address.neighborhood}, ${address.city} - ${address.state}, CEP: ${address.zipCode}`}
              </Text>
            </View>
          </View>
        );
      }}
      contentContainerStyle={styles.lista}
    />
  );
}

const styles = StyleSheet.create({
  clienteCard: {
    flexDirection: "row",
    marginInline: 16,
    padding: 16,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  clienteImage: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 10,
  },
  clienteInfo: {
    flex: 1,
  },
  clienteText: {
    fontSize: 14,
    marginBottom: 4,
  },
  lista: {
    marginTop: 20,
  },
});
