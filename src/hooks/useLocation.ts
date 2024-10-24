import { useState, useCallback } from "react";
import {
  trackUserLocation,
  getUserLocation,
  getStateCities,
  updateUserLocation,
} from "../services/locationService";
import { Location, LocationResponse, CitiesResponse } from "../types/Location";

export const useLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addLocation = useCallback(async (locationData: Location) => {
    setLoading(true);
    setError(null);
    try {
      return await trackUserLocation(locationData);
    } catch (err) {
      setError("Failed to track location");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getLocation = useCallback(
    async (userId: string): Promise<LocationResponse> => {
      setLoading(true);
      setError(null);
      try {
        return await getUserLocation(userId);
      } catch (err) {
        setError("Failed to get location");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getCities = useCallback(
    async (state: string): Promise<CitiesResponse> => {
      setLoading(true);
      setError(null);
      try {
        return await getStateCities(state);
      } catch (err) {
        setError("Failed to get cities");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateLocation = useCallback(
    async (
      userId: string,
      locationData: Pick<Location, "latitude" | "longitude">,
    ) => {
      setLoading(true);
      setError(null);
      try {
        return await updateUserLocation(userId, locationData);
      } catch (err) {
        setError("Failed to update location");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    loading,
    error,
    addLocation,
    getLocation,
    getCities,
    updateLocation,
  };
};
