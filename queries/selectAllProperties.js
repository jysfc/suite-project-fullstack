const selectAllProperties = `
    SELECT
        *
    FROM
        users
    INNER JOIN
        properties ON user_id = users.id;
    `;
module.exports = selectAllProperties;
