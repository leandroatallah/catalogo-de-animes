import { useState } from 'react'
import { Row, Col, Typography, Button } from 'antd'
const { Paragraph } = Typography
import useSWR from 'swr'
import Layout from '../../src/components/Layout'
import TrailerPopUp from '../../src/components/trailer-pop-up'
import Date from '../../src/components/date'
import Icon from '@ant-design/icons';

const PlaySvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 320.001 320.001">
        <path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
    </svg>
)

const PlayIcon = props => <Icon component={PlaySvg} {...props} />;

const API = `https://kitsu.io/api/edge/anime`
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Anime({ content, params }) {
    const { data } = useSWR(`${API}?filter[slug]=${params.slug}`, fetcher, { initialData: content})
    const {
        canonicalTitle,
        averageRating,
        description,
        startDate,
        posterImage,
        popularityRank,
        youtubeVideoId
    } = data.data[0].attributes

    const [showPopUp, setShowPopUp] = useState(false)

    const togglePopUp = () => {
        setShowPopUp(false)
    }

    return (
        <Layout>
            { showPopUp ? (
                <TrailerPopUp onClick={togglePopUp} video={ youtubeVideoId } />
            ) : null }

            <article className="single-wrapper">
                <div className="container">
                    <Row gutter={40}>
                        <Col xs={24} lg={{ span: 6, offset: 2 }}>
                            <Button type="primary" size="large" block={true} className="watch-trailer" onClick={() => setShowPopUp(!showPopUp)}>
                                <span><PlayIcon style={{ 'fontSize': '18px' }} /> Trailer</span>
                            </Button>
                            <img src={ posterImage.large } />
                        </Col>
                        <Col xs={24} lg={14}>
                            <h1 className="section-title section-title--single">{ canonicalTitle } <small>({ `${ popularityRank }º` })</small></h1>

                            <div className="meta-info">
                                <ul>
                                    <li><Date dateString={startDate} formatDate="yyyy" /></li>
                                    <li>Rating: { averageRating || '0' }%</li>
                                </ul>
                            </div>

                            <Paragraph className="description">
                                { description }
                            </Paragraph>
                        </Col>
                    </Row>
                </div>
            </article>
        </Layout>
    )
}

// export async function getStaticPaths() {
//     const paths = [{
//         params: {
//             slug: 'one-piece'
//         }
//     }]

//     return {
//       paths,
//       fallback: false
//     }
// }

export async function getServerSideProps({ params }) {
    const content = await fetcher(`${API}?filter[slug]=${params.slug}`)

    return {
        props: {
            content,
            params
        }
    }
}
