import { View, Text } from "react-native"
import React, { useEffect, useState } from "react"
import { useRoute } from "@react-navigation/native"
import PlaceDetailItem from "./PlaceDetailItem"
import Colors from "../../Shared/Colors"
import GoogleMapView from "../Home/GoogleMapView"
import { TouchableOpacity } from "react-native"
import { Platform } from "react-native"
import { Linking } from "react-native"
import { ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import tw from "twrnc"
export default function PlaceDetail() {
  const param = useRoute().params
  const [place, setPlace] = useState([])
  useEffect(() => {
    setPlace(param?.params?.place)
  }, [])

  const onDirectionClick = () => {
    const { lat, lng } = place.geometry.location
    const address = place.vicinity ? place.vicinity : place.formatted_address

    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lng}&q=${address}`,
      android: `geo:${lat},${lng}?q=${address}`,
    })

    Linking.openURL(url)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return (
    <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE, flex: 1 }}>
      <PlaceDetailItem
        place={place}
        onDirectionClick={() => onDirectionClick()}
      />
      <GoogleMapView placeList={[param?.params?.place]} />
      <TouchableOpacity
        style={{
          backgroundColor: Colors.YELLOW,
          padding: 15,
          alignContent: "center",
          alignItem: "center",
          margin: 8,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          paddingBottom: 15,
        }}
        onPress={() => onDirectionClick()}
      >
        <Ionicons name="navigate-circle-outline" size={30} color="white" />

        <Text
          style={{
            textAlign: "center",
            color: Colors.WHITE,
          }}
        >
          Get Direction on Map
        </Text>
      </TouchableOpacity>
      <View style={tw`h-10`}></View>
    </ScrollView>
  )
}