/*const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

const Weather = sequelize.define("Weather", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    temperature: { type: DataTypes.DECIMAL },
    wind_speed: { type: DataTypes.DECIMAL },
    humidity: { type: DataTypes.DECIMAL },
}, {timestamps: true });

sequelize.sync();

module.exports = Weather;:*/