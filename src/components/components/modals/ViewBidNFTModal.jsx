
import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Link from 'next/link';

import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import useContract from '../../services/useContract';



export default function ViewmodalShow({
	show,
	onHide,
	id,
	title
}) {
	const { contract, signerAddress } = useContract('ERC721');
	const router = useRouter();
	const [list, setList] = useState([]);

	function addZero(num) {
		return num < 10 ? `0${num}` : num;
	}
	function AmPM(num) {
		return num < 12 ? 'AM' : 'PM';
	}
	const formatter = new Intl.NumberFormat('en-US', {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	async function fetchContractData() {
		try {
			if (contract && id) {
				const value = await contract.tokenURI(id);
				console.log(value);
				const arr = [];
				const totalBids = await contract.getBidsSearchToken(id);
				console.log(totalBids);
				for (let i = 0; i < Number(10); i++) {
					const obj = await totalBids[i];
					const object = {};
					try { object = await JSON.parse(obj) } catch { }
					if (object.title) {
						var pricedes1 = 0;
						try { pricedes1 = formatter.format(Number(object.properties.bid.description * 3817.09)) } catch (ex) { }
						const BidId = Number(await contract.getBidIdByUri(obj));
						const Datetime = new Date(object.properties.time.description);

						let currentdate = `${addZero(Datetime.getDate())}/${addZero(Datetime.getMonth() + 1)}/${addZero(Datetime.getFullYear())} ${addZero(Datetime.getHours())}:${addZero(Datetime.getMinutes())}:${addZero(Datetime.getSeconds())} ${AmPM(Datetime.getHours())}`
						arr.push({
							Id: BidId,
							name: object.properties.username.description,
							time: currentdate,
							bidprice: object.properties.bid.description,
							bidpriceusd: pricedes1
						});
					}
				}
				console.log(arr);
				setList(arr);
				if (document.getElementById("Loading"))
					document.getElementById("Loading").style = "display:none";
				if (document.getElementById("Loadingtable")) {
					var element = document.getElementById("Loadingtable");
					element.style = "display:block";
					(element).setAttribute("id", "");
				}

			}
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchContractData();

	}, [router.query, contract]);

	return (
		<Modal
			show={show}
			onHide={onHide}
			onShow={fetchContractData}
			aria-labelledby="contained-modal-title-vcenter"
			size="xl"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					View Bid - {title}
				</Modal.Title>

			</Modal.Header>
			<Modal.Body className="show-grid">
				<div id='Loadingtable' style={{ display: 'none' }} className="">
					<div className='tableHeader'>
						<div className='tableHeaderContainer'>
							<div className='tableheaderDateContainer' >
								<h4 className="header">Date</h4>
							</div>
							<div className="tableheaderUserContainer" >
								<h4 className="header">User Name</h4>
							</div>
							<div className="tableheaderBidContainer" >
								<h4 className="header">Bid</h4>
							</div>
						</div>
					</div> {list.map((listItem) => (
						<div key={listItem.Id} className='tableFullRowContainer'>
							<div className='tableRowContainer'>
								<div className='tableRowCellContainer'>
									<div className='tableRowCellDateContainer'>
										<h5 className="cell">{listItem.time}</h5>
									</div>
									<div className='tableRowCellUserContainer'>
										<h5 className="cell">{listItem.name}</h5>
									</div>
									<div className="tableRowCellBidContainer">
										<h5 className="cell">${listItem.bidpriceusd} ({listItem.bidprice} ETH)</h5>
									</div>
								</div>
							</div>
						</div>))}
				</div>


			</Modal.Body>
		</Modal>
	);
}
