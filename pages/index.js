import Link from 'next/link'
import Head from 'next/head'
import useSWR from 'swr'
import Layout from '../src/components/Layout'
import Hero from '../src/components/Hero'
import SliderCatalog from '../src/components/slider-catalog'

const API_BANNER_HERO = `https://kitsu.io/api/edge/trending/anime`
const API = `https://kitsu.io/api/edge/anime`
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home({ slideListData, BannerHeroContent, shounenListData, seinenListData, joseiListData, kidsListData, shoujoListData, categoriesFeatured }) {
  const { data: bannerHeroData } = useSWR(API_BANNER_HERO, fetcher, { initialData: BannerHeroContent})

  const shounenList = useSWR(`${API}?filter[categories]=shounen&page[limit]=20`, fetcher, { initialData: shounenListData })
  const seinenList = useSWR(`${API}?filter[categories]=seinen&page[limit]=20`, fetcher, { initialData: seinenListData })
  const joseiList = useSWR(`${API}?filter[categories]=josei&page[limit]=20`, fetcher, { initialData: joseiListData })
  const kidsList = useSWR(`${API}?filter[categories]=kids&page[limit]=20`, fetcher, { initialData: kidsListData })
  const shoujoList = useSWR(`${API}?filter[categories]=shoujo&page[limit]=20`, fetcher, { initialData: shoujoListData })

  // const { data } = useSWR(API, fetcher, { initialData: slideListData})

  return (
    <>
      <Head>
        <title>True Sensei - Watch animes, movies and more!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <Hero content={ bannerHeroData } />

        { categoriesFeatured ? categoriesFeatured.map((item, index) => (
          <div className="section-slider" key={index}>
            <div className="container">
              { typeof data !== 'undefined' && data.length? data.map(item => (
                item.id
              )) : null }
              <h2 className="section-title">
                <span>{ item.title }</span>
                <Link href={`/category/${item.slug}`}>
                  <a>See more</a>
                </Link>
              </h2>
            </div>
          
            <SliderCatalog carrousel={ true } trackId={ index } slides={ item.list.data } />
          </div>
        )) : null }
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const [
    slideListData,
    BannerHeroContent,
    joseiListData,
    kidsListData,
    seinenListData,
    shoujoListData,
    shounenListData
  ] = await Promise.all([
    fetcher(API),
    fetcher(API_BANNER_HERO),
    fetcher(`${API}?filter[categories]=josei&page[limit]=20`),
    fetcher(`${API}?filter[categories]=kids&page[limit]=20`),
    fetcher(`${API}?filter[categories]=seinen&page[limit]=20`),
    fetcher(`${API}?filter[categories]=shoujo&page[limit]=20`),
    fetcher(`${API}?filter[categories]=shounen&page[limit]=20`)
  ])

  const categoriesFeatured = [
    {
        title: 'Shounen',
        slug: 'shounen',
        list: shounenListData
    },
    {
        title: 'Seinen',
        slug: 'seinen',
        list: seinenListData
    },
    {
        title: 'Josei',
        slug: 'josei',
        list: joseiListData
    },
    {
        title: 'Kids',
        slug: 'kids',
        list: kidsListData
    },
    {
        title: 'Shoujo',
        slug: 'shoujo',
        list: shoujoListData
    },
  ]

  return {
    props: {
      slideListData,
      BannerHeroContent,
      shounenListData,
      seinenListData,
      joseiListData,
      kidsListData,
      shoujoListData,
      categoriesFeatured
    }
  }
}