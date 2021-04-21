---
id: faq
title: FAQ
sidebar_label: FAQ
slug: /faq
---

## Generating a SSH key

If you don't already have a SSH key you can generate one with this command:

```bash
ssh-keygen -t rsa
```

## Common connectivity issues

### I've set up my SSH key in my account but my custom domain tunnel is denied

try adding `plan` as your ssh user, like so:

```bash
ssh -R example.com:80:localhost:8080 plan@localhost.run
```

If this doesn't fix it then please send an email for help.

### "localhost.run: Permission denied (publickey)" error in your terminal

try adding `nokey` as your ssh user, like so:

```bash
ssh -R 80:localhost:8080 nokey@localhost.run
```

### My tunnel name changes every time I connect

Free tunnels change domain names after a few hours. To keep your domain name between connections make sure you have a SSH key and that you are not using the `nokey` username.

### "connect_to localhost port 8080: failed" error in your terminal

Double check that your local application is accessible on localhost and your specificed port by accessing http://localhost:{your local port} in your browser.

### "Something went wrong opening the port forward, check your SSH command output for clues!" in your browser

Check your running SSH command for hints, and double check that your local application is accessible on localhost and your specificed port by accessing http://localhost:{your local port} in your browser.

### I can see requests to localhost:8080 when browsing my site thru localhost.run

Many web frameworks generate full URLs using the domain they _think_ they're running under, which can sometimes be localhost and the port they listen on.

Google the name of your framework + reverse proxy for hints on how to fix issues like this.

## I want to move my domain(s) to a new email login

Sometimes this is because you've lost access to the email you used to sign up, or maybe you simply prefer another email.

To move a domain:

1. Cancel your existing custom domain subscription if you still have access to your old account.
1. Set up your domain in your new account. It is fine that it is the same domain name.
1. Verify it by changing the TXT record on your`_lhr` subdomain to your new domain's id as instructed in the web console.
1. Make payment for the new domain subscription. You will be credited for time remaining on the old domain in the next step, don't worry.
1. Send a message to help@localhost.run explaining that you have to moved your domain to the new account. Your old subscription will be canceled and your new subscription credited with any remaining time.
