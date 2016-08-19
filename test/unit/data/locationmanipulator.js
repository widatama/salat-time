import tape from "tape";
import locationManipulator from "../../../app/javascripts/data/locationmanipulator";

tape("Location data manipulator", function(t) {

  t.test("Transform freegeoip response", (assert) => {
    // This is the location data sample fetched from freegeoip
    let rawLocation = {
      ip: "202.62.16.22",
      country_code: "ID",
      country_name: "Indonesia",
      region_code: "JK",
      region_name: "Jakarta",
      city: "Jakarta",
      zip_code: "",
      time_zone: "Asia/Jakarta",
      latitude: -6.1744,
      longitude: 106.8294,
      metro_code: 0
    };

    // Transform the raw location data to get only what is needed with the correct format
    let location = locationManipulator.transformIPLocationResponse(rawLocation);

    assert.plan(10);

    // Test the result location
    assert.ok(location.country, "Country exists");
    assert.equal(typeof location.country, "string", "Country is a string");
    assert.ok(location.country, "City exists");
    assert.equal(typeof location.city, "string", "City is a string");
    assert.ok(location.country, "Time zone exists");
    assert.equal(typeof location.timezone, "string", "Time zone is a string");
    assert.ok(location.latitude, "Latitude exists");
    assert.equal(typeof location.latitude, "number", "Latitude is a number");
    assert.ok(location.longitude, "Longitude exists");
    assert.equal(typeof location.longitude, "number", "Longitude is a number");
  });

  t.test("Transform nominatim response", (assert) => {
    // This is the reverse geolocation data sample fetched from nominatim
    let response = {
      address: {
        country: "Indonesia",
        city: "Jakarta"
      },
      lat: -6.1744,
      lon: 106.8294
    };

    // Transform the response data to get only what is needed with the correct format
    let location = locationManipulator.transformReverseGeolocationResponse(response);

    assert.plan(8);

    // Test the result location
    assert.ok(location.country, "Country exists");
    assert.equal(typeof location.country, "string", "Country is a string");
    assert.ok(location.country, "City exists");
    assert.equal(typeof location.city, "string", "City is a string");
    assert.ok(location.latitude, "Latitude exists");
    assert.equal(typeof location.latitude, "number", "Latitude is a number");
    assert.ok(location.longitude, "Longitude exists");
    assert.equal(typeof location.longitude, "number", "Longitude is a number");
  });

  t.end();
});
