import { useState } from 'react'
import Card from './components/Card'
import Timer from './components/Timer'
import Sidebar from './components/Sidebar'
import type { WordSource } from './components/Sidebar'
import type { ItemType } from './components/Item'
import { exampleCardItems, wordListByType } from './constants'

function App() {
  const [timerLength, setTimerLength] = useState(60)
  const [allowedOptions, setAllowedOptions] = useState<WordSource[]>([
    { type: 'person', label: 'Person', enabled: true },
    { type: 'object', label: 'Object', enabled: true },
    { type: 'action', label: 'Action', enabled: true },
    { type: 'difficult', label: 'Difficult', enabled: true },
    { type: 'allplay', label: 'All Play', enabled: true },
  ])

  // State for current card items, initialized with one example card
  const [cardItems, setCardItems] = useState<{ type: ItemType; label: string }[]>(exampleCardItems)
  // Generates a random card based on enabled word sources
  const generateRandomCard = () => {
    const enabled = allowedOptions.filter((ws) => ws.enabled)
    const items = enabled.map((ws) => {
      const list = wordListByType[ws.type]
      const label = list[Math.floor(Math.random() * list.length)]
      return { type: ws.type, label }
    })
    setCardItems(items)
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8 
            flex flex-col space-y-8 
            md:flex-row md:space-x-8 md:space-y-0 
            justify-center items-start">
      <Sidebar
        timerLength={timerLength}
        onTimerLengthChange={setTimerLength}
        wordSources={allowedOptions}
        onWordSourcesChange={setAllowedOptions}
      />
      <div className="flex flex-col gap-10">
        <Timer initialSeconds={timerLength} onExpire={() => { }} />
        <Card title="Pictionary" items={cardItems} />
        <button
          onClick={generateRandomCard}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Shuffle
        </button>
      </div>
    </div>
  )
}

export default App
