import { Client, Account, ID ,OAuthProvider} from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_API_ENDPOINT)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);
        console.log(import.meta.env.VITE_APPWRITE_API_ENDPOINT);
        
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite serive :: logout :: error", error);
        }
    }

    async loginWithGoogle() {
        try {
            await this.account.createOAuth2Session(
              OAuthProvider.Google,
              "http://localhost:5173", // Success redirect
              "http://localhost:5173/login" // Failure redirect
            );
        } catch (error) {
            console.error("Appwrite serive :: loginWithGoogle :: error", error);
        }
      };
}

const authService = new AuthService();

export default authService

