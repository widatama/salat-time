const manipulator = {};

manipulator.transformLocationResponse = function transformLocationResponse(rawLocation) {
  let result = {};

  result.country =   rawLocation.country_name;
  result.city =      rawLocation.city;
  result.timezone =  rawLocation.time_zone;
  result.latitude =  parseFloat(rawLocation.latitude);
  result.longitude = parseFloat(rawLocation.longitude);

  return result;
};

export default manipulator;
