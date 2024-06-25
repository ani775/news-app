import React, { Component } from 'react';

export class Newsitem extends Component {
    render() {
        const { title, description, imageUrl, link, author, date, source } = this.props;

        return (
            <div className='my-1'>
                <div className="card" style={{ width: '18rem' }}>
                    <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ left: '90%', zIndex: 1 }}
                    >
                        {source}
                    </span>

                    <img className="card-img-top" src={!imageUrl ? "https://www.livemint.com/lm-img/img/2024/06/18/1600x900/Heat_wave_1718716904326_1718716904529.jpg" : imageUrl} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
                        <a href={link} target='_blank' className="btn btn-primary">Read more</a>
                    </div>
                </div>
            </div >
        );
    }
}

export default Newsitem;
