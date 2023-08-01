function getDateValues(monthToggle, yearToggle) {
  const currentDate = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  if (monthToggle && !yearToggle) {
    return currentMonth;
  } else if (!monthToggle && yearToggle) {
    return currentYear;
  } else if (monthToggle && yearToggle) {
    return currentMonth + " " + currentYear;
  }
}

// function that swaps '/n' for '</br> and vice versa
function lineBreakSwap(string) {
  // Swap '\n' to '</br>'
  const swappedString = string.replace(/\n/g, "</br>");

  // Swap '</br>' to '\n'
  const finalString = swappedString.replace(/<\/br>/g, "\n");

  return swappedString;
}

module.exports = {
  getDateValues: getDateValues,
  lineBreakSwap: lineBreakSwap,
};
