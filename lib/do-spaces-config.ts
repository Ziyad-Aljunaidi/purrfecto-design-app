
import { S3 } from "@aws-sdk/client-s3";

// console.log("DO_SPACES_ENDPOINT", process.env.DO_SPACES_ENDPOINT);
// console.log("DO_SPACES_KEY", process.env.DO_SPACES_KEY);
export const s3Client = new S3({
  forcePathStyle: false, 
  endpoint: process.env.DO_SPACES_ENDPOINT,
  region: "lon1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_KEY!,
    secretAccessKey: process.env.DO_SPACES_SECRET!,
  }
});

