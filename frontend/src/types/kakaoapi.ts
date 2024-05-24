export interface LocalKeywordRequest {
  query: string;
  category_group_code?: string;
  x?: number;
  y?: number;
  radius?: number;
  rect?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export interface LocalKeywordResponse {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name: {
      region: string[];
      keyword: string;
      selected_region: string;
    }
  },
  documents: {
    id: string;
    place_name: string;
    category_name: string;
    category_group_code: string;
    category_group_name: string;
    phone: string;
    address_name: string;
    road_address_name: string;
    x: number;
    y: number;
    place_url: string;
    distance: number;
  }[];
}