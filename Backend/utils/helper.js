export function getDatesInRange(startDate, endDate) {
    const dates = [];
  
    let currentDate = new Date(startDate);
  
    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dates;
  }
  