import { useState } from 'react'
import Link from 'next/link'
import { Typography, Button, Row, Col } from 'antd'
import TrailerPopUp from './trailer-pop-up'
const { Paragraph } = Typography
import Icon from '@ant-design/icons';

const PlaySvg = () => (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 320.001 320.001">
        <path d="M295.84,146.049l-256-144c-4.96-2.784-11.008-2.72-15.904,0.128C19.008,5.057,16,10.305,16,16.001v288
c0,5.696,3.008,10.944,7.936,13.824c2.496,1.44,5.28,2.176,8.064,2.176c2.688,0,5.408-0.672,7.84-2.048l256-144
c5.024-2.848,8.16-8.16,8.16-13.952S300.864,148.897,295.84,146.049z"/>
    </svg>
)

const PlayIcon = props => <Icon component={PlaySvg} {...props} />;

const Hero = ({ content, category }) => {
    const {
        slug,
        canonicalTitle,
        synopsis,
        coverImage,
        posterImage,
        youtubeVideoId
    } = content.data[0].attributes

    const [showPopUp, setShowPopUp] = useState(false)

    const categoryTitle = category ? category[0].title : false

    const togglePopUp = () => {
        setShowPopUp(false)
    }

    return (
        <>
            { showPopUp ? (
                <TrailerPopUp onClick={togglePopUp} video={ youtubeVideoId } />
            ) : null }
            <div style={{ 'backgroundImage': `url(${ coverImage ? coverImage.large : posterImage.large  })` }} 
                className={`banner-hero ${category ? 'banner-hero--slim' : ''}`}
                >
                <div className="container">
                    { categoryTitle ? (
                        <h1 className="section-title section-title--single section-title--center">{ categoryTitle }</h1>
                    ) : (
                        <div className="banner-hero__caption">
                            <h1>{ canonicalTitle } </h1>
                            <Paragraph ellipsis={{ rows: 3 }} className="banner-hero__synopsis">
                                { synopsis }
                            </Paragraph>

                            <Row gutter="15">
                                <Col>
                                    <Button type="primary" size="large" className="banner-hero__button" onClick={() => setShowPopUp(!showPopUp)}>
                                        <span><PlayIcon style={{ 'fontSize': '18px' }} /> Trailer</span>
                                    </Button>
                                </Col>
                                <Col>
                                    <Link href={`/anime/${slug}`}>
                                        <a>
                                            <Button type="default" size="large" className="banner-hero__button">More information</Button>
                                        </a>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    ) }
                </div>
            </div>
        </>
    )
}

export default Hero
