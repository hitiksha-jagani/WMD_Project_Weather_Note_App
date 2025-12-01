const customLogger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[CustomLog] ${now} - ${req.method} ${req.originalUrl}`);
    req.customLogId = `${Date.now()}-${Math.floor(Math.random()*1000)}`;
    next();
};

module.exports = { customLogger };
