import React from "react";
import logoImage from "../images/logo.png";
import noImage from "../images/noImage.svg";
import { getGenres } from "../helper";
import Search from "./search";

interface Genre {
    id: number,
    name: string
}

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);
    const [openDropdown, setopenDropdown] = React.useState(false);
    const [genres, setGenres] = React.useState([] as Genre[]);

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
    }
    const hamburgerButtonClickHandler = () => {
        setMobileMenuOpen(!mobileMenuOpen);
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
                        <Search />
                    </div>
                </div>
                {!mobileMenuOpen && <div onClick={toggleMobileSearchBox} className="header__mobileSearchIcon hide-for-desktop"></div>}
            </nav>
            {mobileSearchBoxOpen && <Search classNames="hide-for-desktop mobileSearchBox"/>}
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