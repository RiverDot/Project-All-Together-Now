// @ts-ignore
import { route } from 'preact-router';

import { supabase } from "./supabaseClient";
import { useState } from 'preact/hooks';
import * as dayjs from 'dayjs'

export function TimePicker() {

    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [day, setDay] = useState('mon')

    function startTimeChange(e: any) {
        setStartTime(e.target.value);
    }

    function endTimeChange(e: any) {
        setEndTime(e.target.value);
    }

    function dayChange(e: any) {
        setDay(e.target.value);
    }

    async function addTime() {
        const { data: { user } } = await supabase.auth.getUser();
        const userID = user?.id


        let { data: profiles, error: readError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userID)

        if (readError) {
            console.error(readError)
        }

        // @ts-ignore
        let repating_times_start = profiles[0].repating_times_start
        // @ts-ignore
        let repating_times_end = profiles[0].repating_times_end

        repating_times_start[day].push(startTime)
        repating_times_end[day].push(endTime)

        const { error } = await supabase
            .from('profiles')
            .update({
                repating_times_start: repating_times_start,
                repating_times_end: repating_times_end
            })
            .eq('id', userID)

        if (error) {
            console.error(error)
        }

        console.log(repating_times_start)
        console.log(startTime)

        route('/')
    }

    function cancel() {
        route('/')
    }

    return (
        <>
            <div class={"flex flex-col justify-center text-center"}>
                <span class={"inline-block m-2"}>
                    <label for={"startTime"} class={"m-2 text-white"}> Start Time</label>
                    <input class={""} type="time" onChange={startTimeChange} id={"startTime"} />
                </span>
                <span class={"inline-block m-2"}>
                    <label for={"endTime"} class={"m-2 text-white"}>End Time</label>
                    <input class={""} type="time" onChange={endTimeChange} id={"endTime"} />
                </span>

                <select onChange={dayChange} class={"m-2"}>
                    <option value="mon">Monday</option>
                    <option value="tue">Tuesday</option>
                    <option value="wed">Wednesday</option>
                    <option value="thu">Thursday</option>
                    <option value="fri">Friday</option>
                    <option value="sat">Saturday</option>
                    <option value="sun">Sunday</option>
                </select>
            </div>
            <div class={"text-center inline-flex items-center"}>
                <button onClick={addTime} type="button" class={"bg-green-500"}>
                    Add
                </button>
                <button onClick={cancel} type="button" class={"bg-red-600"}>
                    Cancel
                </button>
            </div>
        </>
    )
}