import winstonLogger from "loggers/winston.logger";
import { RedisClientType, createClient } from "redis";
const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
type storeKey = "Article" | "Banner" | any;
const expireTime = 60 * 60;

class RedisClient {
  client: RedisClientType;
  isConnected: boolean;

  constructor() {
    this.client = createClient({
      socket: {
        host: REDIS_HOST, // This should match the service name in your Docker Compose file
        port: REDIS_PORT,
      },
    }) as RedisClientType;
    this.isConnected = true;
    this.connect();
  }

  async set(key: storeKey, field: string, value: string): Promise<void> {
    if (this.isConnected) {
      await this.client.hSet(key, field, value);
      await this.client.expire(key, expireTime); //? expire after 1 hour
    }
    // winstonLogger.warn(`redis::set::${key}::${field}`);
  }

  async get(key: storeKey, field: string): Promise<string | null | any> {
    if (this.isConnected) {
      const data = await this.client.hGet(key, field);
      // winstonLogger.warn(`${key} => ${field} => ${Boolean(data)}`);
      return data;
    }
    return null;
  }

  async del(key: storeKey, field: string): Promise<string | null | any> {
    if (this.isConnected) {
      await this.client.hDel(key, field);
    }
    return null;
  }

  async getAll(key: storeKey): Promise<{ [key: string]: string } | null> {
    if (this.isConnected) {
      const data = await this.client.hGetAll(key);
      // winstonLogger.warn("redis::getAll");
      return data;
    }
    return null;
  }

  async getVals(key: storeKey) {
    // winstonLogger.warn("redis::getVals");
    if (this.isConnected) {
      return this.client.hVals(key);
    }
    return null;
  }

  async delKey(key: storeKey) {
    try {
      if (this.isConnected) {
        this.client.del(key);
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async connect() {
    this.client.connect();
    this.client.on("connect", () => {
      this.client.flushDb();
      winstonLogger.info("Connected to Redis");
    });
    this.client.on("error", (err) => {
      winstonLogger.error("Error connecting to Redis: " + err);
      this.client.disconnect();
      this.isConnected = false;
      //try connect redis after 10min if cannot connected
      setTimeout(() => {
        this.client.connect();
      }, 10 * 60 * 1000);
    });
  }

  public async setData(
    key: string,
    value: any,
    expireMinutes: number | null = null
  ) {
    try {
      if (this.isConnected) {
        await this.client.set(key, value);
        if (expireMinutes) {
          this.client.expire(key, expireMinutes * 60); //? expire after 1 hour
        }
      }
    } catch (err) {
      console.error("Error storing data in Redis:", err);
    }
  }

  public async getData(key: string): Promise<string | null | any> {
    try {
      if (this.isConnected) {
        const reply = await this.client.get(key);
        return reply;
      }
      return null;
    } catch (err) {
      console.error("Error retrieving data from Redis:", err);
      return null;
    }
  }
}

export { RedisClient };
