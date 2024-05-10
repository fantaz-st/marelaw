import { format, isToday, isYesterday, differenceInHours } from "date-fns";

const formatDate = (dateFromWordpress) => {
  const date = new Date(dateFromWordpress);
  let formattedDate = "";

  if (isToday(date)) {
    const hoursBefore = differenceInHours(new Date(), date);
    formattedDate = `${hoursBefore} hours ago`;
  } else if (isYesterday(date)) {
    formattedDate = "Yesterday";
  } else {
    formattedDate = format(date, "eee, dd. MMMM yyyy. HH:mm");
  }

  return formattedDate;
};

export default formatDate;
