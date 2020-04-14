
const request = require("request");
function getCoord(res, city, callback) {
    console.log(city)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        city
    )}.json?access_token=${process.env.MAPBOX}`;
    // encodeURIComponent() => convert unsafe string to safe string to parse in url
    // request({ url: url, json: true }, callback (error, successfully_respone)
    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            console.log(error)
          return res.render("weather", { error: "some thing wrong when fetching your location" });
        }

        if(body.features && body.features.length === 0){
            return res.render("weather", { error: "we cannot find your location" })
        }
        const [lng, lat] = body.features[0].geometry.coordinates
        const cityName = body.features[0].place_name
        // console.log(body)
        callback(res, lng, lat, cityName) 
      });
}

module.exports = getCoord