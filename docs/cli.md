---
id: cli
title: Command Line Interface
sidebar_label: Command Line Interface
slug: /cli
---


localhost.run uses SSH, which is already installed on all major operating systems.

Mac OS, Windows and most Linux will use openssh. The man page for openssh is [here](https://man.openbsd.org/ssh), the commands you will most often need for tunnels are documented below.

## ssh ...

ssh [-R _tunnel_](#-r-tunnel) localhost.run [-- [--output _output_]]

### -R [[_customdomain_:]](#customdomain)[_bindport_](#bindport):[_host_:_hostport_](#hosthostport)

Forward connections from the localhost.run internet accessable domain to _host_:_port_.

#### _customdomain_

Optionally connect a tunnel to a [custom domain](custom-domains.md).

This defaults to `localhost.run` which generates a free domain under `localhost.run`.

#### _bindport_

Set your domain to listen on either `80` or `443`.

`80` will deploy an unencrypted forwarder on port 80 and a TLS decryption forwarder on port 443 for your domain and send your application unencrypted traffic from your clients.

`443` will deploy a redirect to HTTPS on port 80 and a TLS passthru forwarder on port 443 for your domain and send your application the unaltered TLS traffic from your clients.

:::warning
`443` is an advanced mode of operation used to develop TLS applications, like letsencrypt handlers for example. Unless you know with certainly you want to use it, you probably don't want to use it.
:::

#### _host_:_hostport_

The local address to connect the tunnel to. For example if you access your local application on `localhost:8080` then this is also `localhost:8080`

:::note
Some operating systems set `localhost` to the ipv6 address `[::1]` while some frameworks listen on `127.0.0.1`, try `127.0.0.1` instead of `localhost` if there are connection issues.
:::

### --output _output_

Set the output format for event messages

* text (default)
* json

## Examples

1. `ssh -R 80:localhost:8080 localhost.run` will connect a free domain tunnel to localhost on port 8080.

1. `ssh -R 80:localhost:3000 localhost.run` will connect a free domain tunnel to localhost on port 3000.

1. `ssh -R example.com:80:localhost:3000 localhost.run` will connect a custom domain tunnel from example.com to localhost on port 3000.

1. `ssh -R www.example.com:80:localhost:3000 -R example.com:80:localhost:3000 localhost.run` will connect a custom domain tunnel from example.com and www.example.com to localhost on port 3000. See [Custom Domains](custom-domains.md) for more details about using subdomains included with all custom domains.

1. `ssh -R admin.example.com:80:localhost:8000 -R example.com:80:localhost:3000 localhost.run` will connect a custom domain tunnel from example.com to localhost on port 3000 and a custom domain tunnel from admin.example.com to localhost on port 8000. See [Custom Domains](custom-domains.md) for more details about using subdomains included with all custom domains.
