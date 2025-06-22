import type { ItemType } from './Item'
import { useState } from 'react'
import EmptyCard from './EmptyCard'

type WordSource = {
    type: ItemType
    label: string
    enabled: boolean
}

type SidebarProps = {
    timerLength: number
    onTimerLengthChange: (value: number) => void
    wordSources: WordSource[]
    onWordSourcesChange: (sources: WordSource[]) => void
}

function Sidebar({ timerLength, onTimerLengthChange, wordSources, onWordSourcesChange }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleCheckboxChange = (index: number) => {
        const updated = [...wordSources]
        updated[index].enabled = !updated[index].enabled
        onWordSourcesChange(updated)
    }

    return (
        <EmptyCard >
            <div className="flex items-center justify-between ">
                <h2 className="text-xl font-semibold">Configuration</h2>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    {isOpen ? '▲' : '▼'}
                </button>
            </div>
            {isOpen && (
                <div className="space-y-6 mt-4">
                    <div>
                        <h3 className="text-lg font-medium mb-2">Timer Length</h3>
                        <div className="flex space-x-4">
                            <div className="flex-1">
                                <label htmlFor="minutes" className="block mb-1">Minutes</label>
                                <input
                                    id="minutes"
                                    type="number"
                                    min={0}
                                    value={Math.floor(timerLength / 60)}
                                    onChange={e => {
                                        const mins = Math.max(0, Math.floor(Number(e.target.value)))
                                        const secs = timerLength % 60
                                        onTimerLengthChange(mins * 60 + secs)
                                    }}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="seconds" className="block mb-1">Seconds</label>
                                <input
                                    id="seconds"
                                    type="number"
                                    min={0}
                                    max={59}
                                    value={timerLength % 60}
                                    onChange={e => {
                                        let secs = Math.floor(Number(e.target.value))
                                        if (secs < 0) secs = 0
                                        if (secs > 59) secs = 59
                                        const mins = Math.floor(timerLength / 60)
                                        onTimerLengthChange(mins * 60 + secs)
                                    }}
                                    className="w-full border rounded px-2 py-1"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium mb-2">Word Sources</h3>
                        {wordSources.map((source, idx) => (
                            <div key={source.type} className="flex items-center mb-2">
                                <input
                                    id={`source-${source.type}`}
                                    type="checkbox"
                                    checked={source.enabled}
                                    onChange={() => handleCheckboxChange(idx)}
                                    className="mr-2"
                                />
                                <label htmlFor={`source-${source.type}`}>{source.label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </EmptyCard>
    )
}

export type { WordSource };
export default Sidebar;
