import { Injectable } from "@nestjs/common";
import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AwsService {
    s3Client = new S3Client({
        region: process.env.AWS_REGION,
        apiVersion: "2006-03-01",
    })

    async uploadFile(userId: string, orderId: string, file: Express.Multer.File) {
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: `${userId}/${orderId}/${file.originalname}`,
            Body: file.buffer,
        };
        
        try {
            await this.s3Client.send(new PutObjectCommand(params));
        } catch (error) {
            throw new error("Error uploading file");
        } finally {
            return `https://${process.env.AWS_S3_DOMAIN}/${params.Key}`;
        }
    }

    async deleteFile(fileKey: string) {
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: fileKey,
        };

        try {
            await this.s3Client.send(new DeleteObjectCommand(params));
        } catch (error) {
            throw new error("Error deleting file");
        }
    }
}