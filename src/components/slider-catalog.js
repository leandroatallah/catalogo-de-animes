import { useState } from 'react'
import SliderItem from './slider-item'

import Icon from '@ant-design/icons';

const ChevronSvgLeft = () => (
    <svg width="18" height="32" fill="currentColor">
        <path d="M3.237 17.237v-2.474l14 14c.684.683.684 1.79 0 2.474a1.748 1.748 0 01-2.474 0l-14-14a1.748 1.748 0 010-2.474l14-14a1.748 1.748 0 012.474 0c.684.683.684 1.79 0 2.474l-14 14z" />
    </svg>
)
const ChevronSvgRight = () => (
    <svg width="18" height="32" fill="currentColor">
        <path d="M14.763 17.237v-2.474l-14 14a1.748 1.748 0 000 2.474c.683.684 1.79.684 2.474 0l14-14a1.748 1.748 0 000-2.474l-14-14A1.75 1.75 0 00.763 3.237l14 14z" />
    </svg>
)

const ChevronIconLeft = props => <Icon component={ChevronSvgLeft} {...props} />;
const ChevronIconRight = props => <Icon component={ChevronSvgRight} {...props} />;

const SliderCatalog = ({ slides, trackId, carrousel }) => {
    const [scrollAmount, setScrollAmount] = useState(0)

    const handleSlider = (add, trackId) => {
        const sliderTrack = document.querySelector(`#slider-track-${trackId}`)
        let trackLimit = sliderTrack.children[0].offsetWidth * sliderTrack.children.length
         
        let track = (add) ? scrollAmount + sliderTrack.offsetWidth - 160 : scrollAmount - sliderTrack.offsetWidth - 160

        if(track < 0) {
            track = 0
        }
        if(track > trackLimit) {
            track = trackLimit
        }
        
        setScrollAmount(track)

        sliderTrack.scrollTo({
            top: 0,
            left: track,
            behavior: 'smooth'
        });
    }

    return (
        <div className={`slider-catalog ${ carrousel ? 'carrousel-enabled' : '' }`}>
            { carrousel ? (
                <div className="slider-catalog__arrows">
                    <div className="arrow-button arrow-left">
                        <button onClick={() => handleSlider(false, trackId)}><ChevronIconLeft /></button>
                    </div>
                    <div className="arrow-button arrow-right">
                        <button onClick={() => handleSlider(true, trackId)}><ChevronIconRight /></button>
                    </div>
                </div>
            ) : null }
            <div className="slider-catalog__content">
                <ul className="slider-catalog__track" id={`slider-track-${trackId}`}>
                    { typeof slides !== 'undefined' && slides.length ? slides.map((item, index) => (
                        <li key={index}>
                            <SliderItem content={ item } />
                        </li>
                    )) : null }
                </ul>
            </div>
        </div>
    )
}

export default SliderCatalog
