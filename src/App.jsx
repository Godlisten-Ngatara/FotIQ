import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Signup from './components/signup'
import './styles/app.css';
import Login from './components/login';
import Card from './components/Card';
import QuizCard from './components/Card';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='wrapper'>
      <QuizCard></QuizCard>
    </div>
  )
}

export default App
