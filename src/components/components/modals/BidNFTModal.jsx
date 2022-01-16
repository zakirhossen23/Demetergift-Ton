import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';

export default function BidNFTModal({
	show,
	onHide,
	contract,
	senderAddress,
	tokenId,
	eventId,
	type,
	Highestbid

}) {
	const [Alert, setAlert] = useState('');
	const [Amount, AmountInput] = UseFormInput({
		type: 'text',
		placeholder: 'Amount',
	});


	function activateWarningModal() {
		var alertELM = document.getElementById("alert");
		alertELM.style = 'contents';
		setAlert(`Amount cannot be under ${Highestbid} ETH`)
	}
	async function bidNFT() {
		if (Amount < Highestbid) {
			activateWarningModal();
			return;
		}
		const tokenUri = await contract.tokenURI(tokenId);
		var parsed = await JSON.parse(tokenUri);
		if (Number(parsed['properties']['price']['description']) < Number(Amount)) {
			parsed['properties']['price']['description'] = Amount;
			parsed['properties']['higherbidadd']['description'] = senderAddress;

		}
		let currentDate = new Date();
		const createdObject = {
			title: 'Asset Metadata Bids',
			type: 'object',
			properties: {
				username: {
					type: 'string',
					description: senderAddress
				},
				bid: {
					type: 'string',
					description: Amount
				},
				time: {
					type: 'string',
					description: currentDate
				}
			}
		};
		const result = await contract.createBid(tokenId, JSON.stringify(createdObject), JSON.stringify(parsed), eventId);


		console.log(result);
		window.document.getElementsByClassName("btn-close")[0].click();
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				{(type == "Cryptopunk") ? (
					<Modal.Title id="contained-modal-title-vcenter">
						Bid Cryptopunk
					</Modal.Title>) : (
					<Modal.Title id="contained-modal-title-vcenter">
						Bid NFT
					</Modal.Title>
				)}
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<div id='alert' style={{ display: 'none' }} className="alert alert-danger" role="alert">
						{Alert}
					</div>
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Bid Amount in ETH</Form.Label>
						{AmountInput}
					</Form.Group>
					<div className="d-grid">

						{(type == "Cryptopunk") ? (
							<Button variant="primary" onClick={bidNFT}>
								Bid Cryptopunk
							</Button>) : (
							<Button variant="primary" onClick={bidNFT}>
								Bid NFT
							</Button>
						)}
					</div>
				</Form>
			</Modal.Body>

		</Modal>

	);
}
