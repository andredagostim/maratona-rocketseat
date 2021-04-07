let data = {
   name: "André Dagostim",
   avatar: "https://avatars.githubusercontent.com/u/34902317?v=4",
   "monthly-budget": 3000,
   "hours-per-day": 5,
   "days-per-week": 5,
   "vacation-per-year": 4,
   "value-hour": 50
};

module.exports = {
   get(){
      return data;
   },
   update(newData){
      data = newData;
   }
}