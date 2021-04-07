const Profile = require('../model/Profile');

module.exports = {
   index(req, res) {
     return res.render("profile", { profile:  Profile.get()});
   },
   update(req,res){
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

     Profile.update({
      ...Profile.get(),
      ...req.body,
      "value-hour": valueHour
     })

     return res.redirect('/profile')
   }
 }