import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  CustomerDataBase,
  useCustomerDataBase,
} from "@/database/useCustomerDatabase";
import { useFocusEffect } from "expo-router";

export default function Home() {
  const customerDataBase = useCustomerDataBase();

  const [customers, setCustomers] = useState<CustomerDataBase[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 4;

  async function fetchCustomers(newPage = 0, reset = false) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const newCustomers = await customerDataBase.getAll(
        ITEMS_PER_PAGE,
        newPage * ITEMS_PER_PAGE
      );

      if (newCustomers.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }

      setCustomers((prev) =>
        reset ? newCustomers : [...prev, ...newCustomers]
      );
      setPage(newPage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      setCustomers([]);
      setPage(0);
      setHasMore(true);
      fetchCustomers(0, true);
    }, [])
  );

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      fetchCustomers(page + 1);
    }
  };

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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.spinner}
          />
        ) : null
      }
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
  spinner: {
    marginVertical: 20,
  },
});
