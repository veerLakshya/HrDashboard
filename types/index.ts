// Common types for the HR Dashboard app

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
  };
  gender?: string;
  age?: number;
  birthDate?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color?: string;
  };
  university?: string;
  company?: {
    name?: string;
  };
  image?: string;
}
