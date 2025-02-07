import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from "react-native";

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState(""); // For at gemme bynavnet

  useEffect(() => {
    fetch("http://10.108.169.52:5000/api/weather")  // Backend-URL skal returnere flere poster
      .then((response) => response.json())
      .then((data) => {
        // Filter data per dag baseret på datoen
        const groupedData = data.reduce((acc, item) => {
          const date = new Date(item.date).toLocaleDateString("da-DK");  // Få datoen uden tid
          if (!acc[date]) {
            acc[date] = item;  // Gem den første post for hver dato
          }
          return acc;
        }, {});

        // Transformere data for at vise én opdatering per dag
        const transformedData = Object.values(groupedData).map((item) => {
          // Konverter temperatur fra Kelvin til Celsius
          const temperatureInCelsius = (item.temperature - 273.15).toFixed(2);

          // Afrunde vindhastigheden til én decimal
          const windSpeed = item.windSpeed.toFixed(1);

          // Formatere datoen til et mere brugervenligt format med fast tidspunkt
          const formattedDate = new Date(item.date);
          formattedDate.setHours(12, 0, 0, 0);  // Sæt tidspunktet til kl. 12:00
          const dateWithTime = formattedDate.toLocaleString("da-DK", {
            weekday: "long", // "mandag"
            year: "numeric", // "2025"
            month: "long", // "februar"
            day: "numeric", // "7"
            hour: "2-digit", // "12"
            minute: "2-digit", // "00"
          });

          return {
            temperature: temperatureInCelsius,
            windSpeed: windSpeed,
            date: dateWithTime, // Vis dato med klokkeslæt
            location: item.location,
          };
        });

        // Hent bynavn baseret på den første lokation
        const { lat, lon } = transformedData[0]?.location || {};
        if (lat && lon) {
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=8e5f6042a88e46a7a9d155bf7474e2e5`
          )
            .then((response) => response.json())
            .then((geocodeData) => {
              const city = geocodeData.results[0]?.components?.city || "Ukendt by";
              setLocationName(city);
            })
            .catch((geocodeError) => {
              console.error("Fejl ved geokodning:", geocodeError);
              setLocationName("Ukendt by");
            });
        }

        setWeatherData(transformedData); // Sætter de transformerede data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fejl ved hentning af data:", error);
        setError("Fejl ved hentning af data");
        setLoading(false);
      });
  }, []); // Effekt kører kun én gang ved første rendering

  if (loading) return <ActivityIndicator size="large" color="#4CAF50" />; // Ændret til grøn farve
  if (error) return <Text style={styles.error}>{error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vejrudsigten for {locationName}</Text>
      <FlatList
        data={weatherData} // Liste af vejrdata
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.parameter}>
              🌡️ <Text style={styles.parameterText}>Temperatur:</Text> <Text style={styles.value}>{item.temperature}°C</Text>
            </Text>
            <Text style={styles.parameter}>
              💨 <Text style={styles.parameterText}>Vind:</Text> <Text style={styles.value}>{item.windSpeed} m/s</Text>
            </Text>
            <Text style={styles.parameter}>
              📅 <Text style={styles.parameterText}>Dato og tidspunkt:</Text> <Text style={styles.value}>{item.date}</Text>
            </Text>
            <Text style={styles.parameter}>
              📍 <Text style={styles.parameterText}>Lokation:</Text> <Text style={styles.value}>{locationName}</Text>
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f0f4f7" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50", // Grøn farve
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "Arial",
  },
  card: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  parameter: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10, // Mere afstand mellem linjerne
    flexDirection: "row",
    alignItems: "center",
  },
  parameterText: {
    fontWeight: "bold", // Parameteren er fed
    marginRight: 5, // Afstand mellem emoji og parameter
  },
  value: {
    fontSize: 16,
    color: "#555",
    fontWeight: "normal", // Dataen står ikke i fed
  },
  error: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default WeatherScreen;
