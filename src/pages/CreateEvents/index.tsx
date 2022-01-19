import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Observer } from 'mobx-react-lite';
import UseFormInput from '@/components/components/UseFormInput';
import proxy from 'http-proxy-middleware';
import { useIntl } from 'react-intl'

import {
    BuilderField,
    BuilderSubmitButton,
    BuilderTransaction,
} from '@/modules/Builder/components'


export default function CreateEvents() {

    const CreateEvent = async () => {
        try {
            const fetch = require('node-fetch');

            let url = 'http://localhost:8080/https://demetergift-database.vercel.app/api/create';

            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json, text/plain, */*'
                },
                body: `{"title":"${EventTitle}","description":"${EventDescription}","endDate":"${EventDate}","Goal":${EventGoal},"logolink":"${EventLogo}"}`
            };

            await fetch(url, options);
            window.location.href = `/donation`;
        } catch (error) {
            console.error(error);
        }
    };

    // Application initialization

    const [EventTitle, EventTitleInput] = UseFormInput({
        defaultValue: "",
        type: 'text',
        placeholder: 'Event Title',
        id: ''
    });
    const [EventDescription, EventDescriptionInput] = UseFormInput({
        defaultValue: "",
        type: 'text',
        placeholder: 'Event Description',
        id: ''
    });
    const [EventDate, EventDateInput] = UseFormInput({
        defaultValue: "",
        type: 'datetime-local',
        placeholder: 'Event End Date ',
        id: 'enddate',
    });
    const [EventGoal, EventGoalInput] = UseFormInput({
        defaultValue: "",
        type: 'text',
        placeholder: 'Event Goal in EVER',
        id: 'goal',
    });
    const [EventLogo, EventLogoInput] = UseFormInput({
        defaultValue: "",
        type: 'text',
        placeholder: 'Event Logo Link',
        id: 'logo'
    });

    return (
        <><>

            <Row>

                <Col >
                    <div style={{ width: "500px", background: "transparent", padding: "19px", borderRadius: "4px", height: "100%", border: "white solid" }}>
                        <div style={{ margin: "0px 0px 30px 0px" }}>
                            <h1>Create Event</h1>
                        </div>

                        <div style={{ margin: "18px 0" }}>
                            <h4>Event Title</h4>
                            {EventTitleInput}
                        </div>

                        <div style={{ margin: "18px 0" }}>
                            <h4>Event Description</h4>
                            {EventDescriptionInput}
                        </div>
                        <div style={{ margin: "18px 0" }}>
                            <h4>Event End Date</h4>
                            {EventDateInput}
                        </div>
                        <div style={{ margin: "18px 0" }}>
                            <h4>Event Goal</h4>
                            {EventGoalInput}
                        </div>
                        <div style={{ margin: "18px 0" }}>
                            <h4>Event Logo Link</h4>
                            {EventLogoInput}
                        </div>

                        <Button style={{ margin: "17px 0 0px 0px", width: "100%" }} onClick={CreateEvent}>
                            Create Event
                        </Button>
                    </div>
                </Col>

            </Row>

        </></>
    );
}
