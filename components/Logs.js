import React, { useEffect, useState, useRef } from 'react'
import { wrapAdminFetch } from '../helpers/functions'
import Alert from './Alert'
import Spinner from './Spinner'

export default function Logs({ operation }) {
    const [range, setRange] = useState(20)
    const [error, setError] = useState(null)
    const [loading, isLoading] = useState(false)
    const [finish, setFinish] = useState(false)
    const [logs, setLogs] = useState([])
    const container = useRef(null)
    const getLogs = async (range) => {
        console.log(range)
        try {
            isLoading(true)
            const {results} = await (await wrapAdminFetch(`/api/admin/logs?operation=${operation}&range=${range}`, null, 'GET')).json()
            setLogs([...logs, ...results])
            isLoading(false)
            if (results.length === 0)
                setFinish(true)
        } catch (error) {
            isLoading(false)
            setError(JSON.stringify(error))
        }
    }
    useEffect(() => {
        getLogs(range)
    }, [range])
    const handleScroll = () => {
        if (finish)
            return;
        const isBottom = container.current.offsetHeight + container.current.scrollTop >= container.current.scrollHeight
        if (isBottom && !loading)
            setRange(range + 20)
    }
    return (
        <div style={{ height: '90%', overflow: 'auto' }} onScroll={handleScroll} ref={container}>
            { error && <Alert type="danger" message={error} /> }
            { logs.map((log, index) => (
                <div className="mb-3 card" key={index}>
                    <div className="card-body">
                        <div className="align-items-center row">
                            <div className="ms-n2 col">
                                <h4 className="mb-1">{log.user || 'unknown'} </h4>
                                <hr/>
                                <code>
                                    { log.inputs }
                                </code>
                                <hr/>
                                <p className="small card-text">
                                    { log.created_at }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )) }
            
        { loading && <Spinner light={true} /> }
        </div>
    )
}
