import React, { useState } from 'react';
import { isAPIKeyPopulated, getResponse } from './util';

export function App() {
    // state for input and output
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('response will show here');

    // function to handle input change
    const handleChange = (e) => {
        setInput(e.target.value);
    }

    // function to handle form submit
    const handleSubmit = async (e) => {
        try {
            // empty input
            if (!input) {
                alert('Please enter a prompt');
                return;
            }
            // prevent default form behavior
            e.preventDefault();
    
            // call api and set output
            const output = await getResponse(input);
    
            // empty api response
            if (!output) {
                alert('Something went wrong');
                return;
            }
            setOutput(output);
        } catch (error) {
            alert('Something went wrong: ' + error.message);
        }

    }

    if (!isAPIKeyPopulated) return (<>
        <h1>AI Responses</h1>
        <p>Please add your API key to .env file</p>
    </>);

    return <>
        {/* title */}
        <h1>AI Responses</h1>
        {/* form with input and an area to display output from an api call */}
        <form onSubmit={handleSubmit}>
            <label htmlFor="prompt">Prompt</label>
            <input type="text" value={input} onChange={handleChange} />
            <div id="controls">
                <button type="reset" onClick={() => setInput('')}>Clear</button>
                <button type="submit" disabled={!input}>Submit</button>
            </div>
        </form>
        <div>
            <h2>Output</h2>
            <p id="response-box">{output}</p>
        </div>
    </>
}
