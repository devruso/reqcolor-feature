import moment from "moment";

const calculateElapsedTime = (startDate) => {
    const start = moment(startDate);
    const end = moment(new Date());
    const diffInMinutes = end.diff(start, 'minutes');
    return diffInMinutes;
  };



export { calculateElapsedTime };
