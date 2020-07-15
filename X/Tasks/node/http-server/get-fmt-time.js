exports.getFmtTime = function () {
  let time = new Date();

  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let hours = time.getHours();
  let months = time.getMonth();
  let date = time.getDate();
  if (seconds.length === 1) {
    seconds = "0" + seconds;
  }
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  return `${months}-${date} ${hours}:${minutes}:${seconds}`;
};
