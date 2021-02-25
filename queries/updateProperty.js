const updateProperty = `
    UPDATE 
        properties
    SET 
        ?
    WHERE
        id = ?;
`;
module.exports = updateProperty;
