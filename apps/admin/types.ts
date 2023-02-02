export interface DataConfig {
  artistName: string;
  logoUrl: string;
  websiteUrl: string;
  adminUrl: string;
  dbName: string;
  bandsInTownApiEndpoint: string;
}

export interface AudioSuggestion {
  identifier: string;
  name: string;
  provider: string;
  imageUrl: string;
}
