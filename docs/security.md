---
id: security
title: Security
sidebar_label: Security
slug: /security
---

## SSH

[SSH isn't only used by localhost.run](https://en.wikipedia.org/wiki/SSH_(Secure_Shell)), it is widely used to provide secure login access to servers.

It is end to end encrypted, meaning regardless of client encryption or mode of operation the tunnels from localhost.run back to your local app are fully encrypted.

## HTTP tunnels

HTTP is unencrypted, and as such it is recommended that apps demand HTTPS in all cases.

localhost.run automatically generates HTTPS endpoints for all HTTP tunnels that your clients can connect to and takes care of certificates and decryption for you.

Proxy headers that most web frameworks will automatically detect are added, and so in most cases this is a simple setting to tell your web app to require HTTPS.

Check your application frameworks documentation for more details on how to do this and [HTTP tunnels](http-tunnels) for more details on how tunnels work.


## TLS passthru

localhost.run offers a TLS passthru mode of operation, allowing you to use your own TLS certificates. In this mode of operation localhost.run does not decrypt your traffic, rather it passes it thru as is to your encrypted tunnel, leaving your app to handle decryption.

Check [TLS passthru tunnels](tls-passthru-tunnels) for more details on how these tunnels work.
