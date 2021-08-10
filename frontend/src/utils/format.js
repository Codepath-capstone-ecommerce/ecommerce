import moment from "moment"

export const formatDate = (date) => {
  const d = new Date(date)
  return moment(d).format("MMM Do YYYY")
}

const formatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatPrice = (amount) => {
  const dollars = amount * 0.01
  return `$${formatter.format(dollars)}`
}

export const formatDateLabel = (date) => {
    var today = new Date();

    date = new Date(date.replace(' ', 'T'));
    let currentTimeFromPosted =  Math.abs(today - date)
    let min = Math.floor((currentTimeFromPosted/1000/60) << 0)
    let sec = Math.floor((currentTimeFromPosted/1000) % 60)
   // let minutesSinceOrdered = currentTimeFromPosted.getMinutes();
    return min;
}

export const formatAMPM = (data) =>  {
  var date = new Date(data);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

