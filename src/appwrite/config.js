import conf from "../conf.js";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service{

    client = new Client();
    databases;
    storage;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);

    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return post;
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            const post = await this.databases.updateDocument(
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
            return post;
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            const post = await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug){
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return post;
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "published")]){
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
            return posts;
        } catch (error) {
            throw error;
        }
    }

    //file upload services

    async uploadFile(file){
        try {
            const response = await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId){
        try {
            const response = await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId){
        try {
            const response = this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
}


const service = new Service();

export default service;