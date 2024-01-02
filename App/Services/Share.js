import { Share } from "react-native"

const SharePlace = (place) => {
  const address = place.vicinity ? place.vicinity : place.formatted_address
  Share.share({
    title: "Share Business",
    message: "Business Name: " + place.name + "\n" + "Address: " + address,
  })
}

export default {
  SharePlace,
}
