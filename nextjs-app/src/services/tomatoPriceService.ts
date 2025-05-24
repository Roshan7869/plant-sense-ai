import { supabase } from "@/integrations/supabase/client";
import { format, parse } from "date-fns";

export interface TomatoPrice {
  id: string;
  district_name: string;
  market_name: string;
  commodity: string;
  variety: string;
  grade: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  price_date: string;
}

export const fetchTomatoPrices = async (filters: {
  district?: string;
  market?: string;
  variety?: string;
  grade?: string;
  fromDate?: string;
  toDate?: string;
}) => {
  let query = supabase
    .from("tomato_prices")
    .select("*")
    .order("price_date", { ascending: false });

  if (filters.district) {
    query = query.ilike("district_name", `%${filters.district}%`);
  }
  
  if (filters.market) {
    query = query.ilike("market_name", `%${filters.market}%`);
  }
  
  if (filters.variety) {
    query = query.ilike("variety", `%${filters.variety}%`);
  }
  
  if (filters.grade) {
    query = query.ilike("grade", `%${filters.grade}%`);
  }
  
  if (filters.fromDate) {
    query = query.gte("price_date", filters.fromDate);
  }
  
  if (filters.toDate) {
    query = query.lte("price_date", filters.toDate);
  }

  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching tomato prices:", error);
    return [];
  }
  
  return data || [];
};

export const uploadImage = async (file: File, path: string) => {
  const { data, error } = await supabase.storage
    .from("tomato_images")
    .upload(path, file);

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  return data.path;
};

export const getImageUrl = (path: string) => {
  const { data } = supabase.storage.from("tomato_images").getPublicUrl(path);
  return data.publicUrl;
};

export const getUniqueDistricts = async () => {
  const { data, error } = await supabase
    .from("tomato_prices")
    .select("district_name")
    .order("district_name")
    .limit(10);
    
  if (error) {
    console.error("Error fetching districts:", error);
    return [];
  }
  
  return [...new Set(data.map(item => item.district_name))];
};

export const getUniqueMarkets = async (district?: string) => {
  let query = supabase
    .from("tomato_prices")
    .select("market_name")
    .order("market_name");
    
  if (district) {
    query = query.eq("district_name", district);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching markets:", error);
    return [];
  }
  
  return [...new Set(data.map(item => item.market_name))];
};

export const formatPriceDate = (dateStr: string) => {
  try {
    // Parse the date and format it to a readable string
    const date = new Date(dateStr);
    return format(date, "dd-MMM-yyyy");
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateStr;
  }
};
