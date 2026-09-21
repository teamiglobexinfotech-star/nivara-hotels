import { Client, Storage } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

import { env } from './env.config';

export const client = new Client()
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY);

const storage = new Storage(client);

export const uploadFile = (file, fileId: string) => {
  return storage.createFile({
    bucketId: env.APPWRITE_BUCKET_ID,
    fileId,
    file: InputFile.fromBuffer(file.buffer, file.originalname),
  });
};

export const getFileUrl = (fileId: string) => {
  return `${env.APPWRITE_ENDPOINT}/storage/buckets/${env.APPWRITE_BUCKET_ID}/files/${fileId}/view?project=${env.APPWRITE_PROJECT_ID}`;
};
