import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router";
import { useState } from "preact/hooks";
import dispatchEvent, { eventsToDispatch } from "../../utils/events";
import * as style from "./style.css";

interface HeaderProps {
    counter: any;
}

const Header: FunctionalComponent<HeaderProps> = (props) => {


    const isBPAY = window.location.pathname.includes('bpay');

    const onSettingsClick = (color: string) => {
        dispatchEvent(eventsToDispatch.HOST_THEME_CHANGED, {color});
    }

    return (
        <header class={style.header}>
            <a href="/"><h1>Host Preact App</h1></a>
            <span className={style.light} onClick={() => {onSettingsClick('#00abff')}}><img src='../../assets/icons/settings.svg'></img></span>
            <span className={style.dark} onClick={() => {onSettingsClick('#ff6000')}}><img src='../../assets/icons/settings.svg'></img></span>
            <nav>
                <a className={isBPAY ? style.active: ''} href="/bpay">
                    BPAY
                </a>
                <span className={style.counterSpan}>{props.counter}</span>
            </nav>
        </header>
    );
};

export default Header;
