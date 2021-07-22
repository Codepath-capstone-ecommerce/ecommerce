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

