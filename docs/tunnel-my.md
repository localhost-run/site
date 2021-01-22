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
