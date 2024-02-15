const mongoose = require('mongoose')
const { createClient } = require('redis')
let client = createClient()

// const Redis = require('ioredis');
// const fs = require('fs');

// const client = new Redis({
//     host: 'redis-12823.c245.us-east-1-3.ec2.cloud.redislabs.com',
//     port: 12823,
//     password: 'yFH82bDBG3Bd2McD07auerqBKJYbNf3j'
// });

client.on('error', err => console.log('Redis Client Error', err))
const redisConnect = async () => {
    await client.connect()
    console.log('Redis client connected'.blue.bold)
}
redisConnect()

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = {}) {
    this.hashKey = JSON.stringify(options.key || 'default');
    this.useCache = true
    return this
}

mongoose.Query.prototype.exec = async function () {
    if (!this.useCache) {
        // console.log("Sending Value From Database!")
        return exec.apply(this, arguments)
    }

    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    )

    // See if we have a value for 'key' in redis
    //   const cacheValue = await client.get(key)
    const cacheValue = await client.hGet(this.hashKey, key)

    // If we do , return that
    if (cacheValue) {
        const doc = JSON.parse(cacheValue)
        // console.log("Sending Cached Value!")

        return Array.isArray(doc)
            ? doc.map(d => new this.model(d))
            : new this.model(doc)
    }

    // Otherwise, issue the query and store the result in 
    // console.log("Caching Value & Sending Data")
    const result = await exec.apply(this, arguments)
    client.hSet(this.hashKey, key, JSON.stringify(result), 'EX', 10)
    return result
}

module.exports = {
    clearHash(hashKey) {
        client.del(JSON.stringify(hashKey))
    }
}
