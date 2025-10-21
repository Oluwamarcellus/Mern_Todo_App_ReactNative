import { Account, Client, Databases, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
export const account = new Account(client);

export const addTodo = async (title, userId) => {
  try {
    const res = await databases.createDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
      "unique()",
      {
        title,
        userId,
        completed: false,
      }
    );
    return res;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const getTodos = async (userId) => {
  try {
    const res = await databases.listDocuments(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.equal("userId", userId)]
    );
    return res.documents;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const updateTodo = async (todoId, newTitle) => {
  try {
    const res = await databases.updateDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
      todoId,
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

export const deleteTodo = async (todoId) => {
  try {
    await databases.deleteDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
      todoId
    );
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};

export const toggleTodoCompletion = async (id, completed) => {
  try {
    const res = await databases.updateDocument(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
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

export async function resetUserTodos(userId) {
  try {
    // Fetch all user todos
    const todos = await databases.listDocuments(
      process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
      [Query.equal("userId", userId)]
    );

    //Delete each one
    const deletions = todos.documents.map((todo) =>
      databases.deleteDocument(
        process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID,
        todo.$id
      )
    );

    await Promise.all(deletions);
  } catch (error) {
    console.error("Failed to delete todos:", error);
    throw error;
  }
}
