import "reflect-metadata"; //for typeorm
import "react-native-gesture-handler";
import * as React from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import HomeScreen from "./screens/HomeScreen";
import Clients from "./screens/clients/Clients";
import Products from "./screens/products/Products";
import Warehouses from "./screens/warehouses/Warehouses";
import Workdays from "./screens/workdays/Workdays";
import LocalDatabase from "./database/LocalDatabase";

const localDatabase = LocalDatabase.getInstance();
const Drawer = createDrawerNavigator();

export default function App() {
  const queryClient = new QueryClient();

  const [isAppReady, setIsAppReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await localDatabase.initialize();
        await localDatabase.awaitDbConnection();
        await localDatabase.populateDatabase();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsAppReady(true);
      }
    }
    prepare();
  }, []);

  React.useEffect(() => {
    if (isAppReady) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [isAppReady]);

  return isAppReady ? (
    <PaperProvider theme={defaultTheme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "DRaport" }} />
            <Drawer.Screen
              name="Clients"
              component={Clients}
              options={{
                title: "Clients",
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Products"
              component={Products}
              options={{
                title: "Products",
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Warehouses"
              component={Warehouses}
              options={{
                title: "Warehouses",
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Workdays"
              component={Workdays}
              options={{
                title: "Workdays",
                headerShown: false,
                unmountOnBlur: true,
              }}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  ) : null;
}

const defaultTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
  dark: true,
};
