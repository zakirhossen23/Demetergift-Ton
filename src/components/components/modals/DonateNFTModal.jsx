import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';
import { useRouter } from 'next/router';

export default function DonateNFTModal({
	show,
	onHide,
	contract,
	senderAddress,
	type,
	EventID,
	SelectedTitle,
	enddate
}) {

	const router = useRouter();

	console.log(contract);
	const [name, nameInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter name',
	});
	const [description, descriptionInput] = UseFormInput({
		as: 'textarea',
		placeholder: 'Enter description',
	});
	const [url, urlInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter image url',
	});
	const [NFTLogo, NFTLogoInput] = UseFormInput({
		defaultValue: "",
		type: 'file',
		placeholder: 'NFT Logo',
		id: 'logo',
	});
	const [price, priceInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter Price',
	});
	const [NFTaddress, NFTaddressInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter NFT address',
	});
	const [Cryptopunkaddress, CryptopunkaddressInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter Cryptopunk address',
	});

	async function createNFT() {
		let Logourl = url;
		var tokenAddress = NFTaddress;
		if ("Cryptopunk" == type) {
			tokenAddress = Cryptopunkaddress;
		}

		const createdObject = {
			title: 'Asset Metadata',
			type: 'object',
			properties: {
				name: {
					type: 'string',
					description: name,
				},
				description: {
					type: 'string',
					description: description,
				},
				image: {
					type: 'string',
					description: Logourl,
				},
				price: {
					type: 'string',
					description: price
				},
				typeimg: {
					type: 'string',
					description: type
				},
				nftaddress: {
					type: 'string',
					description: tokenAddress
				},
				higherbidadd: {
					type: 'string',
					description: ""
				},
				date: {
					type: 'string',
					description: enddate
				}
			},
			bids: []
		};
		console.log(createdObject);
		const result = await contract.claimToken(
			senderAddress,
			JSON.stringify(createdObject),
			EventID
		);
		router.push(`/donation/auction/${EventID}`);
		console.log(result);
		window.document.getElementsByClassName("btn-close")[0].click();

	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Donate {type} - {SelectedTitle}
				</Modal.Title>

			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Name</Form.Label>
						{nameInput}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formGroupDescription">
						<Form.Label>Description</Form.Label>
						{descriptionInput}
					</Form.Group>
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Opening price in ETH</Form.Label>
						{priceInput}
					</Form.Group>

					<Form.Group className="mb-3" controlId="formGroupImageUrl">
						<Form.Label>Enter image URL</Form.Label>
						{urlInput}
					</Form.Group>
					{(type == "Cryptopunk") ? (
						<Form.Group className="mb-3" controlId="formGroupImageUrl">
							<Form.Label>Cryptopunk address</Form.Label>
							{CryptopunkaddressInput}
						</Form.Group>
					) : (
						<Form.Group className="mb-3" controlId="formGroupImageUrl">
							<Form.Label>NFT address</Form.Label>
							{NFTaddressInput}
						</Form.Group>
					)

					}

					<div className="d-grid">
						<Button variant="primary" onClick={createNFT}>
							Donate {type}
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
