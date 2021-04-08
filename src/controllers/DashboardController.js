//Anotações
/* =================================================================
    - Refatoração do código (MVC):
    Model: Faz o armazenamento e controle dos dados.
    Controllers: É onde é chamado no routes.js e faz o controle das
    rotas (index, create, update, delete)
    Utils: Funções para cálculos como calculateBudget geralmente
    usados em controllers
   ================================================================= */

const Job = require('../model/Job');
const Profile = require('../model/Profile');
const JobUtils = require('../utils/JobUtils');

module.exports = {
   async index(req, res) {
      const jobs = await Job.get();
      const profile = await Profile.get();

      let statusCount = {
         progress: 0,
         done: 0,
         total: jobs.length
      }

      let jobTotalHours = 0;

      const updatedJobs = jobs.map((job) => {
         const remaining = JobUtils.remainingDays(job);
         const status = remaining <= 0 ? 'done' : 'progress';

         statusCount[status] += 1

         if (status === 'progress') {
            jobTotalHours += Number(job["daily-hours"]);
         } 
         
         return {
         ...job,
         remaining,
         status,
         budget: JobUtils.calculateBudget(job, profile["value-hour"])
         }
      });
      
      //Cálculo quantidade de horas livres por dia ( Qtd quantas horas quero trabalhar por dia / Qtd de horas dia dos projetos em andamento )
      let freeHours = (profile["hours-per-day"] - jobTotalHours);
      freeHours = freeHours <= 0 ? freeHours = 0 : freeHours

      return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
   }
}
