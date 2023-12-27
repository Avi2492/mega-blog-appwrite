# Mega Blog App with Appwrite services

## Startup Points

- Create .env file
- After that create a configuration folder and file where we take environ ment variables

## Step - 1 : Folder 1

- path: src/conf/conf.js

```JavaScript
const conf = {
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;

```

- After all this above setup now we have to write the code to use the services of appwrite lets do it.

## Step - 2 : Folder 2

- path: src/appwrite/auth.js

```JavaScript
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }
  //Wrapper of all services of appwrite
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //Call Another method
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  //Login
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  //see login or not when directly to your homepage
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      throw error;
    }
    return null;
  }

  //Logout
  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export default AuthService;

authService;
```

### Step - 3 : File 2 i.e config in auth Services

- path: src/appwrite/config.js

```JavaScript
   import { Client, ID, Databases, Storage, Query } from "appwrite";

import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //   update Document
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  //   Delete Document
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   For get 1 post
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   Get All posts
  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   file upload
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   file delete
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //   file preview
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
```

## Step - 4 : Folder 3 Redux Toolkit or Store i.e. store.js

- path: src/store/store.js

```JavaScript
   import { configureStore } from "@reduxjs/toolkit";

   const store = configureStore({
       reducer: {},
   });

   export default store;

```

- Make Another file in same this file will store the record of authentication;
- path: src/store/authSlice.js

```JavaScript
   import { createSlice } from "@reduxjs/toolkit";

// Give initial State
const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

```

## Step - 5 : Folder 4 Components

- path: src/components

- Components having 2 folders Header or Footer contains Header.jsx and Footer.jsx and Components having index.js file to export all files in one

- path: src/components/header/Header.jsx

```JavaScript
   function Header() {
    return <div>Header</div>;
   }

   export default Header;

```
- path: src/components/footer/Footer.jsx

```JavaScript
   function Footer() {
    return <div>Footer</div>;
   }

   export default Footer;

```
- path: src/components/index.js

```JavaScript
   import Header from "./header/Header";
   import Footer from "./footer/Footer";

   export { Header, Footer };

```

## Step - 5 : Make Changes in App.jsx

- Make a Loading state because we will use useEffect so lodaing is true bydefautl

```JavaScript
   const [loading, setLoading] = useState(true);
```

- useDispatch function allows us to use redux with react

```JavaScript
   import { useDispatch } from "react-redux";

   const dispatch = useDispatch();
```

- App.jsx file code 

```JavaScript
import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login({ userData })) : dispatch(logout());
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Conditional rendering
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between text-white">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;

```
