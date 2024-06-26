import React, { useEffect, useState } from 'react';

import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setprogress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setprogress(30);
        let parsedData = await data.json();
        props.setprogress(70);

        // Ensure parsedData.articles is an array
        if (Array.isArray(parsedData.articles)) {
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
        } else {
            setArticles([]); // Reset articles if the response is invalid
        }
        setLoading(false);
        props.setprogress(100);
    };

    useEffect(() => {
        updateNews();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.category, props.country]); // Dependencies to refetch on category or country change

    const handlePrevClick = async () => {
        setPage(page - 1);
        updateNews();
    };

    const handleNextClick = async () => {
        setPage(page + 1);
        updateNews();
    };

    const fetchMoreData = async () => {
        const nextPage = page + 1; // Calculate next page before setting state
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        // Ensure parsedData.articles is an array before concatenation
        if (Array.isArray(parsedData.articles)) {
            setArticles(prevArticles => prevArticles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
            setPage(nextPage); // Update page state after successful fetch
        }
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px' }}>
                NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => (
                            <div className="col-md-4" key={element.url}>
                                <Newsitem
                                    title={element.title || "No Title"}
                                    description={element.description || "No Description"}
                                    imageUrl={element.urlToImage || "https://via.placeholder.com/200x300"}
                                    newsUrl={element.url}
                                    author={element.author || "Unknown"}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );
};

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apikey: PropTypes.string.isRequired,
    setprogress: PropTypes.func.isRequired
};

export default News;
