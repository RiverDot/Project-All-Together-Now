// @ts-nocheck
import { render } from 'preact'
import Router from 'preact-router';

import { App } from './app.tsx'
import { AuthMenu } from "./auth"
import { DateTimePicker } from './datePicker.tsx';
import { TimePicker } from './timePicker.tsx';
//import { EditTime } from './editTime.tsx';

import { ReloadPrompt } from './ReloadPrompt.tsx'

import './index.css'

const Main = () => (
    <>
    <ReloadPrompt />
    <Router>
        <App path="/" />
        <DateTimePicker path="/date" />
        <TimePicker path="/time" />
        {/*<EditTime path="/edit-time" />*/}
        <AuthMenu path="/auth" />
    </Router></>
);

render(<Main />, document.getElementById('app') as HTMLElement)
