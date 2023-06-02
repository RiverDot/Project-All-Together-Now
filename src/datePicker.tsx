// @ts-ignore
import { route } from 'preact-router';

import { supabase } from "./supabaseClient";
import { useState } from 'preact/hooks';
import dayjs from 'dayjs';

export function DateTimePicker() {

    const [startDate, setStartDate] = useState(new Date)
    const [endDate, setEndDate] = useState(new Date)

    function handleStartChange(e: any) {
        setStartDate(e.target.value);
    }

    function handleEndChange(e: any) {
        setEndDate(e.target.value);
    }

    async function addDate() {
        const { data: { user } } = await supabase.auth.getUser();
        const userID = user?.id

        const DTS = dayjs(startDate)
        const DTE = dayjs(endDate)


        let { data: profile, error: readError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userID)

        if (readError) {
            console.error(readError)
        }
        // @ts-ignore
        let one_off_times_start = profile[0].one_off_times_start
        // @ts-ignore
        let one_off_times_end = profile[0].one_off_times_end

        console.log(one_off_times_start)
        console.log(one_off_times_end)

        if (one_off_times_start == null) {
            one_off_times_start = [DTS.format('YYYY-MM-DDTHH:mm:ssZZ')]
        } else {
            one_off_times_start?.push(DTS.format('YYYY-MM-DDTHH:mm:ssZZ'))
        }

        if (one_off_times_end == null) {
            one_off_times_end = [DTE.format('YYYY-MM-DDTHH:mm:ssZZ')]
        } else {
            one_off_times_end?.push(DTE.format('YYYY-MM-DDTHH:mm:ssZZ'))
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                one_off_times_start: one_off_times_start,
                one_off_times_end: one_off_times_end
            })
            .eq('id', userID)

        if (error) {
            console.error(error)
        }

        route('/')
    }

    function cancel() {
        route('/')
    }

    return (
        <>
            <div class={"text-center inline-flex flex-col items-center gap-3"}>
                <div class={"inline-flex flex-row"}>
                    <h3 class={"m-3 text-white text-lg"}>Start</h3>
                    <input class={"my-3"} type="datetime-local" onChange={handleStartChange} />
                </div>
                <div class={"inline-flex flex-row"}>
                    <h3 class={"m-3 text-white text-lg"}>End</h3>
                    <input class={"my-3"} type="datetime-local" onChange={handleEndChange} />
                </div>
            </div>

            <div class={"text-center inline-flex items-center"}>
                <button onClick={addDate} type="button" class={"bg-green-500"}>
                    Add
                </button>
                <button onClick={cancel} type="button" class={"bg-red-600"}>
                    Cancel
                </button>
            </div>
        </>
    )
}