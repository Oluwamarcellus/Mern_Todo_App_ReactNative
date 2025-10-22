# 📝 MERN React Native Todo App
A simple and elegant cross-platform Todo app built with **React Native**, **Expo** and **Appwrite**.

## 📖 Overview
Features theme toggle, user scoped data and smooth CRUD interactions giving users a fast and responsive task management experience.
It was built as part of my learning journey into mobile development and backend integration, focusing on code structure, performance and real-world UX patterns.

## 🧩 Features
   - ✅ Add / Edit / Delete tasks  
   - 🌙 Dark & Light theme toggle  
   - 🔐 User-specific data via Appwrite  
   - ⚡ Smooth and responsive UI  

## 🖼️ App Preview
#### 🌙 Dark Mode
<p align="center">
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Dark1.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Dark2.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Dark3.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Dark4.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Dark5.PNG" width="18%" />
</p>

#### ☀️ Light Mode
<p align="center">
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Light1.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Light2.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Light3.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Light4.PNG" width="18%" />
  <img src="https://raw.githubusercontent.com/Oluwamarcellus/Mern_Todo_App_ReactNative/main/AppPreviews(Screenshots)/Light5.PNG" width="18%" />
</p>

## ⚙️ Tech Stack
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FF0000?style=for-the-badge&logo=appwrite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)

## ⚙️ Setup Instructions
#### 1. Clone the Repository
-```git clone https://github.com/Oluwamarcellus/MERN_ReactNative_TodoApp.git```

-```cd MERN_ReactNative_TodoApp```

#### 2. Install Dependency
```npm install``` /
```yarn install```

#### 3. Set up Appwrite Backend
1.	Go to your Appwrite Dashboard.
2.	Create a new project.
3.	Add a database and collection for Todos.
4.	Inside the collection, create the following attributes:
	•	title → String
	•	completed → Boolean
	•	userId → String
5.	Note your Project ID and API Endpoint.

#### 4. Configure Environment Variables
1.	Create a .env file in the root directory.
2.	Add the following variables:

```EXPO_PUBLIC_APPWRITE_PROJECT_ID={your_project_id}```

```EXPO_PUBLIC_APPWRITE_API_ENDPOINT={your_api_endpoint}```

```EXPO_PUBLIC_APPWRITE_DATABASE_ID={your_database_id}```

```EXPO_PUBLIC_APPWRITE_COLLECTION_ID={your_collection_id}```


#### 5. Run the App
```npx expo start```

•	Open Expo Go on your mobile device or use an emulator to preview the app.

## 🪶 Contact
💼 LinkedIn: [devmarc](https://linkedin.com/in/devmarc)  
🐦 Twitter: [@Hayyddex](https://twitter.com/Hayyddex)
