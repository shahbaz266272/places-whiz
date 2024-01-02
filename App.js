import { StatusBar } from "expo-status-bar"
import { LogBox, StyleSheet, Text, View } from "react-native"
import TabNavigation from "./App/Navigations/TabNavigation"
import { NavigationContainer } from "@react-navigation/native"
import tw from "twrnc"
import { useEffect, useState } from "react"
import * as Location from "expo-location"
import { UserLocationContext } from "./App/Context/UserLocationContext"
import HomeNavigation from "./App/Navigations/HomeNavigation"

// Ignore log notification by message
LogBox.ignoreLogs(["Warning: ..."])

//Ignore all log notifications
LogBox.ignoreAllLogs()
export default function App() {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })()
  }, [])
  return (
    <View style={tw`grow bg-white pt-7`}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <StatusBar hidden={false} barStyle="dark-content" />

        <NavigationContainer>
          <TabNavigation />
        </NavigationContainer>
      </UserLocationContext.Provider>
    </View>
  )
}
