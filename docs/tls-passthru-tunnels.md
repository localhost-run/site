---
id: tls-passthru-tunnels
title: TLS Passthru Tunnels
sidebar_label: TLS Passthru Tunnels
slug: /tls-passthru-tunnels
---

To set up a TLS passthru tunnel to port 8443, request a port forward from port 443 by running the following command:
```
ssh -R 443:localhost:8443 localhost.run
```

localhost.run will forward all connections to your domain on port 443 thru to your app as is, and your app will need to provide it's own certificate and decrypt the connection.

:::tip
If you don't want to handle certificates and decryption yourself but still want your clients to connect to HTTPS see [HTTP Tunnels](http-tunnels), they provide HTTPS endpoints and take care of decryption for you.
:::

:::info
This mode of operation is currently only available to [Custom Domains](custom-domains.md).
:::

### Non-HTTP protocols


