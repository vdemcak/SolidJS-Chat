# Simple Socket.IO + Solid.js Chat App

This is a really bare-bones example of how to use Socket.IO with Solid.js. It's not meant to be a production-ready app, but rather a simple example. There are many things that could be improved like adding proper login support, profile images(Gravatar) and maybe even better frontend UI, but it's a good starting point.

## How to run

In order to run this app, you'll need to have both, server and client running(or you can deploy the client to a static hosting service). Also, make sure to change the Socket.IO connection URL(located in `App.tsx`) in the client to match your server URL. From there, you can install the packages in both, server and client, and run them separately with `pnpm dev`.

## Final note

This is my first time using Solid.js and Socket.IO, so I'm sure there are many things that could be improved. If you have any suggestions, please let me know!
