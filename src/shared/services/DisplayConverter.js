export const DisplayConverters = {

    convertFromDateToTimeStamp : (date) => {
        var myDate = date.split("-");
        var timestamp = new Date( myDate[0], myDate[1]-1, myDate[2]);
        timestamp = Date.parse(timestamp);
        return timestamp;
    },

    daysLeft : (deadline) => {
        const deadlineDate = new Date(deadline);
        const currentDate = new Date(Date.now());
        var Difference_In_Days = (deadlineDate - currentDate) / (1000 * 3600 * 24);
        return Difference_In_Days.toFixed(0);
    },

    calculateBarPercentage : (goal, raisedAmount) => {
        const percentage = Math.round((raisedAmount * 100) / goal);
      
        return percentage;
    },

    convertToDisplayAmount : (amount,fixedNumbers) => {
        if(amount === '0'){
            return 0;
        }
        else{
            return (amount/10 ** 18).toFixed(fixedNumbers);
        }
    }
}