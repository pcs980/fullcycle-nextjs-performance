import { GetStaticProps, GetStaticPropsContext } from 'next';
import * as React from 'react';

type Props = {
  date: string;
}

export const IncrementalGenerationPage = (props: Props) => {
  return (
    <div>
      {props.date}
    </div>
  );
}

export default IncrementalGenerationPage;

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  return {
    props: {
      date: new Date().toISOString()
    },
    revalidate: 10
  }
}
