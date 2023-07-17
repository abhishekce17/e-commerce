"use client"
import React, { useState } from 'react';
import styles from '@/Styles/HelpAndFAQ.module.css';
import { SlDrawer, SlQuestion } from "react-icons/sl"
import { TbEdit } from 'react-icons/tb';
import { MdDeleteOutline } from 'react-icons/md';
import { SiAnswer } from 'react-icons/si';

const HelpAndFAQ = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddQuestion = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      return; // Do not add if either question or answer is empty
    }

    const newFAQ = { question: newQuestion, answer: newAnswer };
    setQuestions([...questions, newFAQ]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const handleEditQuestion = (index) => {
    setEditIndex(index);
    setNewQuestion(questions[index].question);
    setNewAnswer(questions[index].answer);
  };

  const handleUpdateQuestion = () => {
    if (newQuestion.trim() === '' || newAnswer.trim() === '') {
      return; // Do not update if either question or answer is empty
    }

    const updatedQuestions = [...questions];
    updatedQuestions[editIndex] = { question: newQuestion, answer: newAnswer };
    setQuestions(updatedQuestions);
    setNewQuestion('');
    setNewAnswer('');
    setEditIndex(-1);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  return (
    <div className={styles.help_and_faq_page}>
      <h2>Help And FAQ</h2>
      <div className={styles.add_question_and_answers}>
        <p>Question</p>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter your question"
        />
        <p>Answer</p>
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Enter your answer"
        ></textarea>
        {editIndex === -1 ? (
          <button onClick={handleAddQuestion}>Add Question</button>
        ) : (
          <button onClick={handleUpdateQuestion}>Update Question</button>
        )}
      </div>
      <div className={styles.added_faq} >
        {questions.length === 0 ? (
          <div>
            <SlDrawer />
          </div>
        ) : (
          <ul>
            {questions.map((faq, index) => (
              <li key={index} style={{ listStyle: "none", borderBottom: "1px solid var(--light-bg-color)", marginTop: "20px" }} >
                <SlQuestion style={{ color: "var(--light-bg-color)", marginRight: "7px", fontSize: "1rem" }} />
                {faq.question}
                <br />
                <SiAnswer style={{ color: "var(--light-bg-color)", marginRight: "7px", fontSize: "1rem" }} />
                {faq.answer}
                <br />
                <button onClick={() => handleEditQuestion(index)}><TbEdit /> </button>
                <button onClick={() => handleDeleteQuestion(index)}>
                  <MdDeleteOutline />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HelpAndFAQ;
