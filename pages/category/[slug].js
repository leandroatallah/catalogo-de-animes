import { useEffect } from 'react'
import useSWR from 'swr'
import Layout from '../../src/components/Layout'
import SliderCatalog from '../../src/components/slider-catalog'
import Hero from '../../src/components/Hero'
import categories from '../../lib/categories'

const API = `https://kitsu.io/api/edge/anime`
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Category({ slideListData, params }) {
    const { data } = useSWR(`${API}?filter[categories]=${params.slug}&page[limit]=20`, fetcher, { initialData: slideListData})

    useEffect(() => {
    }, [slideListData])

    const category = categories.filter(item => {
        return item.slug == params.slug
    })

    return (
        <Layout>
            <Hero content={ data } category={ category } />

            <div className="section-slider">
                <div className="container">
                    { typeof data !== 'undefined' && data.length? data.map(item => (
                        item.id
                    )) : null }
                
                    <SliderCatalog carrousel={ false } trackId="1" slides={ data.data } />
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = []
    categories.map(item => {
        paths.push(
            {
                params: {
                    slug: item.slug
                }
            }
        )
    })

    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const slideListData = await fetcher(`${API}?filter[categories]=${params.slug}&page[limit]=20`)

    return {
        props: {
            slideListData,
            params
        },
        revalidate: 1
    }
}
