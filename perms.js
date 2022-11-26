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

const checkPerms = (e) => {
    let guildPerms = {};
    var t = Math.floor(e / 4294967296),
        n = Math.floor(e % 4294967296);
    for (var a in perms) 4294967296 <= perms[a] && t & Math.floor(perms[a] / 4294967296) || perms[a] < 4294967296 && n & perms[a] ? guildPerms[a] = true : guildPerms[a] = false;
    return guildPerms;
}

module.exports = {
    checkPerms: checkPerms
};