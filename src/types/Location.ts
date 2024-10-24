export interface Location {
  userId: string;
  latitude: number;
  longitude: number;
  formattedAddress?: string;
}

export interface LocationResponse {
  resultMessage: {
    en: string;
    tr: string;
  };
  resultCode: string;
  location: {
    latitude: number;
    longitude: number;
    formattedAddress?: string;
  };
}

export interface CitiesResponse {
  resultMessage: {
    en: string;
    hi: string;
  };
  resultCode: string;
  cities: string[];
}
