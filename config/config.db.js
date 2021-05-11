module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "123456",
    DB: "test_nodejs",
    dialect:"mysql",
    pool: {
        // max: maximum number of connection in pool
        max: 50,
        // min: minimum number of connection in pool
        min: 0,
        // acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
        acquire: 300000,
        // idle: maximum time, in milliseconds, that a connection can be idle before being released
        idle: 1000000,
    }
}