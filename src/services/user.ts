import { axiosInstance } from "@/lib/axios";

export interface UserData {
  uid: string;
  email: string;
  name: string;
  photo_url: string;
  subscription_tier: string;
  last_login: string;
}

export const createUser = async ({
  uid,
  name,
  email,
  photo_url,
}: {
  uid: string;
  name: string;
  email: string;
  photo_url: string;
}): Promise<UserData | null> => {
  try {
    const response = await axiosInstance.post(
      "/users",
      {
        uid,
        email,
        name,
        photo_url,
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
