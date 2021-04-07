let data = [
   {
     id: 1,
     name: "Pizzaria",
     "daily-hours": 5,
     "total-hours": 3,
     created_at: Date.now()
   },
   {
     id: 2,
     name: "Liquid",
     "daily-hours": 10,
     "total-hours": 493,
     created_at: Date.now()
   }
 ];

 module.exports = {
    get(){
      return data
    },
    update(newJob){
      data = newJob;
    },
    delete(id){
      data = data.filter(job => Number(job.id) !== Number(id));
    }
 }