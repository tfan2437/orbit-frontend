import type { User } from "firebase/auth";
import { axiosInstance } from "@/lib/axios";

export interface UserData {
  uid: string;
  email: string;
  name: string;
  photo_url: string;
  subscription_tier: string;
  last_login: string;
}

export const createUser = async (user: User): Promise<UserData | null> => {
  try {
    const response = await axiosInstance.post(
      "/users",
      {
        uid: user.uid,
        email: user.email,
        name: user.displayName || user.email,
        photo_url: user.photoURL,
        last_login: new Date(),
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.status === 201 ? response.data.user : null;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};

export const getUser = async (uid: string): Promise<UserData | null> => {
  try {
    const response = await axiosInstance.get(`/users/${uid}`);
    return response.status === 200 ? response.data.user : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
