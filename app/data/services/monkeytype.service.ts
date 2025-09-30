import { MonkeyTypeResult } from "@/app/core/types/monkey-type.type";

/**
 * Fetch MonkeyType WPM data from the API
 * Returns array of test results
 */
export const fetchWPMData = async (): Promise<MonkeyTypeResult[]> => {
  try {
    const response = await fetch("/api/monkey-type");
    if (!response.ok) {
      throw new Error(
        `MonkeyType API request failed: ${response.status} ${response.statusText}`
      );
    }
    console.log(response);
    const result = await response.json();

    if (!result.success) {
      console.log("❌ API returned error:", result.error);
      throw new Error(
        result.error || "MonkeyType API returned unsuccessful response"
      );
    }

    // The API route returns the MonkeyType response directly in result.data
    // MonkeyType API returns { message: "Results retrieved", data: [...] }
    const monkeyTypeResponse = result.data;

    return monkeyTypeResponse.data as MonkeyTypeResult[];

  } catch (error) {

    console.error("❌ Error fetching WPM data:", error);
    throw new Error(
      `Failed to fetch WPM data: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
    
  }
};

/**
 * Get latest WPM result (first item from array)
 */
export const fetchLatestWPMResult =
  async (): Promise<MonkeyTypeResult | null> => {
    const results = await fetchWPMData();
    return results && results.length > 0 ? results[0] : null;
  };

/**
 * Get personal best WPM result
 */
export const fetchPersonalBest = async (): Promise<Boolean | null> => {
  const results = await fetchWPMData();
  return results && results.length > 0 ? results[0]?.isPb : null;
};
