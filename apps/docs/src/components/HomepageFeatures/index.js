import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        Ansel was designed to be easy to use with a small number of endpoints
        that are clearly defined.
      </>
    )
  },
  {
    title: 'Easy to Setup',
    Svg: require('@site/static/img/project-setup.svg').default,
    description: (
      <>
        Ansel was also designed to be as easy as possible to set up. It uses
        Docker to create a reproducible environment for the server and get it
        up and running with a single command.
      </>
    )
  },
  {
    title: 'Extensible',
    Svg: require('@site/static/img/toolbox.svg').default,
    description: (
      <>
        Lastly, Ansel is extensible. You can add your own routes, plugins,
        or w/e else you'd like to add from the Koa ecosystem.
      </>
    )
  }
]

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
