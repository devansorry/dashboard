let updateCommand = async (id) => {
  let commandId = id.innerText;
  let name = document.getElementById("command_name");
  let commandName = name.textContent;
  let commandOptions = {
    name: commandName,
    id: commandId,
  }

  let response = await fetch(`http://localhost:53134/config/update/${commandId}`,{
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(commandOptions)
  })
  const content = await response.json();

};
