import { authApiClient, apiClient } from "./apiClient";
import { Location, LocationResponse, CitiesResponse } from "../types/Location";

export const addLocation = async (locationData: Location) => {
  const response = await authApiClient.post("/location/add", locationData);
  return response.data;
};

export const getLocation = async (
  userId: string,
): Promise<LocationResponse> => {
  const response = await authApiClient.get(`/location/get/${userId}`);
  return response.data;
};

export const getCitiesByState = async (
  state: string,
): Promise<CitiesResponse> => {
  const response = await apiClient.get(`/location/${state}`);
  return response.data;
};

export const updateLocation = async (
  userId: string,
  locationData: Pick<Location, "latitude" | "longitude">,
) => {
  const response = await authApiClient.put(
    `/location/update/${userId}`,
    locationData,
  );
  return response.data;
};
