import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import DonateNFTModal from '../../components/components/modals/DonateNFTModal';

export default function Donation() {
    const [CreatemodalShow, setModalShow] = useState(false);

    const [list, setList] = useState([]);
    const [selectid, setselectid] = useState('');
    const [selectedtype, setselectedtype] = useState('');
    const [SelectedTitle, setSelectedTitle] = useState('');
    const [SelectedendDate, setSelectedendDate] = useState('');


    useEffect(() => {
        fetchContractData();
    }, []);

    function calculateTimeLeft() {
        try {
            var allDates = document.getElementsByName("DateCount");
            for (let i = 0; i < allDates.length; i++) {
                var date = (allDates[i]).getAttribute("date");
                allDates[i].innerHTML = LeftDate(date);
            }
        } catch (error) {

        }

    }
    setInterval(function () {
        calculateTimeLeft();
    }, 1000);
    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    async function fetchContractData() {

        try {

            const fetch = require('node-fetch');

            let url = 'http://localhost:8080/https://demetergift-database.vercel.app/api/events';

            let options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json, text/plain, */*'
                },
            };
            var allEvents;
            await fetch(url, options).then(res => res.json())
                .then(json => allEvents = json)
                .catch(err => console.error('error:' + err));

            console.log(allEvents);
            const totalEvent = allEvents.length;
            const arr = [];
            for (let i = 0; i < Number(totalEvent); i++) {
                const value = allEvents[i];
                console.log(value);
                if (value) {
                    var pricedes1 = 0;
                    try { pricedes1 = Number(value.Goal * 3817.09) } catch (ex) { }

                    arr.push({
                        eventId: value.id,
                        Title: value.title,
                        Date: value.endDate,
                        Goalusd: formatter.format(pricedes1),
                        Goal: value.Goal,
                        logo: value.logolink,
                    });
                }
                console.log(value);
            }

            setList(arr);
            document.getElementById("Loading").style = "display:none";
            console.log(arr);
        } catch (error) {
            console.error(error);
        }
    }
    function activateCreateNFTModal(e) {
        setselectid(e.target.getAttribute("eventid"));
        setSelectedTitle(e.target.getAttribute("eventtitle"));
        setSelectedendDate(e.target.getAttribute("date"));
        setselectedtype("NFT");

        setModalShow(true);
    }

    function activateCreateCryptopunkModal(e) {
        setselectid(e.target.getAttribute("eventid"));
        setSelectedTitle(e.target.getAttribute("eventtitle"));
        setSelectedendDate(e.target.getAttribute("date"));
        setselectedtype("Cryptopunk");

        setModalShow(true);
    }


    function LeftDate(datetext) {
        var c = new Date(datetext).getTime();
        var n = new Date().getTime();
        var d = c - n;
        var da = Math.floor(d / (1000 * 60 * 60 * 24));
        var h = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((d % (1000 * 60)) / 1000);
        return (da.toString() + " Days " + h.toString() + " hours " + m.toString() + " minutes " + s.toString() + " seconds");
    }

    return (
        <>

            <div className='row DonationBar'>
                <NavLink to='?q=All'>
                    <a className='DonationBarLink active'>
                        All
                    </a>
                </NavLink>
                <NavLink to='?q=Today'>
                    <a className='DonationBarLink'>
                        Today
                    </a>
                </NavLink>
                <NavLink to='?q=This Month'>
                    <a className='DonationBarLink'>
                        This Month
                    </a>
                </NavLink>
            </div>
            <div id='Loading' className="LoadingArea">
                <h1>Loading...</h1>
            </div>


            {list.map((listItem) => (
                <div key={listItem.eventId} className='row' style={{ height: "397px", margin: "28px", background: "white", color: "black", overflow: "hidden", padding: 0, }}>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        padding: '0 17px'
                    }}><h4 style={{
                        fontSize: '2.5rem',
                        float: 'left'
                    }} name="DateCount" date={listItem.Date}>{LeftDate(listItem.Date)}</h4></div>
                    <div style={{
                        display: 'flex',
                        width: '100%',
                        padding: '0 18px'
                    }}>
                        <img src={listItem.logo} style={{ maxHeight: "270px", minWidth: "284px" }} />
                        <div style={{
                            "paddingTop": "33px",
                            "marginLeft": "82px",
                            display: "flex",
                            "flexDirection": "column",
                            width: "100%",
                            "rowGap": "10px"
                        }}>
                            <h4 style={{ fontSize: '2.5rem' }}>{listItem.Title}</h4>
                            <div style={{ display: "flex", "whiteSpace": "pre-wrap" }}>
                                <h4 style={{ fontSize: '2.5rem' }}>Goal:  </h4>
                                <h4 style={{ fontSize: '2.5rem' }}>${listItem.Goalusd} ({listItem.Goal} ETH)</h4>
                            </div>

                            <div style={{
                                display: 'flex',
                                height: '20px',
                                float: 'right',
                                marginLeft: '0px',
                                flexDirection: 'column'

                            }}>
                                <div className="card" style={{ "height": "100%", border: "0px" }}></div>
                                <div style={{ "display": "flex", gap: "14px" }}>

                                    <div style={{
                                        color: 'white',
                                        overflow: 'hidden',
                                        background: 'rgb(0, 222, 205)',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        height: '72px',
                                        float: 'right',
                                        padding: '0px'
                                    }} eventid={listItem.eventId} date={listItem.Date} eventtitle={listItem.Title} className="card" onClick={activateCreateNFTModal}>
                                        <div eventid={listItem.eventId} date={listItem.Date} eventtitle={listItem.Title} className="card-body" style={{
                                            height: '100%',
                                            paddingTop: '13%'
                                        }}>
                                            Donate NFT
                                        </div>
                                    </div>
                                    <div style={{
                                        color: 'white',
                                        overflow: 'hidden',
                                        background: 'rgb(0, 222, 205)',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        height: '100%',
                                        float: 'right',
                                        padding: '0',
                                    }} eventid={listItem.eventId} onClick={activateCreateCryptopunkModal} date={listItem.Date} eventtitle={listItem.Title} className="card" >
                                        <div eventid={listItem.eventId} date={listItem.Date} eventtitle={listItem.Title} className="card-body" style={{
                                            height: '100%',
                                            paddingTop: '13%'
                                        }}>
                                            Donate Cryptopunk
                                        </div>
                                    </div>

                                    <div style={{
                                        color: 'white',
                                        overflow: 'hidden',
                                        background: 'rgb(0, 222, 205)',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        height: '100%',
                                        float: 'right',
                                        padding: '0',
                                    }} className="card" >
                                        <NavLink to={`/donation/auction/${listItem.eventId}`}>

                                            <div className="card-body" style={{
                                                height: '100%',
                                                paddingTop: '13%'
                                            }}>
                                                Go to auction
                                            </div>
                                        </NavLink>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            ))}
            <DonateNFTModal
                show={CreatemodalShow}
                onHide={() => {
                    setModalShow(false);
                    // This is a poor implementation, better to implement an event listener
                }}
                EventID={selectid}
                type={selectedtype}
                SelectedTitle={SelectedTitle}
                enddate={SelectedendDate}
            />
        </>
    );
}
