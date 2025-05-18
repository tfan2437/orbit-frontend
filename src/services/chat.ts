import type { Chats, Content } from "@/types";
import { axiosInstance } from "@/lib/axios";
import { getErrorMessage } from "@/utils/utils";

export const getChat = async (
  chat_id: string
): Promise<{ success: boolean; contents: Content[]; message: string }> => {
  try {
    const response = await axiosInstance.get(`/chats/${chat_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        contents: response.data.contents,
        message: response.data.message,
      };
    }

    return {
      success: false,
      contents: [],
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      contents: [],
      message: getErrorMessage(error, "Error fetching chat messages"),
    };
  }
};

export const getChats = async (
  uid: string
): Promise<{ success: boolean; chats: Chats }> => {
  try {
    const response = await axiosInstance.get(`/chats/user/${uid}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return {
        success: true,
        chats: response.data.chats,
      };
    }

    return {
      success: false,
      chats: {
        today: [],
        yesterday: [],
        previous: [],
      },
    };
  } catch (error) {
    console.log("ERROR: ", error);
    return {
      success: false,
      chats: {
        today: [],
        yesterday: [],
        previous: [],
      },
    };
  }
};

export const createChat = async (
  chat_id: string,
  uid: string,
  title: string,
  contents: Content[]
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.post(
      `/chats/${chat_id}`,
      {
        uid: uid,
        title: title,
        contents: contents,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Error storing chat messages"),
    };
  }
};

export const updateChat = async (
  chat_id: string,
  uid: string,
  title: string,
  contents: Content[]
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.put(
      `/chats/${chat_id}`,
      {
        uid: uid,
        title: title,
        contents: contents,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Error storing chat messages"),
    };
  }
};

export const deleteChat = async (
  chat_id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.delete(`/chats/${chat_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Error storing chat messages"),
    };
  }
};

export const renameChat = async (
  chat_id: string,
  uid: string,
  title: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await axiosInstance.put(
      `/chats/${chat_id}`,
      {
        uid: uid,
        title: title,
        contents: [],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return { success: true, message: response.data.message };
    }

    return { success: false, message: response.data.message };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Error renaming chat"),
    };
  }
};
