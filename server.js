/********************************************************************************
*  WEB322 – Assignment 01
*  
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy:
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*  
*  Name:Mohammadsibli Pathan Student ID:189933237 Date: November 06, 2025
* 
********************************************************************************/

const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');



const data = require("./modules/projects");

// routes
app.get("/", (_req, res) => res.render("home"));
app.get("/about", (_req, res) => res.render("about"));

app.get("/solutions/projects", async (req, res) => {
  try {
    const { sector } = req.query;
    const projects = sector
      ? await data.getProjectsBySector(sector)
      : await data.getAllProjects();

    if (!projects?.length) {
      return res
        .status(404)
        .render("404", { message: `No projects found for sector: ${sector ?? "unknown"}` });
    }
    return res.render("projects", { projects });
  } catch (error) {
    return res
      .status(404)
      .render("404", { message: error?.message ?? "Unable to get projects" }); // S6582
  }
});

app.get("/solutions/projects/:id", async (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);
    const project = await data.getProjectById(id);
    if (!project) {
      return res.status(404).render("404", { message: `No project found with id: ${id}` });
    }
    return res.render("project", { project });
  } catch (error) {
    return res
      .status(404)
      .render("404", { message: error?.message ?? "Unable to get project" }); // S6582
  }
});

// 404 catch-all
app.use((_req, res) =>
  res
    .status(404)
    .render("404", { message: "I'm sorry, we're unable to find what you're looking for" })
);

// Start after initialize
(async () => { // NOSONAR (CommonJS does not support top-level await cleanly)
  try {
    await data.initialize();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`http://localhost:3000/`));
  } catch (error) {
    console.error("Failed to initialize data:", error);
    process.exitCode = 1;
  }
})();
