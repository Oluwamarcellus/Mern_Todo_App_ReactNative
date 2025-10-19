import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

export const addTodo = async (title) => {
  try {
    const res = await databases.createDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
      "unique()",
      {
        title,
        completed: false,
      }
    );
    return res;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const res = await databases.listDocuments(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_TODOS_COLLECTION_ID
    );
    return res.documents;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const updateTodo = async (id, newTitle) => {
  try {
    const res = await databases.updateDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_TODOS_COLLECTION_ID,
      id,
      {
        title: newTitle,
      }
    );
    return res;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await databases.deleteDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_TODOS_COLLECTION_ID,
      id
    );
    return res;
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const toggleTodoCompletion = async (id, completed) => {
  try {
    const res = await databases.updateDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_TODOS_COLLECTION_ID,
      id,
      {
        completed,
      }
    );
    return res;
  } catch (error) {
    console.error("Error toggling todo completion:", error);
    throw error;
  }
};
