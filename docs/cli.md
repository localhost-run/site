---
id: cli
title: Command Line Interface
sidebar_label: Command Line Interface
slug: /cli
---


localhost.run uses SSH, which is already installed on all major operating systems.

Mac OS, Windows and most Linux will use openssh. The man page for openssh is [here](https://man.openbsd.org/ssh), the commands you will most often need for tunnels are documented below.

## ssh ...

ssh [-R _tunnel_](#-r-customdomainbindporthosthostport) localhost.run [-- [[--output _output_](#--output-output)] [[--[no-]inject-http-proxy-headers](#--inject-http-proxy-headers)] [[--proxy-protocol-header-version _version_](#--proxy-protocol-header-version-version)]

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

Set the output format for event messages:

* text (default)
* json

### --inject-http-proxy-headers

Enable http proxy headers.

This functionality is *on* by default and can be disabled with `--no-inject-http-proxy-headers`.

See [HTTP Tunnels Proxy headers section](http-tunnels#proxy_headers) for more information.

### --proxy-protocol-header-version _version_

Enable the [Proxy Protocol TCP header](https://www.haproxy.org/download/1.8/doc/proxy-protocol.txt) and set the Proxy Protocol version:

* v1
* v2

This defaults to `v1` when the header is enabled.


## Examples

1. `ssh -R 80:localhost:8080 localhost.run` will connect a free domain tunnel to localhost on port 8080.

1. `ssh -R 80:localhost:3000 localhost.run` will connect a free domain tunnel to localhost on port 3000.

1. `ssh -R example.com:80:localhost:3000 localhost.run` will connect a custom domain tunnel from example.com to localhost on port 3000.

1. `ssh -R www.example.com:80:localhost:3000 -R example.com:80:localhost:3000 localhost.run` will connect a custom domain tunnel from example.com and www.example.com to localhost on port 3000. See [Custom Domains](custom-domains.md) for more details about using subdomains included with all custom domains.

1. `ssh -R admin.example.com:80:localhost:8000 -R example.com:80:localhost:3000 localhost.run` will connect a custom domain tunnel from example.com to localhost on port 3000 and a custom domain tunnel from admin.example.com to localhost on port 8000. See [Custom Domains](custom-domains.md) for more details about using subdomains included with all custom domains.

1. `ssh -R example.com:80:localhost:3000 localhost.run -- --no-inject-http-proxy-headers` will connect a custom domain tunnel from example.com to localhost on port 3000 and not add HTTP Proxy headers.

1. `ssh -R example.com:80:localhost:3000 localhost.run -- --inject-proxy-protocol-header` will connect a custom domain tunnel from example.com to localhost on port 3000 and send a Proxy Protocol V1 header at the beginning of each TCP connection.
