import { View, Text, ActivityIndicator } from "react-native"
import React, { useContext, useEffect, useState } from "react"
import GoogleMapViewFull from "../Components/Search/GoogleMapViewFull"
import SearchBar from "../Components/Search/SearchBar"
import { UserLocationContext } from "../Context/UserLocationContext"
import GlobalApi from "../Services/GlobalApi"
import BusinessList from "../Components/Search/BusinessList"
import tw from "twrnc"
export default function Search() {
  const [placeList, setPlaceList] = useState([])
  const { location, setLocation } = useContext(UserLocationContext)
  const [isLoadding, setisLoadding] = useState(false)
  useEffect(() => {
    GetNearBySearchPlace("restaurant")
  }, [])
  const GetNearBySearchPlace = (value) => {
    setisLoadding(true)
    GlobalApi.searchByText(value)
      .then((resp) => {
        setPlaceList(resp.data.results)
        setisLoadding(false)
      })
      .catch((err) => setisLoadding(false))
  }
  return (
    <View>
      <View style={{ position: "absolute", zIndex: 20 }}>
        <SearchBar setSearchText={(value) => GetNearBySearchPlace(value)} />
      </View>

      <View style={tw`absolute top-[10rem]`}>
        {isLoadding ? (
          <ActivityIndicator
            size="large"
            color="red"
            style={tw`flex justify-center left-40`}
          />
        ) : (
          <BusinessList placeList={placeList} />
        )}
      </View>
    </View>
  )
}
