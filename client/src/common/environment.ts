import { IEnvironment } from "../models/environment";

export const Environment: IEnvironment = {
  serverUrl: process.env.REACT_APP_SERVER_URL ?? "http://127.0.0.1:8000/api",
  mapboxAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN ?? "pk.eyJ1IjoicGVyb3ZpY21hcmtvIiwiYSI6ImNraTlpM3luNTBmejIzMWxjZ3Z4c2UyemsifQ._gNpLUkuTq37QN5unnT5dQ",
  mapboxStyleUrl: process.env.REACT_APP_MAPBOX_STYLE_URL ?? "mapbox://styles/perovicmarko/cktd5g6ig10tk17pp59qqowtd"
}