import { createContext, useContext, useState } from "react";
import { getMyProfile, IBookMark } from "./http";
import { useQuery } from "@tanstack/react-query";
interface IProfileData {
  _id: string;
  id: string;
  displayName: string;
  emails?: string | null;
  photos?: string;
  posts: IBookMark[];
  topics?: string[];
}
export const ProfileDataContext = createContext<IProfileData | null>(null);
export function UserProfileData({ children }: { children: React.ReactNode }) {
  const [valuex, setValuex] = useState<IProfileData | null>(null);
  const data = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const data = await getMyProfile();
      setValuex(data as IProfileData);
      return data;
    },
  });

  return (
    <ProfileDataContext.Provider value={valuex as IProfileData}>
      {children}
    </ProfileDataContext.Provider>
  );
}
export function useProfileData() {
  const profile = useContext(ProfileDataContext);
  if (profile === undefined) {
    throw new Error("DashboardContex is used outside the DashboardProvider");
  }
  return profile;
}
