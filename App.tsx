import "reflect-metadata"; //for typeorm
import "react-native-gesture-handler";
import * as React from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import HomeScreen from "./screens/HomeScreen";
import Clients from "./screens/clients/Clients";
import Products from "./screens/products/Products";
import Warehouses from "./screens/warehouses/Warehouses";
import Workdays from "./screens/workdays/Workdays";
import LocalDatabase from "./database/LocalDatabase";

const Drawer = createDrawerNavigator();

export default function App() {
  const queryClient = new QueryClient();
  const localDatabase = LocalDatabase.getInstance();

  const [isAppReady, setIsAppReady] = React.useState(false)

  React.useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await localDatabase.awaitDbConnection();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
// <View onLayout={onLayoutRootView}>
    //<DbContext.Provider value={localDatabase}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: "center" }}>
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Main screen" }} />
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
    //</DbContext.Provider>
// </View>
  );
}
