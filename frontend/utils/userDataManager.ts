// userDataManager:
// Utility functions for managing extra dummy user data missing in api (e.g., ratings, departments)
// functions to manage consistent user data(like ratings and departments) across each route but is temporary since no backend
export interface UserExtras {
  rating: number;
  department: string;
}

const STORAGE_KEY = "hr_dashboard_dummy";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
];

// random rating and department for a userid
const generateUserExtras = (userId: number): UserExtras => {
  const seed = userId;

  const deterministicRandom = (seed: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * max);
  };

  return {
    rating: deterministicRandom(seed, 5) + 1,
    department: departments[deterministicRandom(seed * 2, departments.length)],
  };
};

// retrieve user extras if phele se h otherwise generate and store in locals
export const getUserExtras = (userId: number): UserExtras => {
  if (typeof window === "undefined") {
    return { rating: 1, department: "Engineering" };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const userExtrasMap = stored ? JSON.parse(stored) : {};

    if (userExtrasMap[userId]) {
      return userExtrasMap[userId];
    }
    // if not found, generate
    const newExtras = generateUserExtras(userId);
    userExtrasMap[userId] = newExtras;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userExtrasMap));

    return newExtras;
  } catch (error) {
    console.error("error accesing locals:", error);
    return generateUserExtras(userId);
  }
};

// initialize user extras for alll userIds
export const initializeUsersExtras = (
  userIds: number[]
): Record<number, UserExtras> => {
  if (typeof window === "undefined") {
    const result: Record<number, UserExtras> = {};
    userIds.forEach((id) => {
      result[id] = { rating: 1, department: "engineering" };
    });
    return result;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const userExtrasMap = stored ? JSON.parse(stored) : {};
    let hasChanges = false;

    userIds.forEach((userId) => {
      if (!userExtrasMap[userId]) {
        userExtrasMap[userId] = generateUserExtras(userId);
        hasChanges = true;
      }
    });

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userExtrasMap));
    }

    return userExtrasMap;
  } catch (error) {
    console.error("error storing in locals: ", error);
    const result: Record<number, UserExtras> = {};
    userIds.forEach((id) => {
      result[id] = generateUserExtras(id);
    });
    return result;
  }
};
