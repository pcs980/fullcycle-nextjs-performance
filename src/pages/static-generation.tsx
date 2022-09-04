import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

type Props = {
  name: string;
}

export const StaticGenerationPage = (props: Props) => {
  return (
    <div>
      {props.name}
    </div>
  );
}

export default StaticGenerationPage;

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  return {
    props: {
      name: 'full cycle static generation'
    }
  }
}