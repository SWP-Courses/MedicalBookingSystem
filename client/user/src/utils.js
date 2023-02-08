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

const checkPhoneLength = () => {

}

const checkStringContainInPhoneNumber = (phone) => {
  var Regex = /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
  return !Regex.test(phone)
}

export {
  shortenText,
  validateEmail,
  checkStringContainInPhoneNumber
}