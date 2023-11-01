const Pool = require("pg").Pool;

module.exports = function dynamicPool(role = "connect_user") {
  return new Pool({
    user: `${role}`,
    password: process.env[`${role}_pass`],
    host: "localhost",
    port: "5432",
    database: "super_parking",
  });
};
