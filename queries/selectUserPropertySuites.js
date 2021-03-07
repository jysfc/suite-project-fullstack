const selectUserPropertySuites = `
SELECT 
    users.id AS user_id,
    users.email,
    users.password,
    users.created_at,
    users.is_active AS user_is_active,
    
    properties.id AS property_id,
    properties.name AS property_name,
	properties.website,
    properties.address1,
    properties.address2,
    properties.city,
    properties.state,
    properties.zip,
    properties.country,
    properties.phone_country_code,
    properties.phone_area_code,
    properties.phone_number,
    properties.self_parking,
    properties.valet_parking,
    properties.has_outdoor_pool,
    properties.has_spa,
    properties.is_smoke_free,
    properties.is_active AS property_is_active,
    
    suites.id AS suite_id,
    suites.title AS suite_title,
	suites.image,
    suites.square_ft,
    suites.max_guest,
    suites.total_king_bed,
    suites.total_queen_bed,
    suites.total_full_bed,
    suites.has_wifi,
    suites.has_tv,
    suites.has_safe,
    suites.is_accessible,
    suites.is_active AS suite_is_active
    
FROM
    users
        INNER JOIN
    properties ON user_id = users.id
        INNER JOIN
    suites ON property_id = properties.id
WHERE
	users.email = ?;
        
    `;
module.exports = selectUserPropertySuites;

// SELECT
//         *
//         FROM
//         users
//             INNER JOIN
//         properties ON user_id = users.id
//             INNER JOIN
//         suites ON property_id = properties.id
//     WHERE
//         email = 'jay@mirage.com';
