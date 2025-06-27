# 🐾 Adopt-a-Pet — Serverless Cloud Adoption Platform
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

![Adopt-a-Pet AWS Serverless Architecture](client/public/adopt-a-pet_aws_serverless_architecture.png)

*The above architecture diagram was generated using Python code produced by ChatGPT.*

---

## Description
Adopt-a-Pet Foundation is a local pet rescue and adoption agency. Families in search of a furrever friend can see pets available for adoption and save them to their pet profile. Families can even apply online by filling out the adoption form. If you love animals and want to help out, the foundation is always looking for volunteers. Just fill out the online volunteer form!

---

## 🚨 Cloud Migration Notice
> **After Heroku shut down free hosting, the project was migrated to a fully cloud-native, serverless architecture using AWS Lambda, API Gateway, S3, and MongoDB Atlas. The Heroku deployment is no longer available.**
>
> **If you want to see the original (non-cloud) version of the project, you can find it here:**  
> [https://github.com/Kareem1990/adopt-a-pet](https://github.com/Kareem1990/adopt-a-pet)

---

## 🚀 Live Demo
🌐 **Frontend:** [adopt-a-pet-frontend-2025](http://adopt-a-pet-frontend-2025.s3-website-us-east-1.amazonaws.com)

---

## ✨ Features
- 🔐 User Authentication (JWT-based login & signup)
- 🐶 Pet Discovery via GraphQL or REST
- 💾 Save Pets to Profile (requires login)
- 🧾 Add New Pets (admin-ready)
- 🌩️ Serverless Deployment with AWS Lambda + API Gateway
- 📦 MongoDB Atlas for managed cloud database

---

## 🔧 Tech Stack

| Frontend           | Backend (GraphQL)        | Infrastructure                |
|--------------------|-------------------------|-------------------------------|
| React + Apollo     | Apollo Server (Lambda)  | Serverless Framework          |
| Bootstrap          | MongoDB + Mongoose      | AWS Lambda + API Gateway      |
| LocalStorage       | JSON Web Token (JWT)    | AWS S3 (static hosting)       |

---

## 🛠️ Architecture Overview

### How the System Works (Step by Step)

#### 1. **Frontend (React App on AWS S3)**
- The user visits the website, which is hosted as a static site on an AWS S3 bucket.
- All static assets (HTML, JS, CSS, images) are served directly from S3.
- ![AWS S3 Hosting](./client/public/s3.PNG)
- The React app runs in the browser and interacts with the backend using GraphQL and REST APIs.

#### 2. **API Gateway**
- When the user logs in, browses pets, or saves a pet, the frontend sends HTTP requests (GraphQL or REST) to AWS API Gateway.
- API Gateway acts as the secure entry point for all backend operations, routing requests to the correct Lambda function.

#### 3. **AWS Lambda Functions (Backend Logic)**
- API Gateway triggers AWS Lambda functions.
- There are Lambda functions for authentication, pet management, and user actions.
- The backend is completely serverless, so it scales automatically and you only pay for what you use.
- ![AWS Lambda Functions](./client/public/lambda-functions.PNG)

#### 4. **MongoDB Atlas (Cloud Database)**
- Lambda functions connect securely to MongoDB Atlas, a fully managed cloud database.
- All pet data, user profiles, and saved pets are stored in MongoDB Atlas.
- ![MongoDB Atlas](./client/public/atlas.PNG)

#### 5. **User Experience**
- The user can sign up, log in, browse pets, and save favorites.
- Authentication is handled using JWT tokens, which are stored in localStorage and sent with every protected request.

---

## 🧰 Libraries & Tools Used in Migration

During the migration from a traditional PaaS environment to a cloud-native, serverless architecture, we used the following libraries and tools:

- **Serverless Framework**: For deploying and managing AWS Lambda functions and API Gateway endpoints as infrastructure-as-code.
- **serverless-dotenv-plugin**: To manage environment variables and secrets securely during deployment.
- **AWS SDK**: For interacting with AWS services programmatically.
- **Apollo Server Lambda**: To run the GraphQL backend as a Lambda function.
- **Mongoose**: For MongoDB object modeling and connection management.
- **MongoDB Atlas**: As a fully managed cloud database.
- **React & Apollo Client**: For building the frontend and handling GraphQL queries/mutations.
- **Bootstrap**: For UI styling.
- **JWT (jsonwebtoken)**: For secure authentication and authorization.
- **dotenv**: For local environment variable management.
- **Python diagrams**: For generating the AWS architecture diagram programmatically.
- **AWS CLI**: For manual AWS resource management and troubleshooting.

---

## 🌍 Cloud Migration Goals

- ✅ Converted GraphQL backend to serverless functions using the Serverless Framework
- ✅ Externalized secrets using `.env` + `serverless-dotenv-plugin`
- ✅ Deployed REST + GraphQL endpoints via AWS API Gateway
- ✅ Configured frontend hosting via AWS S3 static website hosting
- ✅ Enabled secure, persistent user experience across environments
- ✅ Used AWS Lambda for backend compute and MongoDB Atlas for managed cloud database

---

## 🔐 Authentication Flow

- Upon signup/login, the server generates a JWT and returns it to the frontend.
- The token is stored in `localStorage` and auto-included in all Authorization headers.
- Protected mutations (like savePet) check the token and extract `context.user`.

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/Kareem1990/adopt-a-pet.git
cd adopt-a-pet-woof

# install backend dependencies
cd server/adopt-serverless
npm install

# set up .env
echo "MONGODB_URI=your-mongo-uri" >> .env
echo "JWT_SECRET=mysecretsshhhhh" >> .env

# deploy to cloud
npx serverless deploy --force

# run frontend
cd ../../client
npm install
npm start
```

---

## Usage
This project is used to connect families with pets who need homes.

---

## Contributors 
Rebekah818  
Kareem1990  
kvTsira  
Sohrob1  

---

## Links

**GitHub (Cloud Version):**  
https://github.com/Kareem1990/adopt-a-pet-woof

**Live Project:**  
http://adopt-a-pet-frontend-2025.s3-website-us-east-1.amazonaws.com/

**Old Heroku Link (no longer available):**  
https://lit-thicket-52493.herokuapp.com/

**Original (Non-Cloud) Version:**  
https://github.com/Kareem1990/adopt-a-pet

---

## Screenshots

![Screenshot](client/public/screenshot1.PNG)
![Screenshot](client/public/screenshot2.PNG)
![Screenshot](client/public/screenshot3.PNG)
![Screenshot](client/public/adoptformscreenshot.PNG)