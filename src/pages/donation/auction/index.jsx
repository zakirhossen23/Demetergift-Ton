import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom'
import { eventgetbyid } from '../../Events/event'
import { tokengetbyeventid } from '../../Events/token'

export default function Auction() {
    const { id } = useParams();

    const [eventId, setEventId] = useState(-1);
    const [list, setList] = useState([]);
    const [tokenName, setTokenName] = useState('');
    const [tokenSymbol, setTokenSymbol] = useState('');
    const [title, setTitle] = useState('');
    const [goalusd, setgoalusd] = useState('');
    const [goal, setgoal] = useState('');
    const [dateleft, setdateleft] = useState('');
    const [date, setdate] = useState('');
    const [dateleftBid, setdateleftBid] = useState('');
    const [logo, setlogo] = useState('');
    const [selectid, setselectid] = useState('');
    const [selecttitle, setselecttitle] = useState('');
    const [selecttype, setselecttype] = useState('');
    const [selectbid, setselectbid] = useState('');

    const [eventuri, setEventuri] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [ViewmodalShow, setViewModalShow] = useState(false);

    const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

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
    function LeftDateBid(datetext) {
        var c = new Date(datetext).getTime();
        var n = new Date().getTime();
        var d = c - n;
        var da = Math.floor(d / (1000 * 60 * 60 * 24));
        var h = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var m = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        var s = Math.floor((d % (1000 * 60)) / 1000);
        return (da.toString() + "d " + h.toString() + "h " + m.toString() + "m " + s.toString() + "s");
    }
    async function fetchContractData() {
        try {
            if (id) {
                setEventId(id);
                const value = await eventgetbyid(id);
                const arr = [];

                const totalTokens = await tokengetbyeventid(id);
                for (let i = 0; i < totalTokens.length; i++) {
                    const object = await totalTokens[i];

                    if (object.name) {
                        var pricedes1 = 0;
                        try { pricedes1 = formatter.format(Number(object.Bidprice * 3817.09)) } catch (ex) { }

                        arr.push({
                            Id: object.id,
                            name: object.name,
                            description: object.description,
                            Bidprice: pricedes1,
                            price: Number(object.price),
                            type: object.type,
                            image: object.image,
                        });
                    }

                }

                setList(arr);
                if (document.getElementById("Loading"))
                    document.getElementById("Loading").style = "display:none";


                setEventuri(value);


                setTitle(value.title);
                setgoalusd(formatter.format(Number(value.Goal * 3817.09)));
                setgoal(Number(value.Goal));
                setdateleft(LeftDate(value.endDate));
                setdate(value.endDate);
                setdateleftBid(LeftDateBid(value.endDate));
                setlogo(value.logolink);
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchContractData();

    }, []);

    setInterval(function () {
        calculateTimeLeft();
    }, 1000);


    function calculateTimeLeft() {
        try {
            var allDates = document.getElementsByName("dateleft");
            for (let i = 0; i < allDates.length; i++) {
                var date = (allDates[i]).getAttribute("date");
                allDates[i].innerHTML = LeftDate(date);
            }
            var allDates = document.getElementsByName("date");
            for (let i = 0; i < allDates.length; i++) {
                var date = (allDates[i]).getAttribute("date");
                allDates[i].innerHTML = LeftDateBid(date);
            }
        } catch (error) {

        }

    }

    function activateViewBidModal(e) {
        setselectid(e.target.getAttribute("tokenid"));
        setselecttitle(e.target.getAttribute("title"));

        setViewModalShow(true);
    }

    function activateBidNFTModal(e) {
        setselectid(e.target.getAttribute("tokenid"));

        setselectbid(e.target.getAttribute("highestbid"));
        console.log(selectbid);
        setselecttype("NFT");
        setModalShow(true);
    }
    function activateBidCryptopunkTModal(e) {
        setselectid(e.target.getAttribute("tokenid"));
        setselecttype("Cryptopunk");
        setselectbid(e.target.getAttribute("highestbid"));
        console.log(selectbid);

        setModalShow(true);
    }

    return (
        <>

            <div className="row EventContainer" >
                <div style={{
                    display: 'flex',
                    width: '100%'
                }}>
                    <img src={logo} className="AuctionImage" />
                    <div className="DetialsContainer">
                        <h4 style={{
                            fontSize: '2.5rem'
                        }} >{title}</h4>

                        <div className='TextContainer'>
                            <h4 style={{
                                fontSize: '2.5rem'
                            }}>Goal: </h4>
                            <h4 style={{
                                fontSize: '2.5rem'
                            }}>$ {goalusd} ({goal} ETH)</h4>
                        </div>
                        <div className='TextContainer'>
                            <h4 style={{
                                fontSize: '2.5rem'
                            }} name='dateleft' date={date}>{dateleft}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id='Loading' className="LoadingArea">
                <h1>Loading...</h1>
            </div>
            {list.map((listItem) => (
                <div key={listItem.Id} className="row ElementsContainer bgWhite">
                    <div style={{
                        width: '100%',
                        display: 'flex'
                    }}>
                        {listItem.type == "Cryptopunk" ? (
                            <img src={listItem.image} className="AuctionBidImage pixel" />
                        ) : (
                            <img src={listItem.image} className="AuctionBidImage" />
                        )}

                        <div style={{ width: "100%" }}>
                            <div className="DetialsContainer" style={{ rowGap: "5px" }} >
                                <h1 >{listItem.name}</h1>

                                <h4 style={{ color: "rgb(139, 139, 139)" }}>Type: {listItem.type}</h4>

                                <div className="TextContainer">
                                    <h4 style={{ color: "#8B8B8B" }}>{listItem.description}</h4>
                                </div>
                            </div>
                            <div className='ElementBottomContainer'>
                                <div style={{ width: "116px" }}>
                                    <h3 className="smallgrey">Current bid</h3>
                                    <h4 className='bidprice'>$ {listItem.Bidprice} ({listItem.price} ETH)</h4>
                                    <h7 name="date" date={date} className="smallgrey">{dateleftBid}</h7>
                                </div>
                                <div className='BidAllcontainer' >
                                    <div className='Bidsbutton'>
                                        <div tokenid={listItem.Id} title={listItem.name} onClick={activateViewBidModal} className="Bidcontainer col">
                                            <div tokenid={listItem.Id} title={listItem.name} className="card BidcontainerCard">
                                                <div tokenid={listItem.Id} title={listItem.name} className="card-body bidbuttonText">View</div>
                                            </div>
                                        </div>


                                        {listItem.type == "Cryptopunk" ? (
                                            <div tokenid={listItem.Id} highestbid={listItem.price} className="Bidcontainer col">
                                                <div tokenid={listItem.Id} highestbid={listItem.price} className="card BidcontainerCard">
                                                    <div tokenid={listItem.Id} highestbid={listItem.price} className="card-body bidbuttonText">Bid</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div tokenid={listItem.Id} highestbid={listItem.price} className="Bidcontainer col">
                                                <div tokenid={listItem.Id} highestbid={listItem.price} className="card BidcontainerCard">
                                                    <div tokenid={listItem.Id} highestbid={listItem.price} className="card-body bidbuttonText">Bid</div>
                                                </div>
                                            </div>
                                        )}

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </>
    );
}
