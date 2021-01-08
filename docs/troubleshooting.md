---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
slug: /troubleshooting
---

## Common issues

### "localhost.run: Permission denied (publickey)" error in your terminal

localhost.run requires a SSH key. You can generate one with this command and enter through the prompts to accept the defaults:

```bash
ssh-keygen -t rsa
```

### "connect_to localhost port 8080: failed" error in your terminal

Double check that your local application is accessible on localhost and your specificed port by accessing http://localhost:{your local port} in your browser.

### "Something went wrong opening the port forward, check your SSH command output for clues!" in your browser

Check your running SSH command for hints, and double check that your local application is accessible on localhost and your specificed port by accessing http://localhost:{your local port} in your browser.

### I can see requests to localhost:8080 when browsing my site thru localhost.run

Many web frameworks generate full URLs using the domain they _think_ they're running under, which can sometimes be localhost and the port they listen on.

Google the name of your framework + reverse proxy for hints on how to fix issues like this.
