const MyDate = (date) => {
    let time = new Date();

    if (date){
        time = new Date(date);
    }

    let obj = {
        month: "2-digit",
        day: '2-digit',
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Baku",
    }
    const formattedTime = new Intl.DateTimeFormat("az-AZ", obj).format(time);
    let currentTime = `${time.getFullYear()}-${formattedTime}:${time.getSeconds()}`;
    return currentTime;
}

export default MyDate;