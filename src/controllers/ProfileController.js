const Profile = require('../model/Profile');

module.exports = {
   async index(req, res) {
     return res.render("profile", { profile:  await Profile.get()});
   },
   async update(req,res){
     //Pegar dados erq.body
     const data = req.body;

     const weeksPerYear = 52;
     const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12;
     //Total de horas trabalhadas na semana
     const weekTotalHours = data["hours-per-day"] * data["days-per-week"];
     // Quantidade de horas trabalhadas no mês
     const monthlyTotalHours = weeksPerMonth * weekTotalHours;
     // Calcular valor da hora
     const valueHour = data["monthly-budget"] / monthlyTotalHours;

     const profile = await Profile.get();

     await Profile.update({
      ...profile,
      ...req.body,
      "value-hour": valueHour
     })

     return res.redirect('/profile')
   }
 }
