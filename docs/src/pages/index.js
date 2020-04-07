import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Less boilerplate</>,
    imageUrl: 'img/no-boilerplate-3.png',
    description: (
      <>
        Forget about endless <code>beforeEach</code> blocks full of redundant boilerplate. ng-vacuum automatically mocks and injects all dependencies.
      </>
    ),
  },
  {
    title: <>True isolation</>,
    imageUrl: 'img/vacuum-component.png',
    description: (
      <>
        Tests truly run in a vacuum. Service dependencies are mocked and child components are stubbed.
      </>
    ),
  },
  {
    title: <>Type Safety </>,
    imageUrl: 'img/no-undefined.png',
    description: (
      <>
        Gone are the hours lost tracking the root cause of a test failure. With an emphasis on type safety, ng-vacuum helps you pinpoint the cause of a failure in seconds.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className={classnames('text--center', styles.featureImageFrame)}>
          <img className={styles.featureImage} src={imgUrl} alt={title} />
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
      title={`Angular tests in a vacuum`}
      description="Description will go into a meta tag in <head />">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className={classnames('hero__title', styles.heroTitle)}>
            <img src="img/vacuum.svg" class={classnames(styles.heroImage)}/>
            Write <span class={classnames(styles.heroKeyword)}>maintainable</span> tests<br /> with less <span class={classnames(styles.heroKeyword)}>boilerplate</span>.
          </h1>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/setup')}>
              Get Started
            </Link>
            <div>
              <img alt="npm" src="https://img.shields.io/npm/v/ng-vacuum"></img>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.pitch}>
          <div className="container">
            <p>
              NgVacuum lets you test angular components and services in a vacuum, automatically mocking all of their dependencies.<br />
              Under the hood, it uses <a href="https://github.com/hmil/omnimock">OmniMock</a> to safely mock all constructor dependencies, and <a href="https://github.com/ike18t/ng-mocks">ng-mocks</a> to make the rendering <em>shallow</em>.
            </p>
          </div>
        </section>
        <div className={styles.pitchSeparator}></div>
        {features && features.length && (
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
