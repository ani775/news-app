import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
        totalResults: 0
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [], // Ensure articles is initialized as an empty array
            loading: true,
            page: 1,
            totalResults: 0 // Add totalResults to manage pagination properly
        };
        document.title = this.props.category;
    }

    fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: this.state.articles.concat(parsedData.articles || []), // Ensure articles is an array
            totalResults: parsedData.totalResults || 0,
            loading: false,
        });

    };

    async updatenews() {
        this.props.setprogress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setprogress(30);
        let parsedData = await data.json();
        this.props.setprogress(50);
        this.setState({
            articles: parsedData.articles || [], // Ensure articles is an array
            totalResults: parsedData.totalResults || 0,
            loading: false,
        });
        this.props.setprogress(100);

    }

    async componentDidMount() {
        //console.log('Category:', this.props.category);
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=383aed07fc084aab9bee1cc04da2a532&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({
        //     articles: parsedData.articles || [], // Ensure articles is an array
        //     totalResults: parsedData.totalResults || 0,
        //     loading: false
        // });
        this.updatenews();
    }

    handleprevclick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=383aed07fc084aab9bee1cc04da2a532&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parsedData = await data.json();

        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles || [],
        //     loading: false // Ensure articles is an array
        // });

        this.setState({
            page: this.state.page - 1,
        });
        this.updatenews();
    }

    handlenextclick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=383aed07fc084aab9bee1cc04da2a532&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({ loading: true });
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     //this.setState({ loading: false });
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles || [], // Ensure articles is an array
        //         loading: false
        //     });
        // }
        this.setState({
            page: this.state.page + 1,
        });
        this.updatenews();
    }

    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>This is a news component on {this.props.category}</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className='row'>
                        {this.state.articles.map((element) => (
                            <div className='col-md-3' key={element.url}>
                                <Newsitem
                                    title={element.title ? element.title : "Title not available"}
                                    description={element.description ? element.description : "Description not available"}
                                    imageUrl={element.urlToImage ? element.urlToImage : "https://via.placeholder.com/200x300"}
                                    link={element.url}
                                    author={element.author ? element.author : "Unknown"}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
                {/* Optional pagination buttons, kept for potential use */}
                {/* <div className='container d-flex justify-content-between'>
                    <button
                        disabled={this.state.page <= 1}
                        type='button'
                        className='btn btn-primary'
                        onClick={this.handlePrevClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
                        type='button'
                        className='btn btn-primary'
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div> */}
            </div>
        );
    }
}

export default News;
