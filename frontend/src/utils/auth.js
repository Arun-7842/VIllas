export const getAdminFromStorage = () => {
  try {
    const admin = localStorage.getItem("Admin");
    return admin ? JSON.parse(admin) : null;
  } catch (error) {
    console.error("Error parsing admin data from localStorage:", error);
    return null;
  }
};

export const clearAdminStorage = () => {
  localStorage.removeItem("Admin");
};
