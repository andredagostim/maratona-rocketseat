const express = require("express");

const routes = express.Router();

const basePath = __dirname + "/views/";

const Profile = {
  data: {
    name: "André Dagostim",
    avatar: "https://avatars.githubusercontent.com/u/34902317?v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 50
  },

  controllers: {
    index(req, res) {
      return res.render(basePath + "profile", { profile: Profile.data });
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

      Profile.data = {
        ...Profile.data,
        ...req.body,
        "value-hour": valueHour
      }

      return res.redirect('/profile')
    }
  }
}

const Job = {
  data: [
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
  ],

  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
        
        return {
          ...job,
          remaining,
          status,
          budget: Profile.data["value-hour"] * job["total-hours"]
        }
      });
    
      return res.render(basePath + "index", { jobs: updatedJobs })
    },
    create(req, res){
      return res.render(basePath + "job")
    },
    save(req, res){
      const lastID = Job.data[Job.data.length - 1]?.id || 1;
  
      Job.data.push({
        id: lastID + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now()
      });
      
      return res.redirect('/');
    }
  },

  services: {
    remainingDays(job) {
      //ajustes e cálculos no job -- toFixed para arredondar o cálculo
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDate_ms = createdDate.setDate(dueDay);
    
      const timeDiff_ms = dueDate_ms - Date.now();
      const day_ms = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor(timeDiff_ms / day_ms);
    
      return dayDiff;
    }
  }
}

routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit"));
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;