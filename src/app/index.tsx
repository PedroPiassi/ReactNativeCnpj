import React from "react";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Create from "@/pages/register";
import Home from "@/pages/home";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export type RootTabParamList = {
  Home: undefined;
  "Cadastro de Cliente": undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#6200EE" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: "#6200EE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Home") {
              return <MaterialIcons name="home" size={size} color={color} />;
            } else if (route.name === "Cadastro de Cliente") {
              return <FontAwesome name="user-plus" size={size} color={color} />;
            }
          },
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cadastro de Cliente" component={Create} />
      </Tab.Navigator>
    </>
  );
}
