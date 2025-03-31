import conf from '../conf/conf.js';
import { Client, ID, Databases, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createPost({category, count, difficulty, type, questions}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    category,
                    count,
                    difficulty,
                    type,
                    questions,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    
}

const fileService = new Service();
export default fileService;