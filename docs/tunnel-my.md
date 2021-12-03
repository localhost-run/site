---
id: tunnel-my
title: Tunnel My ...
sidebar_label: Tunnel My ...
slug: /tunnel-my
---

## Wordpress

Wordpress is configured to run under a specific URL, usually `http://localhost`. This is excellent for local development but not for being on the internet.

Follow the instructions at https://wordpress.org/support/article/changing-the-site-url/ to set the URL of your wordpress installation.

:::tip

Free domains change after a period of time and are not recommended for Wordpress due to Wordpress's lengthy URL update procedure.

If you will primarily be developing Wordpress sites please consider a Custom Domain plan from https://admin.localhost.run. This will give your tunnel a stable domain name which you only need to configure once.

:::

:::caution

If you want to use Wordpress with a free domain you can explore https://wordpress.org/plugins/relative-url/ and setting `WP_HOME` and `WP_SITEURL` to `'https://' . $_SERVER['HTTP_HOST']`, but please pay attention to the warnings on the relative-url plugin.

:::

## Favourite Web framework

If you see requests going to `localhost:{your locally running apps port}` in your browsers dev tools when browsing your site through localhost.run check your framework for reverse proxy settings.

More information can be found in [the faq](faq#i-can-see-requests-to-localhost8080-when-browsing-my-site-thru-localhostrun).

## SSH servers

With a custom domain plan it is possible to tunnel to a SSH server using stunnel on the SSH client.

1. On the SSH server make sure your localhost.run tunnel is connected:

   ```bash
   ssh -R tunnel.example.com:80:localhost:22 plan@cd.localhost.run
   ```

   This must be running to connect to SSH from your client computer.

   The rest of this guide is for the client computer.

1. Install [stunnel](https://www.stunnel.org/) on your client SSH computer.

   stunnel is an application that wraps TCP, like SSH, in TLS.

1. Configure it to wrap connections to localhost:2222 in TLS and send them to your custom domain by creating a file named `stunnel.conf`

   ```none title="stunnel.conf"
   foreground = yes
   pid = ./stunnel.pid
   [lhr]
   client = yes
   accept = localhost:2222
   connect = tunnel.example.com:443
   ```

1. Run `stunnel stunnel.conf` in a terminal. This command must be running to connect to SSH.

1. Run `ssh localhost -p 2222` to connect over the tunnels to your SSH server.
