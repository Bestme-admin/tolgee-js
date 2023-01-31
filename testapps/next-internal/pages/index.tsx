import type { NextPage } from 'next';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { T, Tolgee, TolgeeProvider } from '@tolgee/react';
import { InContextTools } from '@tolgee/web/tools';
import { useRouter } from 'next/router';

import enLocale from '../i18n/en.json';
import deLocale from '../i18n/de.json';
import styles from '../styles/Home.module.css';
import LocaleSwitcher from '../component/LanguageSwitcher';

const Home: NextPage = () => {
  const { locale: activeLocale } = useRouter();

  const router = useRouter();

  const apiKey =
    (router.query.api_key as string) || process.env.NEXT_PUBLIC_TOLGEE_API_KEY;

  const [tolgee] = useState(
    Tolgee()
      .use(InContextTools())
      .init({
        language: activeLocale,
        apiKey: apiKey,
        apiUrl: process.env.NEXT_PUBLIC_TOLGEE_API_URL,
        staticData: {
          en: enLocale,
          de: deLocale,
        },
      })
  );

  useEffect(() => {
    tolgee.updateOptions({ apiKey });
  }, [apiKey]);

  useEffect(() => {
    tolgee.changeLanguage(activeLocale!);
  }, [activeLocale]);

  return router.isReady ? (
    <TolgeeProvider tolgee={tolgee}>
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <LocaleSwitcher />

        <main className={styles.main}>
          <h1>
            <T>on-the-road-title</T>
          </h1>
        </main>
      </div>
    </TolgeeProvider>
  ) : null;
};

export default Home;
