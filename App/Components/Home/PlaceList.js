import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import React from "react"
import { FlatList } from "react-native"
import PlaceItem from "./PlaceItem"
import PlaceItemBig from "./PlaceItemBig"
import { useNavigation } from "@react-navigation/native"

export default function PlaceList({ placeList, isLoading }) {
  const navigator = useNavigation()
  const onPlaceClick = (item) => {
    navigator.navigate("place-detail", {
      screen: "Home",
      params: { place: item },
    })
  }
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="red"
          style={tw`flex justify-center `}
        />
      ) : (
        <View>
          <Text style={{ fontSize: 20, marginTop: 10 }}>
            Found {placeList.length} Places
          </Text>
          <FlatList
            scrollEnabled={false}
            data={placeList}
            renderItem={({ item, index }) => (
              <TouchableOpacity key={index} onPress={() => onPlaceClick(item)}>
                {index % 4 == 0 ? (
                  <PlaceItemBig place={item} />
                ) : (
                  <PlaceItem place={item} />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  )
}
