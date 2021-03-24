const deletePropertyById = `
    DELETE FROM 
        properties
    WHERE
        id = ?;
`;
module.exports = deletePropertyById;
