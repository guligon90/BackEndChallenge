module.exports = {
    server: {
        environment: process.env.NODE_ENV || "test",
        port: process.env.NODE_PORT || 3000,
    },
};
