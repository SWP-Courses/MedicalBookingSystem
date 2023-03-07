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

export const formatSlot = (hour) => {
  if(hour< 10 && hour >=0 ) return `0${hour}:00`
  if(hour>=10 && hour <=24 ) return `${hour}:00`
  return hour+" is not in 0-24"
}

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
