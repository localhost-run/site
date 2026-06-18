export const PortChooser = () => {
  const [port, setPort] = useState(25565);
  return (
    <>
      running on&nbsp;
      <label htmlFor="port">local port</label>
      &nbsp;
      <input style={{width: "5em"}} type="number" id="port" name="port" min="1" max="65535" value={port} onChange={(event) => setPort(event.target.value)} />
      ?
      use this command:
      <pre><code className="bash">{`ssh -R 25565:localhost:${port} localhost.run
`}</code></pre>
    </>
  )
};

