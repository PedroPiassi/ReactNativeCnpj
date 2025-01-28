import React from "react";
import { StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Create from "@/pages/register";
import Home from "@/pages/home";

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
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6200EE",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cadastro de Cliente" component={Create} />
      </Tab.Navigator>
    </>
  );
}
