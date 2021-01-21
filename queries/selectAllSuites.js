const selectAllSuites = `
    SELECT
        *
    FROM
        users
    INNER JOIN
        properties ON user_id = users.id
    INNER JOIN
        suites ON property_id = properties.id;
    `;
module.exports = selectAllSuites;
