---
id: custom-domains
title: Custom Domains
sidebar_label: Custom Domains
slug: /custom-domains
---

You can use your own domains with localhost.run.

To do this visit https://admin.localhost.run, add your SSH key to your account for authentication and add a custom domain to your account.

You will need to set up DNS records on your domain to both verify ownership and route traffic to the localhost.run service.

Once setup is complete you can connect a tunnel to your domain by adding it to the `-R` cli argument like this:
```
ssh -R yourdomain.com:80:localhost:8080 localhost.run
```

## Plan your custom domain name around what you want to use your domain for

:::warning
currently you can't change a domain name, so please choose carefully
:::

Will you be using your localhost.run tunnels for development? Will you be hosting other sites that are not behind tunnels on your domain?

In most cases we recommend using a subdomain for your tunnels, for example `tunnel.yourdomain.com`.

## Subdomains are included in your custom domain plan

If you set up a custom domain on `yourdomain.com` you get the option to use subdomains as part of the plan.

This means that you can not only connect tunnels to `yourdomain.com`, but *also* to any subdomain of your custom domain, like `app1.yourdomain.com` and `anything-else.yourdomain.com` for example.

To enable this functionality follow the regular setup instructions for your custom domain, and once complete, add a CNAME record for `*.yourdomain.com` pointing at `cd.localhost.run`.

You can then connect a tunnel to subdomains:
```
ssh -R app1.yourdomain.com:80:localhost:8081 localhost.run
```

:::note
You can connect up to 5 tunnels at the same time.
:::

:::note
the number of subdomains you can use in a month is limited by letsencrypt limits on certificate generation.
:::
