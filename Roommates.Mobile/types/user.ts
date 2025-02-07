export interface UserData {
  id: number;
  name: string;
  email: string;
  profile_picture: string | null;
  default_household_id: number;
  household_members: Array<{
    role: string;
    households: {
      id: number;
      name: string;
      created_at: string;
    };
  }>;
}
