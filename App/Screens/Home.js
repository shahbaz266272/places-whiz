import { View, Text, ScrollView, ActivityIndicator } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import Header from "../Components/Home/Header"
import tw from "twrnc"
import GoogleMapView from "../Components/Home/GoogleMapView"
import CategoryList from "../Components/Home/CategoryList"
import { UserLocationContext } from "../Context/UserLocationContext"
import PlaceList from "../Components/Home/PlaceList"
import GlobalApi from "../Services/GlobalApi"

export default function Home() {
  const [placeList, setPlaceList] = useState([])
  const { location, setLocation } = useContext(UserLocationContext)
  const [isLoading, setisLoading] = useState(false)
  useEffect(() => {
    if (location) {
      GetNearBySearchPlace("restaurant")
    }
  }, [location])

  const GetNearBySearchPlace = (value) => {
    setisLoading(true)
    GlobalApi.nearByPlace(
      location.coords.latitude,
      location.coords.longitude,
      value
    )
      .then((resp) => {
        setPlaceList(resp.data.results)
        setisLoading(false)
      })
      .catch((err) => setisLoading(false))
  }
  return (
    <ScrollView nestedScrollEnabled={true} style={tw`py-3 px-2`}>
      {/* <Header /> */}
      <GoogleMapView placeList={placeList} />
      <CategoryList
        setSelectedCategory={(value) => GetNearBySearchPlace(value)}
      />
      <View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={tw`flex justify-center `}
          />
        ) : placeList ? (
          <PlaceList placeList={placeList} isloading={isLoading} />
        ) : null}
      </View>
    </ScrollView>
  )
}
// AIzaSyAVQnPcY4WdXDgqNTh_GqZjeHtyL_ZhHG4
// AIzaSyAw_gW-h5aW4qrVkuj0PnZ7LQUuctqZTCs
