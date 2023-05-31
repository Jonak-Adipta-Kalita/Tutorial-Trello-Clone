import { Client, Account, ID, Databases, Storage } from "appwrite";

const newClient = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(newClient);
const databases = new Databases(newClient);
const storage = new Storage(newClient);

export { newClient, account, databases, storage, ID };
