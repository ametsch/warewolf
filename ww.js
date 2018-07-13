var ww = {};

(function(){

    ww.Roles = {
        Villager: {desc:"Villager", nightActionReq:0, team:"Good", imgClass:"bgRoleVillager"},
        Werewolf: {desc:"Werewolf", nightActionReq:1, team:"Evil", imgClass:"bgRoleWerewolf"},
        Seer: {desc:"Seer", nightActionReq:1, team:"Good", imgClass:"bgRoleSeer"},
        Hunter: {desc:"Hunter", nightActionReq:0, team:"Good", imgClass:"bgRoleHunter"},
        Sorcerer: {desc:"Sorcerer", nightActionReq:1, team:"Evil", imgClass:"bgRoleSorceror"},
        Traitor: {desc:"Traitor", nightActionReq:0, team:"Evil", imgClass:"bgRoleSorceror"},
        Martyr: {desc:"Martyr", nightActionReq:1, team:"Good", imgClass:"bgRoleVillager"}
    };
    ww.Roles.Seer.viewFor = ww.Roles.Werewolf;
    ww.Roles.Sorcerer.viewFor = ww.Roles.Seer;
    
    ww.N0Actions = {
        Kill: {desc:"Kills a player N0."},
        ChooseView: {desc:"Chooses a player to view N0."},
        RandomNegative: {desc:"Gets a random negative N0."},
        Random: {desc:"Gets a random N0."}
    };

    ww.DeathReveal = {
        None: {desc:"Nothing is revealed on death."},
        Team: {desc:"Only a player's team is revealed on death."},
        Role: {desc:"Role but no attributes are revealed on death."},
        Full: {desc:"Full role and attributes are revealed on death."}
    };

    ww.Rolesets = [
        {name:"Basic 5 player",
            desc:"A simple 5-player game with a single seer and a single werewolf.",
            players: 5,
            reveal: ww.DeathReveal.Full,
            roles: [
                {role:ww.Roles.Werewolf, count: 1},
                {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
                {role:ww.Roles.Villager, count: 3}
            ]
        }
        // {name:"Basic 6 player",
        //     desc:"A simple 6-player game with a single seer and a single werewolf.",
        //     players: 6,
        //     reveal: ww.DeathReveal.Full,
        //     roles: [
        //         {role:ww.Roles.Werewolf, count: 1},
        //         {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 1},
        //         {role:ww.Roles.Villager, count: 4}
        //     ]
        // },
        // {name:"Basic 11 player",
        //     desc:"A simple 11-player game with a single seer and a single werewolf.",
        //     players: 12,
        //     reveal: ww.DeathReveal.Full,
        //     roles: [
        //         {role:ww.Roles.Werewolf, count: 4},
        //         {role:ww.Roles.Seer, n0:ww.N0Actions.RandomNegative, count: 3},
        //         {role:ww.Roles.Villager, count: 5}
        //     ]
        // },
    ];

})();
