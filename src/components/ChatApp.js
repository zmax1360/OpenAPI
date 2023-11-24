import React, { useState, useEffect } from 'react';
import AnswerArea from './AnswerArea'
import './ChatApp.css'
import OpenAI from 'openai'

const ChatApp = () => {
  const [text, setText] = useState('')
  const [answer, setAnswer] = useState('')
  const [oldResponses, setOldResponses] = useState([]);
  const [currentWord, setCurrentWord] = useState(0);
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  })
  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: 'user', content: text }],
        model: 'gpt-3.5-turbo',
      })
      const message = response.choices[0]?.message?.content || ''

      const words = message.split(/\s+/);
      setOldResponses((prevResponses) => [...prevResponses, answer.join(' ')]);
      setAnswer(words);
      setCurrentWord(0);
      setText('');
      // Save to MongoDB or perform other actions if needed
    } catch (error) {
      console.error('Error submitting text:', error)
    }
  }
  useEffect(() => {
    console.log(answer);
    const intervalId = setInterval(() => {
      setCurrentWord((prevWord) => (prevWord < answer.length - 1 ? prevWord + 1 : prevWord));
    }, 100); // Adjust the interval (in milliseconds) based on your preference

    return () => clearInterval(intervalId);
  }, [answer]);


  return (
    <div className="container">
    {oldResponses.map((response, index) => (
        <div key={index} className="old-response">
          {response}
        </div>
      ))}

      {/* Display the current response being typed */}
      <AnswerArea answer={answer.slice(0, currentWord + 1).join(' ')} />
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here..."
      />
      <button onClick={handleSubmit}>
        <span class="" data-state="closed">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            class="text-white dark:text-black"
          >
            <path
              d="M7 11L12 6L17 11M12 18V7"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  )
}

export default ChatApp
