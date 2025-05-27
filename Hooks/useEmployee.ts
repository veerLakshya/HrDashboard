// useEmployee: Provides logic for fetching, updating, and managing employee-specific state and actions. Used for employee details and related operations.

import { useEffect, useState } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  rating?: number;
  department?: string;
  image?: string;
  address?: {
    address: string;
    city: string;
    postalCode: string;
    state: string;
  };
};

const useUser = (userId: number | null) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId === null) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!res.ok)
          throw new Error(`Failed to fetch user (status ${res.status})`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        // TypeScript: err is unknown, so we use type guard to extract message
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

export default useUser;
