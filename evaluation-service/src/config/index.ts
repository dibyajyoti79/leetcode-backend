import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  SUBMISSION_SERVICE: string;
};

function loadEnv() {
  dotenv.config();
  console.log(`Environment variables loaded`);
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 8002,
  SUBMISSION_SERVICE:
    process.env.SUBMISSION_SERVICE || "http://localhost:8001/api/v1",
};
