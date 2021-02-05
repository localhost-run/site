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

## Setup DNS

Once you've added your custom domain you will need to set up DNS records with your DNS provider. Your DNS provider is usually the same as where you bought your domain name.

Check how to add a TXT record to your DNS provider and add the record you see in the admin console for your domain name, it will have the format of `_lhr.{your domain name}` and a target of your domain ID in quotes.

Some providers add the quotes for you, some expect you to add them. You can check your TXT record at https://toolbox.googleapps.com/apps/dig/#TXT/, you should see an answer that looks like `_lhr.yourdomain.com. 299 IN TXT "630aa6d4-0294-4cf2-a0cf-843e30dd5b6b"`.

### CNAME vs A records

The next step is tricky, CNAMEs are the easiest to set up but can't live on apex domains.

An apex domain is the top of your DNS, but it isn't the same as an internet TLD domain, I will offer four examples to illustrate this:
* Your DNS allows setting host names under example.com and you want to set your tunnels up on example.com.
  
  This **is** an apex, create A records on example.com.

* Your DNS allows setting host names under example.com and you want to set your tunnels up on tunnel.example.com.

  This **is not** an apex create a CNAME record on example.com.

* Your DNS allows setting host names under jane.example.com and you want to set your tunnels up on jane.example.com.

  This **is** an apex, create A records on jane.example.com.

* Your DNS allows setting host names under jane.example.com and you want to set your tunnels up on tunnel.jane.example.com.

  This **is not** an apex create a CNAME record on jane.example.com.

If you are still not sure use A records.

Set either a CNAME record on your custom domain targeting `cd.localhost.run` *or* 3 A records on your custom domain targeting `54.161.197.247`, `54.82.85.249` and `35.171.254.69`.

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
