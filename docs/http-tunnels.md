---
id: http-tunnels
title: HTTP Tunnels
sidebar_label: HTTP Tunnels
slug: /http-tunnels
---

To set up a HTTP tunnel to port 8080, request a port forward from port 80 by running the following command:
```
ssh -R 80:localhost:8080 localhost.run
```

localhost.run forwards HTTP traffic down your tunnel to your app, and automatically adds encrypted HTTPS endpoints for your clients to optionally connect to.


Prefix your domain name with `https://` to access your tunnel over HTTPS, and localhost will unwrap the encryption for you and send the plain HTTP requests to your app.

## Proxy headers

Reverse proxy headers are automatically added to HTTP requests, specifically [`X_Forwarded_For`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For), [`X_Forwarded_Host`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host), [`X_Forwarded_Proto`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto) and the newer [`Forwarded`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded) header.

These can be turned off with a [command line option](cli) if required.

## Carrying non-HTTP protocols over TLS

Clients connecting to port 443 over TLS do not have to talk the HTTP protocol, any protocol from TLS capable client will be sent down your tunnel.

For example, a PostgreSQL server listening on port 5432 could be connected to a tunnel with this command:

```
ssh -R 80:localhost:5432 localhost.run
```

and TLS clients could then connect to the generated localhost.run domain on port 443.

Your app connected to your tunnel should be listening for plain TCP because localhost.run will take care of certificates and decryption for you.

:::info
Currently only [Custom Domains](custom-domains.md) can carry non-HTTP protocols.
:::
