---
date:   2026-10-05
title:  Porting Metin2 to Android
emoji:  ⚔️
tags:   coding
        games
        android
description: How I took an unfinished Android port of a 2000s Windows MMO and turned it into a playable Android client with touch controls and an embedded server.
---

# Porting Metin2 to Android

![Metin2 running with the mobile HUD, minimap, floating joystick and touch controls](./assets/metin2-world-mobile-hud.png)

I have been a fan of game-porting projects for a long time. The idea that a game can be tied to one operating system, one graphics API and one generation of hardware, and that we can plug a translator into all integration ends to make it work in a platform it was never meant for felt very interesting to me. Windows machines haven't been a part of my life for almost 10 years now. If the game is still fun, why should it stop working just because the original platform moved on? With some nostalgia and some technical curiosity I took on the challenge. 

P.S.: I used _a lot_ of AI to get this working.

So I picked a game I spent far too much time with in the 2000s: **Metin2**. 

Metin2 is a Korean free-to-play MMORPG that became particularly popular across Eastern Europe and the Middle East. For anyone out of the loop this game was **HUGE** in Turkey. People got stabbed over it!

It is also a fairly hostile target for a modern Android port. The client was written for Windows, expects Direct3D 8, uses old Win32 APIs throughout, depends on a proprietary 3D asset format, and talks to a server using a very specific binary protocol.

The short version is that it now boots, logs in, enters the world, renders characters and monsters, moves by touch, fights, opens its inventory and persists items. Everything that I could test, works. 

I made a deliberate choice to create a single-player mode too. I ship the server client with the APK so that both the server and client can be run completely locally. No internet required to play! Alongisde that I ship a server list, the game fetches that from github dynamically at startup so I can add more servers to play.

![Architecture of the single Android application, embedded server and refreshable remote-server catalog](./assets/metin2-architecture.svg)

The shape of the finished application is easier to understand as a set of boundaries than as a list of features. The Android shell, native client, local services and remote catalog each solve a different part of the problem.

## The starting point

