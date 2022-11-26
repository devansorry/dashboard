const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

var perms = {
    generalViewChannels: 1024,
    generalCreateInvite: 1,
    generalKickMembers: 2,
    generalBanMembers: 4,
    generalAdministrator: 8,
    generalManageChannels: 16,
    generalManageGuild: 32,
    generalChangeNickname: 67108864,
    generalManageNicknames: 134217728,
    generalManageRoles: 268435456,
    generalManageWebhooks: 536870912,
    generalManageEmojis: 1073741824,
    generalViewAuditLog: 128,
    generalViewGuildInsights: 524288,
    generalManageEvents: 8589934592,
    textAddReactions: 64,
    textSendMessages: 2048,
    textSendMessagesThreads: 274877906944,
    textCreatePublicThreads: 34359738368,
    textCreatePrivateThreads: 68719476736,
    textSendTTSMessages: 4096,
    textManageMessages: 8192,
    textManageThreads: 17179869184,
    textEmbedLinks: 16384,
    textAttachFiles: 32768,
    textReadMessageHistory: 65536,
    textMentionEveryone: 131072,
    textUseExternalEmojis: 262144,
    textUseExternalStickers: 137438953472,
    textUseSlashCommands: 2147483648,
    voiceConnect: 1048576,
    voiceSpeak: 2097152,
    voiceStream: 512,
    voiceMuteMembers: 4194304,
    voiceDeafenMembers: 8388608,
    voiceMoveMembers: 16777216,
    voiceUseVAD: 33554432,
    voiceStartActivities: 549755813888,
    voicePrioritySpeaker: 256,
    voiceStageRequestSpeak: 4294967296
};

let getUserLogin = () => {
    fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
        .then(result => result.json())
        .then(response => {
            const { username, discriminator, id, avatar } = response;
            document.getElementById('info').innerText = `Welcome ${username}#${discriminator}`;

            let img = document.createElement('img');
            let src = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
            img.src = src;
            document.body.appendChild(img);
        })
        .catch(console.error);
};

let getUserGuilds = () => {
    fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `${tokenType} ${accessToken}`,
        },
    })
        .then(result => result.json())
        .then(response => {
            createPage(response);
        })
        .catch(console.error);
};

let createPage = (response) => {
    {
      let guilds = document.createElement('div');
      guilds.innerText = 'Servers:';
      guilds.classList.add('serverList');
      document.body.appendChild(guilds);
      for(const guild of response){
        let perms = checkPerms(guild.permissions);
        console.log(perms);
        if(perms['generalAdministrator'] == true){
          let title =  document.createElement('p');
          let g = document.createElement('div');
          g.classList.add('card');
          title.innerText += `${guild.name}`;
          if(guild.icon != null){
            let a = document.createElement('a');
            a.href=`/config/${guild.id}`;
            let img = document.createElement('img');
            let src = `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`;
            img.src = src;
            a.appendChild(img);
            g.appendChild(a);
          }
          guilds.appendChild(title);
          guilds.appendChild(g);
        }
      }
    }
  };

function checkPerms(e) {
    let guildPerms = {};
    var t = Math.floor(e / 4294967296),
        n = Math.floor(e % 4294967296);
    for (var a in perms) 4294967296 <= perms[a] && t & Math.floor(perms[a] / 4294967296) || perms[a] < 4294967296 && n & perms[a] ? guildPerms[a] = true : guildPerms[a] = false;
    return guildPerms;
}

window.onload = () => {

    if (!accessToken) {
        return (document.getElementById('login').style.display = 'block');
    }
    getUserLogin();
    getUserGuilds();


    };
