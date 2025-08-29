import Redis from "ioredis";

const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  maxRetriesPerRequest: null,
};

export const redis = new Redis(redisConfig);

redis.on("error", (err) => {
  console.error(`Redis connection error: ${err}`);
});

redis.on("error", (err) => {
  console.error(`Redis connection error: ${err}`);
});

export const createNewRedisConnection = () => {
  return new Redis(redisConfig);
};
