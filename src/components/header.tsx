import React from "react";
import logoImage from "../images/logo.png";
import noImage from "../images/noImage.svg";
import { cancelMovieSearchToken, getGenres, getMoviesByKeyword, thumbnailPath } from "../helper";

interface Genre {
    id: number,
    name: string
}

interface SearchResult {
    id: number,
    poster_path: string,
    title: string,
    vote_average: number,
    release_date: string
}

const Header = () => {
    const node: any = React.useRef();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);
    const [openDropdown, setopenDropdown] = React.useState(false);
    const [genres, setGenres] = React.useState([] as Genre[]);
    const [searchResult, setSearchResult] = React.useState(null as SearchResult[]);
    const [searchResultLoading, setSearchResultLoading] = React.useState(false);
    const [showSearchResult, setShowSearchResult] = React.useState(false);

    React.useEffect(() => {
        getGenres().then((respone) => {
            setGenres(respone.data.genres.map((genre: any) => ({ id: genre.id, name: genre.name })));
        });
    }, []);

    const hideDropdown = () => {
        setopenDropdown(false);
    }
    const showDropdown = () => {
        setopenDropdown(true);
    }
    const toggleDropdown = () => {
        setopenDropdown(!openDropdown);
    }
    const toggleMobileSearchBox = () => {
        setMobileSearchBoxOpen(!mobileSearchBoxOpen);
        setShowSearchResult(false);
        setSearchResult(null);
    }
    const hamburgerButtonClickHandler = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    }

    const closeSearchResult = () => {
        cancelMovieSearchToken();
        setSearchResultLoading(false);
        setShowSearchResult(false);
        setSearchResult(null);
    }
    const handleOutSideClick = (e: any) => {
        if (!node.current.contains(e.target)) {
            closeSearchResult();
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
    return (
        <header className={`header ${mobileMenuOpen ? "open" : ""}`}>
            <div className={`overlay ${mobileMenuOpen ? "open" : ""}`}></div>
            <nav className="container container--pall flex flex-ai-c flex-jc-sb">
                <div className="flex flex-ai-c">
                    <a onClick={hamburgerButtonClickHandler} href="#" className="header__toggle hide-for-desktop">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                    <a href="/" className="header__logo">
                        <img src={logoImage} alt="FMovies" />
                    </a>

                    <div className="header__links hide-for-mobile flex flex-ai-c">
                        <div>
                            <a className="header__links__title" href="#">Home</a>
                        </div>
                        <div>
                            <a className="header__links__title" onMouseEnter={showDropdown} onMouseLeave={hideDropdown} href="#">Genre</a>
                            {openDropdown && <div onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className="header__links__dropdown">
                                {!!genres && genres.map((genre) => <a key={genre.id}>{genre.name}</a>)}
                            </div>}
                        </div>
                        <div>
                            <a className="header__links__title" href="#">Movies</a>
                        </div>
                        <div ref={node} className="header__searchBox">
                            <input onChange={searchBoxChange} placeholder="Enter your keywords..." />
                            <div className="header__searchBox__searchButton"></div>
                            {showSearchResult && <div className="header__searchBox__result">
                                {searchResultLoading && <div className="loading"></div>}
                                {!searchResultLoading && !!searchResult &&
                                    <div>
                                        {searchResult.map((movie) =>
                                            <div key={movie.id} onClick={() => console.log("click")} className="header__searchBox__result__item flex">
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
                    </div>
                </div>
                {!mobileSearchBoxOpen && !mobileMenuOpen && <div onClick={toggleMobileSearchBox} className="header__mobileSearchIcon hide-for-desktop"></div>}
            </nav>
            {mobileSearchBoxOpen && <div className="header__searchBox mobileSearchBox hide-for-desktop flex">
                <input onChange={searchBoxChange} placeholder="Enter your keywords..." />
                <div className="header__searchBox__searchButton" onClick={() => console.log("search")}></div>
                <div onClick={toggleMobileSearchBox} className="mobileSearchBox-close"></div>
                {showSearchResult && <div className="header__searchBox__result">
                    {searchResultLoading && <div className="loading"></div>}
                    {!searchResultLoading && !!searchResult &&
                        <div>
                            {searchResult.map((movie) =>
                                <div key={movie.id} className="header__searchBox__result__item flex">
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
            </div>}
            {mobileMenuOpen && <div className="header__menu container container--px hide-for-desktop">
                <div className="divider"></div>
                <a href="#">Home</a>
                <div className="divider"></div>
                <a onClick={toggleDropdown} >Genre<i className={`fa ${openDropdown ? "fa-minus" : "fa-plus"}`}></i></a>
                <div>
                    {openDropdown && <div className="header__links__mobileDropdown">
                        {!!genres && genres.map((genre) => <a className="link" key={genre.id}>{genre.name}</a>)}
                    </div>}
                </div>
                <div className="divider"></div>
                <a href="#">Movies</a>
                <div className="divider"></div>
            </div>}
        </header>
    );
};

export default Header;