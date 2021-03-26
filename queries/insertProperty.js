const insertProperty = `
    INSERT INTO 
    properties (
        user_id,
        name,
        id,
        website,
        address1,
        address2,
        city,
        state,
        zip,
        country,
        phone_country_code,
        phone_area_code,
        phone_number,
        self_parking,
        valet_parking,
        has_outdoor_pool,
        has_spa,
        is_smoke_free,
        is_active
    )
    VALUES 
        ?;
`;
module.exports = insertProperty;
