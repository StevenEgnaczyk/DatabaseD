import React from "react";

import './AboutPage.css'
import {BsChevronCompactUp} from "react-icons/bs";

function AboutPage({openInfoComponent}) {
    return (
        <div className={'about-page-container'}>
            <BsChevronCompactUp onClick={openInfoComponent} className={'arrow-up-icon'}/>
            <h1 className={'about-page-header'}>About DataBaseD</h1>
            <div className={'about-info'}>
                <div className={'profile-grid'}>
                    <div className={'profile-container'}>
                        <img className={'profile-image'} src={'./sir-steven.jpeg'} alt=""/>
                        <div className={'profile-text'}>
                            <h3 className={'profile-name'}>Sir Stevyn of Eldorvale</h3>
                            <p className={'profile-desc'}>A brave knight known for his valor in battle and unwavering loyalty to his kingdom, hailing from the mist-covered lands of Eldorvale.</p>
                        </div>
                    </div>
                    <div className={'profile-container'}>
                        <img className={'profile-image'} src={'./adam.png'} alt=""/>
                        <div className={'profile-text'}>
                            <h3 className={'profile-name'}>Adamus Haikalon, the Steelhand</h3>
                            <p className={'profile-desc'}>A legendary warrior whose unmatched strength and mastery of the blade have earned him the title "Steelhand," protector of the realm’s borders.</p>
                        </div>
                    </div>
                    <div className={'databased-desc-box'}>
                        <h2>What is DataBaseD?</h2>
                        <p>DataBaseD is a tool for students to download and share documents for all assignments Ohio State related.
                            DataBaseD makes it easy to upload documents with the proper tags needed to help users find what they are looking for.
                        </p>
                        <img className={'preview-img'} src={'./preview.png'} alt=""/>
                    </div>
                    <div className={'profile-container'}>
                        <img className={'profile-image'} src={'./kellen.png'} alt=""/>
                        <div className={'profile-text'}>
                            <h3 className={'profile-name'}>Kellen Garithorne, Warden of the Wilds</h3>
                            <p className={'profile-desc'}>Protector of the untamed forests, Kellen Garithorne is a fierce defender of nature’s balance and a skilled hunter of shadowed creatures.</p>
                        </div>
                    </div>
                    <div className={'profile-container'}>
                        <img className={'profile-image'} src={'./jake.png'} alt=""/>
                        <div className={'profile-text'}>
                            <h3 className={'profile-name'}>Jakob Myrwyn of the Northreach</h3>
                            <p className={'profile-desc'}>A master tactician from the icy Northern lands, Jakob Myrwyn is known for his fearsome prowess in both war and diplomacy.</p>
                        </div>
                    </div>
                    <div className={'profile-container'}>
                        <img className={'profile-image'} src={'./will.png'} alt=""/>
                        <div className={'profile-text'}>
                            <h3 className={'profile-name'}>Wilhelm LeMont, the Golden</h3>
                            <p className={'profile-desc'}>A charismatic noble whose golden-hearted nature and sharp wit earned him a revered place in the royal court and the affection of many allies.</p>
                        </div>
                    </div>
                    <div className={'profile-container'}>
                        <img className={'profile-image'} src={'./matt.png'} alt=""/>
                        <div className={'profile-text'}>
                            <h3 className={'profile-name'}>Matheus Blumenthorne, the Verdant Knight</h3>
                            <p className={'profile-desc'}>A noble defender of the realm, Matheus is celebrated for his deep connection to the forests and his commitment to preserving the land’s natural beauty.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AboutPage