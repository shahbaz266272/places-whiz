import { View, Text } from "react-native"
import React from "react"
import Colors from "../../Shared/Colors"
import { Dimensions } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { FlatList } from "react-native"
import BusinessItem from "./BusinessItem"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"

export default function BusinessList({ placeList }) {
  const navigator = useNavigation()
  return (
    <View>
      <LinearGradient
        // Background Linear Gradient
        colors={["transparent", Colors.WHITE]}
        style={{ padding: 20, width: Dimensions.get("screen").width }}
      >
        {placeList?.length > 0 && (
          <FlatList
            data={placeList}
            horizontal={true}
            renderItem={({ item, index }) =>
              index <= 6 && (
                <TouchableOpacity
                  onPress={() =>
                    navigator.navigate("place-detail", {
                      params: { place: item },
                    })
                  }
                >
                  <BusinessItem place={item} />
                </TouchableOpacity>
              )
            }
          />
        )}
      </LinearGradient>
    </View>
  )
}
