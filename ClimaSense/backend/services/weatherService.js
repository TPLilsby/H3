const fetchWeatherData = async () => {
  const apiKey = process.env.API_KEY;  // API-nøglen opbevares i miljøvariabler
  const coords = "POINT(12.561 55.715)";  // Erstat med de korrekte koordinater
  const temperatureParameter = "temperature-2m";  // Temperatur parameter
  const windParameter = "wind-speed-10m";  // Vindhastighed parameter
  const url = `https://dmigw.govcloud.dk/v1/forecastedr/collections/harmonie_dini_sf/position?coords=${coords}&crs=crs84&parameter-name=${temperatureParameter},${windParameter}&api-key=${apiKey}&f=GeoJSON`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      // Hent flere datapunkter (f.eks. for flere timer/dage)
      const weatherData = data.features.map((feature) => {
        const temperature = feature.properties[temperatureParameter];
        const windSpeed = feature.properties[windParameter];
        const date = feature.properties.step;  // Datoen for dataene
        const coordinates = feature.geometry.coordinates;  // Lokationen (koordinater)

        return {
          temperature,
          windSpeed,
          date,
          location: {
            lat: coordinates[1],
            lon: coordinates[0],
          },
        };
      });

      // Returner alle de hentede datapunkter
      return weatherData;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    throw new Error("Failed to fetch weather data");
  }
};

module.exports = { fetchWeatherData };
