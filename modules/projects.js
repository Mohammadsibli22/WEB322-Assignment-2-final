const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    // validate inputs instead of try/catch
    if (!Array.isArray(projectData) || !projectData.length ||
        !Array.isArray(sectorData) || !sectorData.length) {
      return reject(new Error("Data files are empty"));
    }

    projects = [];
    for (const project of projectData) {
      const sector = sectorData.find((s) => s.id === project.sector_id);
      projects.push({
        ...project,
        sector: sector ? sector.sector_name : "Unknown",
      });
    }
    resolve();
  });
}


function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects?.length) return resolve(projects);
    reject(new Error("No projects available. Did you call initialize()?"));
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const p = projects.find((x) => x.id === Number(projectId));
    if (p) return resolve(p);
    reject(new Error("Unable to find requested project"));
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const needle = String(sector ?? "").toLowerCase();
    const list = projects.filter((x) => (x.sector ?? "").toLowerCase().includes(needle));
    if (list.length) return resolve(list);
    reject(new Error("Unable to find requested projects"));
  });
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };
