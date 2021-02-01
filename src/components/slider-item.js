import { Typography } from 'antd'
const { Paragraph } = Typography
import Link from 'next/link'
import Date from './date'

const SliderItem = ({ content }) => {
    const {
        slug,
        canonicalTitle,
        averageRating,
        synopsis,
        startDate,
        posterImage,
    } = content.attributes

    return (
        <div className="slider-catalog__item">
            <div className="description-overlay">
                <h4>
                    { canonicalTitle }
                </h4>
                <ul>
                    <li>{
                        startDate ? (
                            <Date dateString={startDate} formatDate="yyyy" />
                        ) : null }
                    </li>
                    <li>{ averageRating || '0' }%</li>
                </ul>
                <Paragraph className="synopsis">
                    { synopsis }
                </Paragraph>

                <Link href={`/anime/${slug}`}>
                    <a className="more-info">More info</a>
                </Link>
            </div>

            <Link href={`/anime/${slug}`}>
                <a>
                    <img src={ posterImage.medium } />
                </a>
            </Link>
        </div>
    )
}

export default SliderItem
