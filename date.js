function getDate(){
    const today = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };

    const day = today.toLocaleDateString('en-US', options);

    return day;
}

function getWeekday(){
    const today = new Date();

    const options = {
        weekday: 'long'
    };

    const weekday = today.toLocaleDateString('en-US', options);

    return weekday;
}

module.exports.getDate = getDate;
module.exports.getWeekday = getWeekday;