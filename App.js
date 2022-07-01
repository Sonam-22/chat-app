/// import the screens
import "./app-firebase/firebase";
import Start from "./components/Start";
import Chat from "./components/Chat";

// import react native gesture handler
import "react-native-gesture-handler";
import {
  ActionSheetProvider,
  connectActionSheet,
} from "@expo/react-native-action-sheet";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Create the navigator
const Stack = createStackNavigator();

function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Start}
        />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const WithActionSheet = connectActionSheet(Main);

export default function App() {
  return (
    <ActionSheetProvider>
      <WithActionSheet />
    </ActionSheetProvider>
  );
}
