import { createClient } from 'redis';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.error(err);
    });
    // this.client.on('connect', () => {
    //
    // });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
    // try {
    //     return await this.client.get(key);
    // } catch (err) {
    //     console.error(err);
    // }
  }

  async set(key, value, duration) {
    try {
      this.client.setex(key, duration, value);
    } catch (err) {
      console.error(err);
    }
  }

  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
