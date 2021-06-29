import React from "react";
import noImage from "../images/noImage.svg";
import { cancelMovieSearchToken, getMoviesByKeyword, thumbnailPath } from "../helper";
import { useHistory } from "react-router-dom";

interface Props {
    classNames?: string
}

interface SearchResult {
    id: number,
    poster_path: string,
    title: string,
    vote_average: number,
    release_date: string
}

const Search = (props: Props) => {
    const node: any = React.useRef();
    const [searchResult, setSearchResult] = React.useState(null as SearchResult[]);
    const [searchResultLoading, setSearchResultLoading] = React.useState(false);
    const [showSearchResult, setShowSearchResult] = React.useState(false);
    const history = useHistory();

    const closeSearchResult = () => {
        cancelMovieSearchToken();
        setSearchResultLoading(false);
        setShowSearchResult(false);
        setSearchResult(null);
    }

    const handleOutSideClick = (e: MouseEvent) => {
        try {
            if (!node.current.contains(e.target)) {
                closeSearchResult();
                document.removeEventListener("click", handleOutSideClick, false);
            }
        }
        catch (error) {
            document.removeEventListener("click", handleOutSideClick, false);
        }
    }

    const searchBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        if (keyword.trim().length !== 0) {
            setSearchResultLoading(true);
            setShowSearchResult(true);
            getMoviesByKeyword(keyword).then((response) => {
                const result: SearchResult[] = response.data.results;
                setSearchResultLoading(false);
                setShowSearchResult(true);
                setSearchResult(result.slice(0, 5));
                document.addEventListener("click", handleOutSideClick, false);
            });
        }
        else {
            closeSearchResult();
        }
    }

    const redirectToMovie = (id: number) => {
        closeSearchResult();
        history.push(`/movies/${id}`);
    }

    return (
        <div ref={node} className={`searchBox ${props.classNames ? props.classNames : ''}`}>
            <input onChange={searchBoxChange} placeholder="Enter your keywords..." />
            <div className="searchBox__searchButton"></div>
            {showSearchResult && <div className="searchBox__result">
                {searchResultLoading && <div className="loading"></div>}
                {!searchResultLoading && !!searchResult &&
                    <div>
                        {searchResult.map((movie) =>
                            <div key={movie.id} onClick={() => redirectToMovie(movie.id)} className="searchBox__result__item flex">
                                <img width="60" height="90" src={movie.poster_path === null ? noImage : `${thumbnailPath}/${movie.poster_path}`} />
                                <div>
                                    <a>{movie.title}</a>
                                    <small><i className="far fa-calendar-alt"></i> {movie.release_date}</small>
                                    <small><i className="fas fa-star"></i> {movie.vote_average}</small>
                                </div>
                            </div>
                        )}
                    </div>}
            </div>}
        </div>
    );
}

export default Search;