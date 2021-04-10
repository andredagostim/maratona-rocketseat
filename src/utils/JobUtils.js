module.exports =  {
   remainingDays(job) {
     //ajustes e cálculos no job -- toFixed para arredondar o cálculo
     const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
   
     const createdDate = new Date(job.created_at);
     const dueDay = createdDate.getDate() + Number(remainingDays);
     const dueDate_ms = createdDate.setDate(dueDay);
   
     const timeDiff_ms = dueDate_ms - Date.now();
     const day_ms = 1000 * 60 * 60 * 24;
     const dayDiff = Math.ceil(timeDiff_ms / day_ms);
   
     return dayDiff;
   },
   calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
 }
