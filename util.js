function getDateString(dateObject){
    let month = dateObject.getMonth()<10?"0"+(dateObject.getMonth()+1):(dateObject.getMonth()+1);
    let day = dateObject.getDate()<10?"0"+(dateObject.getDate()):(dateObject.getDate());
    return dateObject.getFullYear()+"-"+month+"-"+day;
}

function getWorkHoursLeft(dateMillisecondsAsInt){
    // since date is stored at 0, we assume this is the last day you can work in the task.
    return (dateMillisecondsAsInt+1000*60*60*24-Date.now())/1000/60/60/3;
}

function getDateValue(dateString) {
    var regEx = /^(\d{4})-(\d{2})-(\d{2})$/;
    // return dateString.match(regEx) != null;
    return parseInt(new Date(dateString.match(regEx)[1],parseInt(dateString.match(regEx)[2])-1,dateString.match(regEx)[3]).valueOf());
  }

function fillDD(array,inputSelectNode,selected){
    let newNode = document.createElement("option");
    newNode.value = "none";
    newNode.selected = true;
    newNode.disabled = true;
    newNode.hidden = true;
    newNode.innerHTML = selected===""?"Elegir...":selected;
    inputSelectNode.appendChild(newNode);
    array.forEach((e)=>{
        let newNode = document.createElement("option");
        newNode.value = e;
        newNode.innerText = e;
        newNode.selected = e===selected;
        inputSelectNode.appendChild(newNode);
    });
}

function hoursToText(hours){
    hours = Math.round(hours);
    // console.log("PASRASRASR");
    // console.log(hours);
    let workDays = Math.floor(hours / 8);
    let workMonths = Math.floor(workDays / 20);
    let workWeeks = Math.floor((workDays - workMonths*20)/5);
    // console.log(workDays);
    // console.log(workMonths);
    // console.log(workWeeks);
    workDays = workDays - 20*workMonths - 5*workWeeks;
    // console.log(workDays);
    let monthsString = workMonths>0?workMonths+"mo ":"";
    let weeksString = workWeeks>0?workWeeks+"w ":"";
    let daysString = workDays>0?workDays+"d ":"";
    hours = hours - workDays*8 - 20*workMonths*8 - 5*workWeeks*8;
    let hoursString = hours>0?hours+"h ":"";
    return monthsString+weeksString+daysString+hoursString;
}