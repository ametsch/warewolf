ww.titleScreen = {};

$(function() {

    ww.titleScreen.resetTitleScreen = function() {
        // Title Screen Setup
        var options = "";
        var addedPlayers = [];

        $("#versionText").html("Version 0.3 (08/07/2018)");

        for (var role in ww.Rolesets) {
            if (jQuery.inArray(ww.Rolesets[role].players, addedPlayers) === -1) {
                addedPlayers.push(ww.Rolesets[role].players);
                options += '<option value="' + ww.Rolesets[role].players + '"';
                if(ww.Rolesets[role].players == wwgame.numPlayers) {
                    options += ' selected';
                }
                options += '>' + ww.Rolesets[role].players + ' Players</option>';
            }
        }
        $('#players').html(options);
        $("#players").change(); // init values
        $('#roleset').change(); // init values
    };

    // React to players combo box changing
    $("#players").change(function () {
        wwgame.numPlayers = parseInt($('#players').val(), 10);
        var options = "";
        for (var role in ww.Rolesets) {
            if (ww.Rolesets[role].players == wwgame.numPlayers) {
                options += '<option value="' + role + '"';
                if(role == wwgame.rolesetIndex) {
                    options += ' selected';
                }
                options += '>' + ww.Rolesets[role].name + '</option>';
            }
        }
        $('#roleset').html(options);
        $('#roleset').change();
    });

    // React to roleset combo box changing
    $('#roleset').change(function() {
        wwgame.rolesetIndex = parseInt($('#roleset').val(), 10);
        wwgame.roleset = ww.Rolesets[wwgame.rolesetIndex];
        var desc = wwgame.roleset.desc + "<br /><br />";
        for (var r in wwgame.roleset.roles) {
                    desc += wwgame.roleset.roles[r].count + "x ";
                    desc += wwhtml.GetRoleAndAttributes(wwgame.roleset.roles[r], true);
                    if(wwgame.roleset.roles[r].n0) {
                        desc += " (" + wwgame.roleset.roles[r].n0.desc + ")";
                    }
                    desc += "<br />";
                }
        $('#rolesetdesc').html(desc);
    });

    // React to Play button
    $("#titlePlayButton").click(function() {
        ww.playerEntryScreen.createLineForEachPlayer();
        changeScreens("#playerEntryScreen");
        return false;
    });

});


// Utilities 
// Array shuffle function
function shuffle(array) {
    var tmp, current, top = array.length;

    // Attempt a pseudo-seed here to change the randomness a little bit.
    // See if this helps those Android phones
    var seedLen = (new Date()).getTime() % 50;
    for (current=0; current<seedLen; current++) {
        tmp = Math.random();
    }
    
    if (top) while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
}

// Swap one screen for another
function changeScreens(destPage, animation, animReverse) {
    var options = { changeHash: false };
    if(animation) {
        options.transition = animation;
    }
    if(animReverse) {
        options.reverse = true;
    }
    $.mobile.changePage(destPage, options);
    wwgame.saveState();
}
/*
// jQuery 1.7.1:
function changeScreens(curScreen, destScreen) {
    $(curScreen).hide("slide", {}, 300, function() {
        $(destScreen).show("slide", {}, 300);
    });
}
 */

/*
// Prolly not needed since I switched to $.mobile.changePage() page transitions
function changeScreens(curScreen, destScreen) {
    $(curScreen).hide();
    $(destScreen).show();
}
*/
