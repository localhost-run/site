import React, { useState, } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

function Terminal() {
  return (
    <pre className="terminal">
      <div className="terminalHeader">terminal</div>
      <div className="terminalBody">
        <code>
          <p>$ <span className="textSelect command">ssh -R 80:localhost:8080 nokey@localhost.run</span></p>
          <br />
          <p>yourapp.localhost.run tunneled with tls termination</p>
        </code>
      </div>
    </pre>
  )
}

const features = [
  {
    title: 'No download or signup',
    imageUrl: 'img/cloud-download.svg',
    description: (
      <>
        Connect a tunnel now using the ssh client already installed on your computer.
      </>
    ),
  },
  {
    title: 'Bring your own domain name',
    imageUrl: 'img/globe2.svg',
    description: (
      <>
        <a href="https://admin.localhost.run/">Attach your own domain name or a stable lhr.rocks one to a tunnel with a custom domain subscription for $9 per month when billed annually.</a>
      </>
    ),
  },
  {
    title: 'Secure',
    imageUrl: 'img/shield-lock.svg',
    description: (
      <>
        TLS certificates are automatically generated to enable HTTPS and secure client connections. Tunnels are encrypted to your app.
      </>
    ),
  },
  {
    title: 'Instantly share urls',
    imageUrl: 'img/share.svg',
    description: (
      <>
        Show clients work running on your computer, access a web application running on your computer from your phone or tablet, or give your Raspberry Pi a home on the internet.
      </>
    ),
  },
  {
    title: 'Forever free tier',
    imageUrl: 'img/gift.svg',
    description: (
      <>
        Free domains will always be free, giving you a quick way to instantly share a web application running on any computer.
      </>
    ),
  },
  {
    title: 'Advanced use cases',
    imageUrl: 'img/puzzle.svg',
    description: (
      <>
        Tunnels cater to more than just web application development, they can also pass thru encrypted TLS connections and connect non-HTTP protocols.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage + ' feature'} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Connect web applications running on your computer to the internet instantly">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <p>connect a tunnel to your web application running on port 8080 now with</p>
          <Terminal />
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
