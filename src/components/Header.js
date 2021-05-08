import logo from '../images/header-logo.svg';

export function Header() {
    return (
        <header className="header">
            <img src={logo} alt="логотип Место" className="header__logo" />
        </header>
    )
}