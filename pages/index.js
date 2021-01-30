import Head from 'next/head'
import Layout from '../src/components/Layout'

export default function Home() {
  return (
    <>
      <Head>
        <title>True Sensei - Watch animes, movies and more!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <h1>Home</h1>
      </Layout>
    </>
  )
}
