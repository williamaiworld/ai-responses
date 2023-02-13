import React, { useState } from 'react';
import { isAPIKeyPopulated, getResponse } from './util';

export function App() {
    // state for input and output
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('some response');

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
        <h1>AI Responses</h1>
        {/* form with input and an area to display output from an api call */}
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={handleChange} />
            <button type="submit" disabled={!input}>Submit</button>

        </form>
        <div>
            <h2>Output</h2>
            <p>{output}</p>
        </div>
    </>
}
