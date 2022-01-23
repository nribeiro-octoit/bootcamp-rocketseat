const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

function validateRepositorieId(request, response, next) {
  const { id } = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repositorie ID." });
  }

  return next();

}

function checkIfRepositorieIdExist(request, response, next) {
  const { id } = request.params;

  const repositorie = repositories.findIndex(repositorie => repositorie.id === id);

  if(repositorie < 0) {
    return response.status(400).json({ error: "Repositorie not found." });
  }

  return next();
}

app.use('/repositories/:id', validateRepositorieId, checkIfRepositorieIdExist);

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { 
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repositorie);

  return response.json(repositorie);

});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  const { likes } = repositories[repositorieIndex];

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  repositories.splice(repositorieIndex, 1);

  return response.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  repositories[repositorieIndex].likes = parseInt(repositories[repositorieIndex].likes) + 1;

  return response.json(repositories[repositorieIndex]);

});

module.exports = app;
