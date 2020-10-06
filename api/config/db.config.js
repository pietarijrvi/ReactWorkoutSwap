module.exports = {
    HOST: "10.114.32.78",
    USER: "testuser",
    PASSWORD: "owsecure",
    DB: "workoutswap",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};