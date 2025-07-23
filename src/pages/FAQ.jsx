import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayouts';

const faqs = [
  {
    question: "What is MOVFLIX?",
    answer: "MOVFLIX is a streaming platform like Netflix, where you can explore movies and TV shows from TMDB API."
  },
  {
    question: "How much does MOVFLIX cost?",
    answer: "MOVFLIX is completely free to use for educational and demo purposes."
  },
  {
    question: "Where can I watch?",
    answer: "You can watch MOVFLIX on any device that has a browser – laptop, tablet, or mobile."
  },
  {
    question: "How do I cancel?",
    answer: "Since it's free, there’s no subscription or cancellation needed."
  },
  {
    question: "What can I watch on MOVFLIX?",
    answer: "You can browse top-rated, trending, and categorized movies and TV shows from the TMDB database."
  },
];

function FAQ() {
  return (
    <MainLayout>
      <Container>
        <Title>Frequently Asked Questions</Title>
        <FaqList>
          {faqs.map((item, idx) => (
            <FaqItem key={idx} item={item} />
          ))}
        </FaqList>
      </Container>
    </MainLayout>
  );
}

const FaqItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <QuestionBox onClick={() => setOpen(!open)}>
      <Question>
        {item.question}
        <span>{open ? '-' : '+'}</span>
      </Question>
      <Answer open={open}>{item.answer}</Answer>
    </QuestionBox>
  );
};

export default FAQ;
const Container = styled.div`
  margin-top: 120px;
  min-height: 80vh;
  padding: 40px;
  color: white;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 30px;
`;

const FaqList = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const QuestionBox = styled.div`
  background: #1f1f1f;
  border: 1px solid #333;
  border-radius: 6px;
  margin-bottom: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #2c2c2c;
  }
`;

const Question = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const Answer = styled.div`
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
  line-height: 1.6;
  max-height: ${({ open }) => (open ? '200px' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease;
`;
