# Luna Design System

This project makes use of the [Luna Design System](https://luna.sainsburys.co.uk/) which is built by members of Sainsbury's Tech. We are a team of accessibility specialists, UX copy writers, UX designer and software engineers who are tasked with building tools and providing support and guidance in these areas for colleagues across the business.

The NPM packages for Luna are kept on a [private Nexus repo](https://nexus.public.prd.golf-prod.js-devops.co.uk/). To access this repo, you need to provide the `NEXUS_TOKEN` environment variable which can be obtained from the [Luna Hub Slack channel](https://sainsburys-tech.slack.com/archives/C0109KPBCR0), just click on the thunderbolt near the text input and select 'Get a temp access token' and you'll recieve a reply with a access token.

You'll need to add this token as an Enviornment Variable to download packages. You can do that by running the below command with the NpmToken replaced for the one sent to you.

```sh
$ export NEXUS_TOKEN=NpmToken.*****-***-***-***-*****
```
For more convenience, you can include this at the top of your shell configuration file, i.e. the .bash_profile or .zshrc file.

## Luna documentation and links

Usage guidelines and information can be found on the [Luna Guidelines](https://luna.sainsburys.co.uk/guidelines). The handiest sections are [Components](https://luna.sainsburys.co.uk/components), [Luna Style - Getting Started](https://luna.sainsburys.co.uk/guidelines/documentation/luna-style/getting-started), [Copy Guidelines - Voice and Tone](https://luna.sainsburys.co.uk/copy/voice-and-tone) and [Accessibilty](https://luna.sainsburys.co.uk/accessibility). 

We have a [getting started guide](https://jsainsburyplc.github.io/luna/#/Articles/Badger%20Farm%20release/Getting%20started), which walks through creating a Luna app from scratch. Additionally, the [migration guide](https://jsainsburyplc.github.io/luna/#/Articles/Badger%20Farm%20release/Migration) has some good information and can be used like a quick start guide to the Luna Codebase. 
 
Please do get in touch with us on our [Luna Hub - MS Teams channel](https://teams.microsoft.com/l/team/19%3aaad9802e55b146dab1e3d2fb4a0fc52d%40thread.skype/conversations?groupId=a5c53840-8b6c-4d88-a798-8e2550ac34ef&tenantId=e11fd634-26b5-47f4-8b8c-908e466e9bdf), [Luna Hub - Slack channel](https://sainsburys-tech.slack.com/archives/C0109KPBCR0) or via our [e-mail](mailto:lunateam@sainsburys.co.uk) if you have any questions or issues. 
