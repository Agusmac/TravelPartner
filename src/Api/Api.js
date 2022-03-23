import axios from "axios";

export default async function getInfo(type, limits,altKey) {
  const params = {
    params: {
      bl_latitude: limits.sw.lat,
      tr_latitude: limits.ne.lat,
      bl_longitude: limits.sw.lng,
      tr_longitude: limits.ne.lng,
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_TRAVEL_KEY
    }
  }
  const url = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
  try {
    const { data: { data } } = await axios.get(url, params);

    const filteredData=data.filter(item=>item.photo&&item.name)

    return filteredData
  } catch (error) {
    // getInfo(type, limits,process.env.REACT_APP_TRAVEL_KEY2)
    console.log(error)
  }

}

