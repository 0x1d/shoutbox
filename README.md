# Shoutbox

Shoutbox is a progressive-web-app that lets you write simple texts that are replicated to every user of this app.

It serves as a proof-of-concept for permissionless, distributed, censorship resistant dApp to share information.

All posts are stored locally on your device and can be viewed without internet.
As soon as you connect to the internet, everything syncs up again.
The code is open source so you can spin up your own shoutbox and sync it p2p with other instances if you like.

## Deploy

Open `akash.yaml` and change services/shoutbox/expose/accept to your domain.
For the PWA to work, you need to have HTTPS in front.
Go to [Cloudmos Deploy](https://deploy.cloudmos.io/) and deploy your SDL.

## P2P

To sync with other peers, change the first line in `script.js`
and add other peers:
```
const gun = Gun({ peers: [`${window.origin}/gun`] })
```
