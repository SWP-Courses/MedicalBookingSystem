const shortenText = (text, limit) => {
  //trim the string to the maximum length
  let trimmedString = text.substr(0, limit);

  //re-trim if we are in the middle of a word
  trimmedString =
    trimmedString.substr(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
    ) + "...";
  return trimmedString;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const checkStringContainInPhoneNumber = (phone) => {
  var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
  return !Regex.test(phone);
};

function validateUsername(username) {
  const pattern = /^[\p{L}\s]+$/u;
  return pattern.test(username);
}

const convertServiceName = (serviceId, services) => {
  const service = services.find((service) => service._id === serviceId);
  return service.name;
};

const convertDoctorName = (serviceId, services) => {
  const service = services.find((service) => service._id === serviceId);
  return service.name;
};

const formatDate = (value) => {
  const year = value.getFullYear();
  const month = (value.getMonth() + 1).toString().padStart(2, "0");
  const day = value.getDate().toString().padStart(2, "0");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

const hanlderRequest = (promise) => {
  return promise
          .then((data) => [undefined, data])
          .catch((error) => [error, undefined]);
};

export {
  shortenText,
  validateEmail,
  checkStringContainInPhoneNumber,
  validateUsername,
  formatDate,
  hanlderRequest
};
