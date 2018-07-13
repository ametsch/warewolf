//Dawn Play Screen
ww.dawnPlayScreen = {};

$(function() {

    ww.dawnPlayScreen.showNightActions = function() {
        var dawnReveal = "";
        if(wwgame.nkPlayerIndex >= 0 && wwgame.nkPlayerIndex < wwgame.numPlayers) {
            wwgame.players[wwgame.nkPlayerIndex].alive = false;
            dawnReveal = "A player has been found dead in the night!<br />";
            dawnReveal += wwhtml.getDeathText(wwgame.players[wwgame.nkPlayerIndex]);
        }
        else {
            dawnReveal = "The night passes quietly.  No one has died.";
        }
        $("#dawnRevealNightActions").html(dawnReveal);
    };

    $("#lynchContinue").click(function() {
        // Check for end of game via NK
        var gameOver = wwgame.getGameOver();
        if (gameOver) {
            // Done!
            ww.gameOverScreen.showGameOver(gameOver);
            changeScreens("#gameOverScreen");
        }
        else {
            // And a new day dawns.
            wwgame.curDay++;
            ww.dawnChooseLynch.showPlayerLynchList();
            changeScreens("#dawnChooseLynch");
        }
    });

});

// Dawn Choose Lynch
ww.dawnChooseLynch = {};

$(function() {

    ww.dawnChooseLynch.showPlayerLynchList = function() {
        var players = wwhtml.getLivingPlayerRadioList("Who is it to be?", "lynchPlayerName", "lynchPlayerRadioList");
        $("#lynchPlayerList").html(players);
        $("#lynchPlayerListDiv").trigger("create");
    };

    $("#lynchNow").click(function() {
        var lynchIndex = $('input[name=lynchPlayerRadioList]:checked').val();
        wwgame.players[lynchIndex].alive = false;

        ww.lynchRevealScreen.showLynchedPlayer(wwgame.players[lynchIndex]);

        changeScreens("#lynchRevealScreen");
    });

});


//Dawn Blank Locked Screen
ww.duskBlankLockedScreen = {};

$(function() {

    ww.duskBlankLockedScreen.nextPage = "#duskLockedScreen";
    
    $(document).delegate('#duskBlankLockedScreen', 'pageshow', function() {
        // `this` refers to the `#duskBlankLockedScreen` element
        changeScreens(ww.duskBlankLockedScreen.nextPage);
    });

});


//Dawn Locked Screen
ww.duskLockedScreen = {};

$(function() {

    ww.duskLockedScreen.resetToFirstPlayer = function() {
        // Reset all the data to start the night cycle all over again
        wwgame.curPlayer = wwgame.getFirstLivingPlayerIndex();
        wwgame.nkPlayerIndex = -1;
        ww.duskPlayerScreen.resetForNewDusk();
    };

    ww.duskLockedScreen.showCurrentPlayer = function() {
        $("#lockName").html(wwgame.players[wwgame.curPlayer].name);
    };

    function checkUnlockState() {
        if ($("#unlockButton1").is(':checked') && $("#unlockButton2").is(':checked')) {
            ww.duskPlayerScreen.setupCurrentPlayerActions();
            setTimeout(function() {
                changeScreens("#duskPlayerScreen", "flip");
                $("#unlockButton1").removeAttr("checked").checkboxradio("refresh");
                $("#unlockButton2").removeAttr("checked").checkboxradio("refresh");
            }, 200);
        }
    }

    $("#unlockButton1").click(function() {
        checkUnlockState();
    });

    $("#unlockButton2").click(function() {
        checkUnlockState();
    });

});
