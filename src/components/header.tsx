import React from "react";
import logoImage from "../images/logo.png";
import Search from "./search";
import { Link } from "react-router-dom";

interface Props {
    genres: { id: number, name: string }[]
}

const Header = (props: Props) => {
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
    const [mobileSearchBoxOpen, setMobileSearchBoxOpen] = React.useState(false);
    const [openDropdown, setopenDropdown] = React.useState(false);

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
                            <Link className="header__links__title" to="/">Home</Link>
                        </div>
                        <div>
                            <a className="header__links__title" onMouseEnter={showDropdown} onMouseLeave={hideDropdown} href="#">Genre</a>
                            {openDropdown && <div onMouseEnter={showDropdown} onMouseLeave={hideDropdown} className="header__links__dropdown">
                                {!!props.genres && props.genres.map((genre) => <Link to={`/Genres/${genre.id}`} key={genre.id}>{genre.name}</Link>)}
                            </div>}
                        </div>
                        <div>
                            <Link className="header__links__title" to="/Movies/Filter/Top">Movies</Link>
                        </div>
                        <Search />
                    </div>
                </div>
                {!mobileMenuOpen && <div onClick={toggleMobileSearchBox} className="header__mobileSearchIcon hide-for-desktop"></div>}
            </nav>
            {mobileSearchBoxOpen && <Search classNames="hide-for-desktop mobileSearchBox" />}
            {mobileMenuOpen && <div className="header__menu container container--px hide-for-desktop">
                <div className="divider"></div>
                <Link to="/">Home</Link>
                <div className="divider"></div>
                <a onClick={toggleDropdown} >Genre<i className={`fa ${openDropdown ? "fa-minus" : "fa-plus"}`}></i></a>
                <div>
                    {openDropdown && <div className="header__links__mobileDropdown">
                        {!!props.genres && props.genres.map((genre) => <Link className="link" to={`/Genres/${genre.id}`} key={genre.id}>{genre.name}</Link>)}
                    </div>}
                </div>
                <div className="divider"></div>
                <Link to="/Movies/Filter/Top">Movies</Link>
                <div className="divider"></div>
            </div>}
        </header>
    );
};

export default Header;