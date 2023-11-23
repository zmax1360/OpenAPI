import React, { useState } from 'react';
import TextArea from './TextArea';
import SubmitButton from './SubmitButton';
import AnswerArea from './AnswerArea';
import ClearButton from './ClearButton';
import axios from 'axios';
import OpenAI from "openai";

const ChatApp = () => {
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: text }],
        model: "gpt-3.5-turbo",
      });

      setAnswer(response.data.choices[0].text.trim());
      // Save to MongoDB or perform other actions if needed
    } catch (error) {
      console.error('Error submitting text:', error);
    }
  };

  const handleClear = () => {
    setText('');
    setAnswer('');
  };

  return (
    <div>
      <TextArea value={text} onChange={handleTextChange} />
      <SubmitButton onClick={handleSubmit} />
      <AnswerArea answer={answer} />
      <ClearButton onClick={handleClear} />
    </div>
  );
};

export default ChatApp;