import React from "react";
import {
  Text,
  StyleSheet,
  Alert,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  View,
} from "react-native";
import { CustomTextInput } from "@/components/textInput";
import * as ImagePicker from "expo-image-picker";
import { useCustomerDataBase } from "@/database/useCustomerDatabase";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { RootTabParamList } from "@/app";

const formikValidation = Yup.object().shape({
  cnpj: Yup.string().required("Campo obrigatório"),
  photo: Yup.string().required("Foto é obrigatória"),
});

export default function Create() {
  const customerDataBase = useCustomerDataBase();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const formik = useFormik({
    initialValues: {
      cnpj: "",
      business_name: "",
      address: {
        street: "",
        number: "",
        city: "",
        neighborhood: "",
        state: "",
        zipCode: "",
      },
      photo: "",
    },
    validationSchema: formikValidation,
    onSubmit: async (values) => {
      try {
        await customerDataBase.create({
          cnpj: values.cnpj,
          business_name: values.business_name,
          address: values.address,
          photo: values.photo,
        });

        Alert.alert("Cliente cadastrado com sucesso!");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Erro desconhecido";
        Alert.alert("Erro", errorMessage);
      } finally {
        formik.resetForm();
        navigation.navigate("Home");
      }
    },
  });

  async function handleGetInfo() {
    const formattedCnpj = formik.values.cnpj.replace(/\D/g, "");
    const url = `https://www.receitaws.com.br/v1/cnpj/${formattedCnpj}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "ERROR") {
        Alert.alert("Erro", data.message);
      } else {
        formik.setFieldValue("business_name", data.nome);
        formik.setFieldValue("address", {
          street: data.logradouro || "",
          number: data.numero || "S/N",
          city: data.municipio || "",
          neighborhood: data.bairro || "",
          state: data.uf || "",
          zipCode: data.cep || "",
        });
        Alert.alert("Sucesso", `Dados do CNPJ carregados.`);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível obter os dados.");
    }
  }

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Conceda permissão para acessar a galeria."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      formik.setFieldValue("photo", uri);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <CustomTextInput
        label="CNPJ"
        placeholder="Digite o CNPJ"
        maskType="cnpj"
        value={formik.values.cnpj}
        onChangeText={formik.handleChange("cnpj")}
        onBlur={() => {
          formik.handleBlur("cnpj");
          handleGetInfo();
        }}
        errorMessage={
          formik.touched.cnpj && formik.errors.cnpj
            ? formik.errors.cnpj
            : undefined
        }
      />
      <CustomTextInput
        label="Razão Social"
        value={formik.values.business_name}
        disabled={false}
      />
      <CustomTextInput
        value={formik.values.address.street}
        label="Logradouro"
        disabled={false}
      />
      <CustomTextInput
        value={formik.values.address.number}
        disabled={false}
        label="Número"
      />
      <CustomTextInput
        value={formik.values.address.neighborhood}
        disabled={false}
        label="Bairro"
      />
      <CustomTextInput
        value={formik.values.address.city}
        disabled={false}
        label="Município"
      />
      <CustomTextInput
        value={formik.values.address.state}
        disabled={false}
        label="UF"
      />
      <CustomTextInput
        value={formik.values.address.zipCode}
        disabled={false}
        label="CEP"
      />

      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        <Text style={styles.imagePickerText}>Selecionar Foto</Text>
      </TouchableOpacity>

      {formik.values.photo && (
        <Image
          source={{ uri: formik.values.photo }}
          style={styles.imagePreview}
        />
      )}

      {formik.touched.photo && formik.errors.photo && (
        <Text style={styles.errorText}>{formik.errors.photo}</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F44336" }]}
          onPress={() => formik.resetForm()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#4CAF50" }]}
          onPress={() => formik.handleSubmit()}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingInline: 16,
    marginTop: 16,
    backgroundColor: "#f5f5f5",
  },
  imagePicker: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  imagePickerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 6,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10,
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
