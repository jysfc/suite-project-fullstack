const selectUserPropertySuites = `
    SELECT
        *
        FROM
        users
            INNER JOIN
        properties ON user_id = users.id
            INNER JOIN
        suites ON property_id = properties.id
    WHERE -- filtering data
        users.email = 'jay@mirage.com';
    `;
module.exports = selectUserPropertySuites;
