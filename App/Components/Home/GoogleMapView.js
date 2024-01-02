import { View, Text, Dimensions, ActivityIndicator } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { UserLocationContext } from "../../Context/UserLocationContext"
import PlaceMarker from "./PlaceMarker"
import tw from "twrnc"

export default function GoogleMapView({ placeList }) {
  const [mapRegion, setmapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const { location, setLocation } = useContext(UserLocationContext)
  useEffect(() => {
    if (location && location !== undefined && location !== null) {
      setmapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0422,
        longitudeDelta: 0.0421,
      })
    }
  }, [location])

  return (
    <View style={{ marginTop: 20, paddingLeft: 5, paddingRight: 5 }}>
      <Text
        style={{
          fontSize: 20,
          marginBottom: 10,
          fontWeight: "600",
        }}
      >
        Top Near By Places
      </Text>
      <View style={tw`rounded-[20px] overflow-hidden px-2`}>
        {location ? (
          <MapView
            style={{
              width: "100%",
              height: 200,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            region={mapRegion}
          >
            <Marker title="You" coordinate={mapRegion} />
            {placeList?.length > 0 &&
              placeList.map(
                (item, index) =>
                  index <= 10 && <PlaceMarker item={item} key={index} />
              )}
          </MapView>
        ) : (
          <ActivityIndicator
            size="large"
            color="red"
            style={tw`flex justify-center `}
          />
        )}
      </View>
    </View>
  )
}
