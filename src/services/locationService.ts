import {
  addLocation,
  getLocation,
  getCitiesByState,
  updateLocation,
} from "../api/locationApi";
import { Location, LocationResponse, CitiesResponse } from "../types/Location";

export const trackUserLocation = async (locationData: Location) => {
  return await addLocation(locationData);
};

export const getUserLocation = async (
  userId: string,
): Promise<LocationResponse> => {
  return await getLocation(userId);
};

export const getStateCities = async (
  state: string,
): Promise<CitiesResponse> => {
  return await getCitiesByState(state);
};

export const updateUserLocation = async (
  userId: string,
  locationData: Pick<Location, "latitude" | "longitude">,
) => {
  return await updateLocation(userId, locationData);
};
