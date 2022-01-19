import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';
import { useCreateTokenForm } from '@/modules/Builder/hooks/useCreateTokenForm'
import { useCreateTokenStore } from '@/modules/Builder/stores/CreateTokenStore'
import { useWallet } from '@/stores/WalletService'

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
	const wallet = useWallet()

	const creatingTokenForm = useCreateTokenForm()

	function activateWarningModal() {
		var alertELM = document.getElementById("alert");
		alertELM.style = 'contents';
		setAlert(`Amount cannot be under ${Highestbid} EVER`)
	}
	async function bidNFT() {
		if (Number(Amount) < Number(Highestbid)) {
			activateWarningModal();
			return;
		}
		const creatingToken = useCreateTokenStore()
		creatingToken.changeData('decimals', Number(Amount) * 1000000000);
		var buttonProps = document.getElementById("")
		console.log(creatingToken.decimals);
		if (!wallet.account) {
			buttonProps.innerText = "Connect to wallet"
			await wallet.connect();
		}
		if (creatingToken.decimals != null) {

			await creatingToken.createToken();
		}



		console.log(` given ${Amount} highest => ${Highestbid}`)


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
						<Form.Label>Bid Amount in EVER</Form.Label>
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
