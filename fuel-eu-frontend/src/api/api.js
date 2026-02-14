const BASE_URL = "http://localhost:3000";

// =========================
// Fetch All Routes
// =========================
export const fetchRoutes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routes`);

    if (!response.ok) {
      throw new Error("Failed to fetch routes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching routes:", error);
    return [];
  }
};

// =========================
// Compare Routes
// =========================
export const compareRoutes = async (id1, id2) => {
  try {
    const response = await fetch(
      `${BASE_URL}/routes/compare/${id1}/${id2}`
    );

    if (!response.ok) {
      throw new Error("Failed to compare routes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error comparing routes:", error);
    return [];
  }
};

// =========================
// Banked Routes
// =========================
export const fetchBankedRoutes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routes/bank`);

    if (!response.ok) {
      throw new Error("Failed to fetch banked routes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching banked routes:", error);
    return [];
  }
};

// =========================
// Pooled Routes
// =========================
export const fetchPooledRoutes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/routes/pool`);

    if (!response.ok) {
      throw new Error("Failed to fetch pooled routes");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching pooled routes:", error);
    return [];
  }
};