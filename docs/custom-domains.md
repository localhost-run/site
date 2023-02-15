---
id: custom-domains
title: Custom Domains
sidebar_label: Custom Domains
slug: /custom-domains
---

For $9 per month (billed annually) a Custom Domain subscription enables a stable domain for your tunnel with a priority share of the bandwidth on the localhost.run system.

You can use your own domain, or you can use a subdomain of lhr.rocks.

To create a Custom Domain subscription visit https://admin.localhost.run, add your SSH key to your account for authentication and add your chosen Custom Domain to your account.

If you want to use your own domain name, you will need to set up some DNS records on your domain to both verify ownership and route traffic to the localhost.run service as described below.

If you want to use a subdomain of lhr.rocks this will already be set up for you and you can start using your tunnel immediately.

Once setup is complete you can connect a tunnel to your domain by adding it to the `-R` cli argument like this:
```
ssh -R yourdomain.com:80:localhost:8080 plan@localhost.run
```

The `plan@` username is optional but if you have multiple SSH keys it's recommended.

## lhr.rocks subdomains

lhr.rocks subdomains require no DNS setup and are the quickest way to get a tunnel with a stable domain name and faster speeds.

Domains are issued on a first come basis so if your chosen domain is a duplicate please try another one.

## Setup DNS for your own domain

If you have chosen to use your own domain you will need to set up some DNS records.

Once you've added your custom domain you will be shown these DNS records to set up with your DNS provider. Your DNS provider is usually the same provider that you bought your domain name from.

Check how to add a TXT record to your DNS provider and add the record you see in the admin console for your domain name, it will have the format of `_lhr.{your domain name}` and a target of your domain ID.

Some providers add quotes to TXT records for you, please don't be surprised if you see this. You can check your TXT record at https://toolbox.googleapps.com/apps/dig/#TXT/, you should see an answer that looks similar to `_lhr.yourdomain.com. 299 IN TXT "630aa6d4-0294-4cf2-a0cf-843e30dd5b6b"`.

### CNAME vs A records

The next step is tricky, CNAMEs are the easiest to set up but can't live on apex domains.

An apex domain is the top of your DNS, but it isn't the same as an internet TLD domain, I have four examples to explain this:
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

## Changing your domain name

To change to a new custom domain name follow these steps:

1. Delete your existing custom domain name subscription. This will credit your account for the amount of time remaining on this subscription.
1. Create a new custom domain subscription. This will use the credit from the cancelled subscription instead of asking for a new payment.

## Cancelling a subscription

To cancel a subscription delete your custom domain.

For any other billing related help please email help@localhost.run .
