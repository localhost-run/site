---
id: the-basics
title: The Basics
sidebar_label: The Basics
slug: /
---

## Put a locally running HTTP, HTTPS or TLS app on the internet

localhost.run is a client-less tool to instantly make a locally running application available on an internet accessible URL.

All major operating systems already have SSH installed, and localhost.run uses SSH as a client, so no download is necessary to use the service and no account setup is needed for free domains.

To connect an internet domain to an application running locally on port 8080 open a command terminal and run:

```bash
ssh -R 80:localhost:8080 localhost.run
```

import { useState } from 'react'

export const PortChooser = () => {
  const [port, setPort] = useState(3000);
  return (
    <>
      running on&nbsp;
      <label for="port">local port</label>
      &nbsp;
      <input style={{width: "5em"}} type="number" id="port" name="port" min="1" max="65535" value={port} onChange={(event) => setPort(event.target.value)} />
      ?
      use this command:
      <pre><code parentName="pre" {...{
              "className": "bash"
            }}>{`ssh -R 80:localhost:${port} localhost.run
`}</code></pre>
    </>
  )
};

<PortChooser />
