# Twitter/X thread: Porting Metin2 to Android

## 1/18

🧵 Porting Metin2 to Android.

I've long been a fan of game-porting projects, so I thought I'd give it a go. Metin2 was a free-to-play Korean MMORPG that became huge across Eastern Europe and the Middle East in the 2000s.

I wanted to see whether this old Windows game could become a real Android app.

## 2/18

The first screenshot looked humiliating: no text, an upside-down backdrop and an empty server list.

But it represented hours of work. I started from an unfinished port:

https://github.com/Bahori35/metin2-android

It had the client source, an Android Gradle/CMake project, a JNI bridge and part of a D3D8 → OpenGL ES layer.

## 3/18

It did not include the game data: no textures, maps, models, scripts or sounds.

The Android project also was not close to compiling. The first build produced roughly 2,000 errors.

That was useful. The errors were a map of every Windows assumption the client was making.

## 4/18

Metin2 was written for Windows in the 2000s with Microsoft's compiler. It calls Win32 functions that simply do not exist on Android.

I wrote narrow stand-ins for the things the game actually uses:

- files and paths
- sockets
- timers and threads
- fonts
- window state
- input and lifecycle

## 5/18

The goal was not to recreate all of Win32. It was to implement the small contract the client actually exercises.

Android owns the activity and surface. The native client owns the game loop. JNI connects them, and a platform layer translates Android events into the old engine's expectations.

## 6/18

The first successful run produced a black screen.

That was progress: the code compiled and the engine was alive. It was waiting for a visible-window signal and needed its own thread rather than running inside the activity callback.

After fixing that, the game finally drew.

## 7/18

The next screenshot was an upside-down backdrop.

Direct3D 8 and OpenGL ES disagree about texture orientation. Flipping one image fixed the symptom, but not the port.

This became a recurring theme: old rendering conventions had to be translated, not merely stubbed.

## 8/18

The D3D8 → GLES layer had placeholders for important behaviour:

- camera and projection matrices
- picking
- vertex layouts
- texture coordinates
- colour and alpha state
- render-to-texture
- fixed-function texture stages

“Doesn't crash” was not the same as “means the same thing”.

## 9/18

I needed compatible data and a server too:

Client data: https://github.com/d1str4ught/m2dev-client

Server source: https://github.com/d1str4ught/m2dev-server-src

Server runtime/setup: https://github.com/d1str4ught/m2dev-server

The client and server were close, but their binary packets did not always agree.

## 10/18

With a binary protocol, one wrong byte shifts every field after it.

In one case the client expected a different number of character slots, then read the server's next field as an IP address. It got `0.0.0.0` and kept reconnecting.

The fix was packet-by-packet comparison until login, character selection and world entry stayed aligned.

## 11/18

Metin2 uses Granny for its GR2 models and animations. Granny is commercial middleware.

I initially used stubs so I could work on the rest of the port, then started an open-source replacement:

https://github.com/cemreefe/OpenGr2ndma

It is useful for this port, but also for other old games carrying Granny assets.

## 12/18

The graphics adapter became its own reusable project too:

https://github.com/cemreefe/d8gles

The separation mattered. Android lifecycle, graphics compatibility, GR2 loading, game logic and server communication could evolve without turning every change into a full rewrite.

## 13/18

Then came the part desktop ports often underestimate: making the game usable with fingers.

The Android client now has:

- tap-to-move
- a floating joystick
- camera drag
- pinch-to-zoom
- a radial mobile menu
- large quick slots
- Android keyboard input

## 14/18

The interaction rules are intentionally simple:

Tap a mob → auto-attack until it dies.

Tap the mobile attack button → one swing.

Manual movement cancels auto-attack.

Camera movement stays independent.

Tap an item/skill → details.

Hold it → pick it up and move it.

## 15/18

The final app is one APK with two kinds of server entry:

- Single Player starts the embedded database, auth and channel servers.
- Remote servers come from a repository-owned JSON catalog.

The catalog is baked in as a fallback and refreshed at launch, so adding a remote server does not require a new APK.

## 16/18

One of the best bugs looked like item loss.

The server used 90 inventory slots. The client was built with four inventory pages and looked for equipment 90 slots later.

The fan was arriving at slot 94. The client was treating it as an invisible third inventory page.

Disable the mismatch, and the equipment panel came back.

## 17/18

The current port can:

- log in and select a character
- enter the world
- render terrain, monsters and the minimap
- move and fight by touch
- open inventory, skills and equipment
- persist items across relaunch
- scale the UI to 150%
- run in landscape or portrait

It builds for arm64-v8a and x86_64.

## 18/18

It is not finished in the sense that no engineering project is finished. Physical arm64 validation, performance work, long-session stability and more GR2 animation work remain.

But it is no longer a black screen or a server list that leads nowhere. It is a playable Android client for a game never designed to run there.

Full write-up: https://cemrekarakas.com/posts/2026/10/05/porting-metin2-to-android

Code: https://github.com/cemreefe/metin2-android