I did not begin with a clean game engine or a modern source release. I found [Bahori35's unfinished Android port](https://github.com/Bahori35/metin2-android), which had several valuable pieces already in place:

1. A large portion of the Metin2 client source.
2. An Android Gradle and CMake project.
3. A JNI bridge between Android and the C++ engine.
4. The beginning of a Direct3D 8 to OpenGL ES compatibility layer.

It had the right shape, but it was not close to being a playable game. The repository did not contain the proprietary game data, and the compatibility layer was mostly a collection of placeholders. The first attempt to compile the client produced roughly two thousand errors.

That was actually useful. The errors became a map of the assumptions the original Windows build was making.

## Making a Windows client compile on Android

The first phase was not glamorous porting. It was building enough of a Windows-shaped world for the client to stop falling over.

The game calls Windows functions for file access, paths, sockets, timers, threads, fonts, window state and event handling. Android has equivalents for many of these things, but not equivalents with the same names, calling conventions or semantics.

I added a small platform layer that implements the subset the client really uses:

- Windows-style paths and file operations over Android's extracted data directory.
- Socket and connection helpers over the platform networking APIs.
- Timing and thread primitives.
- Window and surface lifecycle hooks.
- Font and text-loading fallbacks.
- The JNI entry points used by the Android shell.

The important decision was not to recreate all of Win32. It was to implement the narrow contract the game actually exercises. A compatibility layer is much easier to maintain when it is driven by observed use rather than by an ambition to emulate an entire operating system.

![Driven and driving adapter boundaries around the Metin2 game core](./assets/metin2-adapter-boundaries.svg)

The Android application owns the lifecycle and the native client owns the game loop. The two communicate through the JNI bridge. Android creates and destroys the surface; the native layer attaches the engine to it, runs the client loop on its own thread, and translates touch and keyboard events into the input events the old client expects.

The first time this worked, the result was a black screen.

## The black screen was progress

The black screen meant the code compiled and the engine was alive, but it was waiting for a visible window signal before drawing. It also expected to run on its own thread rather than inside the activity callback.

Once those lifecycle and threading assumptions were fixed, the game began to draw. The next screenshot was worse in a more encouraging way:

![An early Metin2 character-select screen from the Android port](./assets/metin2-character-select.png)

The backdrop was upside down.

That was the first clear sign that the rendering problem was not simply “Android is missing a function”. It was a disagreement between two graphics APIs with different conventions.

## Rebuilding the Direct3D 8 to GLES layer

Metin2 expects Microsoft's Direct3D 8. Android normally gives us OpenGL ES. The port therefore needs an adapter between the two.

The existing Direct3D-to-GLES code was enough to avoid some crashes, but not enough to preserve the meaning of the original rendering calls. Several important paths were either incomplete or silently returned plausible-looking values:

- Matrix operations for camera and projection.
- Picking and screen-space coordinate conversion.
- Vertex and texture-coordinate layout.
- Texture orientation.
- Colour and alpha state.
- Render-to-texture.
- Fixed-function texture-stage state.

The upside-down image came from texture-coordinate conventions. Direct3D and OpenGL do not agree about where the first row of a texture lives. Flipping one image fixed the symptom, but the durable fix had to be in the translation layer so that every texture-loaded path behaved consistently.

Then came the less photogenic work: getting matrices to produce real camera transforms, reading the correct fields from old vertex buffers, preserving blend and alpha-test state, and implementing the render-to-texture behaviour used by the minimap and UI.

The minimap was a particularly good test. It combines a map texture, a projected view, a circular mask and several layers of markers. When it disappeared after a live UI resize, the bug turned out not to be missing game data. The old minimap was being destroyed after the new one had already been created, so cleanup from the previous instance erased the new geometry.

The compatibility layer eventually became its own project: [d8gles](https://github.com/cemreefe/d8gles), a reusable Direct3D 8 fixed-function layer over OpenGL ES 3.

![Input and rendering pipelines meeting inside the native game loop](./assets/metin2-render-pipeline.svg)

## Finding compatible game data and a server

The client source alone cannot render Metin2. It needs maps, textures, models, UI scripts, sounds, item definitions and other data. It also needs a server that speaks the same protocol.

I used:

- [m2dev-client](https://github.com/d1str4ught/m2dev-client) for client data.
- [m2dev-server-src](https://github.com/d1str4ught/m2dev-server-src) for server source.
- [m2dev-server](https://github.com/d1str4ught/m2dev-server) for the server runtime and setup.

These were not a perfect matching set. The client and server could connect, but their packet layouts did not always agree. In a binary protocol, being almost compatible is the same as being completely incompatible. If one side expects a packet field that is one byte longer than the other side sends, every field after it is read at the wrong offset.

One example was character selection. The client expected a different number of character slots and then interpreted the server's next field as an address. The apparent result was an address of `0.0.0.0` and a client that kept reconnecting.

The fix was careful packet-by-packet alignment:

1. Compare the structures on both sides.
2. Check the exact field widths and conditional fields.
3. Log the first divergent packet.
4. Correct the client or server representation.
5. Repeat until the world-entry sequence stayed aligned.

This was less like implementing a new network protocol and more like repairing a conversation between two people who had each lost a few words from the same sentence.

![The debugging loop used to turn visible symptoms into boundary fixes](./assets/metin2-debugging-loop.svg)

## The 3D models and Granny problem

Metin2's models and animations use GR2 files from Granny, a commercial middleware product. The original client expects Granny to provide model loading, decompression, skeletons and animation playback.

Initially I used stubs simply to get the rest of the client moving. That made it possible to work on login, networking and UI without waiting for a complete model runtime, but it was never a satisfying long-term answer.

That detour became [OpenGr2ndma](https://github.com/cemreefe/OpenGr2ndma), an open-source project for reading, rendering and eventually animating GR2 files. It is useful beyond this port: anyone maintaining an old game with Granny assets has the same licensing and availability problem.

The broader lesson was to separate the problems. The Android shell, graphics compatibility layer, GR2 runtime and Metin2 game client should be replaceable independently. That made it possible to improve one layer without repeatedly destabilising all the others.

## Turning a desktop game into a touch game

Getting the old client to draw was only the beginning. A desktop game assumes a mouse, keyboard, hover states and small controls. A phone has fingers, no hover, a changing surface, and a screen that may be held in portrait or landscape.

The mobile layer now provides:

- Tap-to-move.
- A floating joystick.
- Camera dragging.
- Two-finger pinch zoom for camera distance.
- A radial mobile menu.
- Large quick slots and attack controls.
- Touch-friendly inventory and equipment interaction.
- Android keyboard input for login and chat.
- Mobile HUD and desktop HUD modes.

The interaction rules are deliberately simple:

- Tapping a mob targets it and starts auto-attack until it dies.
- Tapping the mobile attack button performs one swing.
- Manual movement cancels auto-attack.
- Camera movement is independent of attack behaviour.
- Tapping an item or skill shows its details.
- Holding an item or skill picks it up for moving or assigning it.

![The server selector in the single Android application](./assets/metin2-server-list.png)

The application contains both the embedded Single Player mode and a list of remote servers. The baked-in list is a fallback, while the installed app can refresh the repository-owned JSON catalog at launch. That means a new remote server can be added without releasing a new APK.

## The embedded server

The final application is one APK, not a separate online and offline build. In Single Player mode it starts a database server, authentication server and channel server locally. The Android shell supervises their lifecycle, passes the correct data directory and shuts them down when the application is removed.

There is only one channel in Single Player. Remote servers are separate entries in the catalog.

The embedded server costs much less than the game data itself. The client, textures, maps and models dominate the APK size; the server binaries and configuration are a relatively small addition that buys a completely self-contained mode.

## The inventory bug that looked like missing items

One of the more instructive bugs appeared when an item visibly existed on the character but did not appear in the equipment panel.

The server uses 90 inventory slots, with equipment beginning immediately after them. The client had been compiled with an extended four-page inventory, so it looked for equipment 90 slots later. The fan was arriving correctly at slot 94; the client was simply treating it as an invisible third inventory page.

Disabling the extended-inventory flag restored the shared coordinate system. The equipment panel populated, the item could be inspected, and the persisted item survived both an in-app restart and an app swipe-away/relaunch.

The dangling strip beside the inventory had a related cause: the belt-inventory handle was still positioned using the old tall window dimensions after the responsive wide inventory layout had been selected. It needed to anchor to the actual window geometry rather than to a fixed portrait of the original desktop layout.

## What exists now

The current port can:

- Build as one Android application for `arm64-v8a` and `x86_64`.
- Start the embedded server and enter Single Player.
- Select a remote server from a refreshable catalog.
- Log in, select a character and enter the world.
- Render terrain, characters, monsters, names and the minimap.
- Move and fight using touch controls.
- Open the mobile menu, inventory, skills and equipment.
- Display equipped items in the correct slots.
- Persist inventory and equipment across relaunches.
- Scale the UI up to 150%.
- Use a responsive wide inventory when the tall layout does not fit.
- Run in landscape or portrait mode.
- Play music and sound through an Android audio backend.

The current runtime evidence is primarily from the x86_64 Android emulator. A physical arm64 device still needs its own validation, and performance was intentionally left behind correctness: an old client running through a compatibility layer can spend a lot of time drawing, even when the original game was happy on a 128 MB PC.

There are still areas to improve, especially long-session stability, broader gameplay coverage and the remaining GR2 animation work. But this is no longer a black screen, a login mock-up or a server list with nowhere to go. It is a playable Android client for a game that was never designed to run there.

## The useful part of the process

The project reinforced a few things I keep learning:

1. **A bad screenshot can be a good milestone.** The first upside-down character screen told me much more than a clean compile did.
2. **Compatibility work is semantics work.** Matching function names is easy; matching coordinate systems, state machines and packet boundaries is the real port.
3. **Old games are systems, not executables.** The client, data, renderer, middleware and server all have to agree.
4. **Small reusable layers compound.** The graphics adapter and GR2 work are now useful outside Metin2.
5. **Make the app honest about its assumptions.** The server catalog fallback, lifecycle recovery and responsive layouts all came from treating failure modes as part of the product rather than as test noise.

The project is on [GitHub](https://github.com/cemreefe/metin2-android). The original progress thread is on [X](https://x.com/cemreefe/status/2106061006807921034).

! include socials
! include other-articles
