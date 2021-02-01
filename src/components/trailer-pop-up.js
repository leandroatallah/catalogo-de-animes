const TrailerPopUp = ({ video, onClick }) => {
    return (
        <div className="trailer-pop-up" onClick={onClick}>
            <iframe width="560" height="315" src={`https://www.youtube.com/embed/${ video }`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
    )
}

export default TrailerPopUp
