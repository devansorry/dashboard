const express = require("express");
const { port, token, appId } = require("./config.json");
const path = require("path");
const { fetch } = require("undici");
const perms = require('./perms');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const app = express();

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname + "/premium.html")));

app.get("/config/:id", async (request, response) => {
  let configData = await getGuildCommands(request.params.id);

  let guild = await getBotGuilds(request.params.id);

  response.render("config", {
    data: configData,
    guild: guild
  });
});

app.post("/config/update/:info", jsonParser, function (request, response) {
  updateCommands(request.body);
});

const updateCommands = async (info) => {
  
  let command = {
    'name': info.name,
  };

  const response = await fetch(
    `https://discord.com/api/v10/applications/${appId}/commands/commands/${info.id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bot ${token}`,
      },
      method: 'PATCH',
      body: JSON.stringify(command),
    })
    .then(response => {
      console.log(`Response: ${response.status}`);
    })
    .catch(console.error);
};

const getGuildCommands = async (id) => {
  const response = await fetch(
    `https://discord.com/api/v10/applications/${appId}/commands`,
    {
      headers: {
        authorization: `Bot ${token}`,
      },
    });
  return response.json();
};

const getBotGuilds = async (id) => {
  const response = await fetch(`https://discord.com/api/users/@me/guilds`, {
    headers: {
      authorization: `Bot ${token}`,
    },
  });
  let guilds = await response.json();
  for(let i=0; i < guilds.length; i++){
    if(guilds[i]['id'] == id) {
      return guilds[i];
    }
  }
  return guilds[i];
}

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
