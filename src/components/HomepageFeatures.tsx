/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import clsx from "clsx";
import styles from "./HomepageFeatures.module.css";

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    image: "/img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        Maze provides a robust, customizable, and accessible library of
        foundational and advanced components, enabling you to build your own
        design system and develop React applications faster.
      </>
    ),
  },
  {
    title: "Focus on What Matters",
    image: "/img/undraw_docusaurus_tree.svg",
    description: (
      <>
        Maze components work in isolation. They are self-supporting, and will
        only inject the styles they need to display. They don't rely on any
        global style-sheets.
      </>
    ),
  },
  {
    title: "Powered by React",
    image: "/img/undraw_docusaurus_react.svg",
    description: (
      <>
        Customize your website by reusing React. Maze can help your to develop
        your website faster and more efficient.
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} alt={title} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
  );
}
