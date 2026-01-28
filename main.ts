namespace SpriteKind {
    export const Intro = SpriteKind.create()
}
/**
 * ---------------- START GAME ----------------
 */
// HIER KOMT JE GAME LOGICA
function startGame () {
    CurrentScreen = "Game"
    sprites.destroy(MapText)
    music.stopAllSounds()
    effects.bubbles.startScreenEffect(500)
    music.play(music.createSong(assets.song`MainThemeIntro`), music.PlaybackMode.UntilDone)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CurrentScreen == "MapSelect") {
        SelectedMap += 1
        if (SelectedMap > 2) {
            SelectedMap = 1
        }
        updateMap()
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (CurrentScreen == "MapSelect") {
        SelectedMap += -1
        if (SelectedMap < 1) {
            SelectedMap = 2
        }
        updateMap()
    }
})
// ---------------- CONTROLS ----------------
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // PLAY → MAP SELECT
    // MAP SELECT → GAME
    if (CurrentScreen == "Title") {
        openMapSelect()
    } else if (CurrentScreen == "MapSelect") {
        startGame()
    }
})
// ---------------- MAP SELECT ----------------
function openMapSelect () {
    CurrentScreen = "MapSelect"
    sprites.destroy(PLAY)
    MapText = textsprite.create("MAP 1", 15, 1)
    MapText.setPosition(80, 110)
    MapText.setBorder(1, 15)
    updateMap()
}
function updateMap () {
    if (SelectedMap == 1) {
        scene.setBackgroundImage(assets.image`mijnPlaatje1`)
        MapText.setText("MAP 1")
    } else {
        scene.setBackgroundImage(assets.image`mijnPlaatje`)
        MapText.setText("MAP 2")
    }
}
let MapText: TextSprite = null
let PLAY: TextSprite = null
let SelectedMap = 0
let CurrentScreen = ""
CurrentScreen = "Intro"
SelectedMap = 1
// ---------------- INTRO ----------------
let IntroSprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Intro)
IntroSprite.setPosition(0, 0)
music.play(music.createSong(assets.song`mijnLiedje0`), music.PlaybackMode.InBackground)
animation.runImageAnimation(
IntroSprite,
assets.animation`mijnAnimatie`,
150,
false
)
pause(2500)
sprites.destroy(IntroSprite)
music.stopAllSounds()
// ---------------- TITLE SCREEN ----------------
scene.setBackgroundImage(assets.image`mijnPlaatje0`)
CurrentScreen = "Title"
music.play(music.createSong(assets.song`mijnLiedje2`), music.PlaybackMode.LoopingInBackground)
PLAY = textsprite.create("PLAY", 15, 1)
PLAY.setMaxFontHeight(16)
PLAY.setPosition(80, 100)
PLAY.setBorder(1, 15)
