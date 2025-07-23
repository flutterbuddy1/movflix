import React, { useState } from 'react';
import styled from 'styled-components';
import MainLayout from '../layouts/MainLayouts';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <MainLayout>
      <Wrapper>
        <Title>Contact Us</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextArea
            placeholder="Your Message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <Button type="submit">Send Message</Button>
        </Form>
      </Wrapper>
    </MainLayout>
  );
}

export default Contact;
const Wrapper = styled.div`
  margin-top: 120px;
  min-height: 80vh;
  color: white;
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
`;

const Form = styled.form`
  background: #1f1f1f;
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background: #2c2c2c;
  color: white;
  font-size: 16px;
  &:focus {
    outline: none;
    background: #333;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background: #2c2c2c;
  color: white;
  font-size: 16px;
  resize: none;
  &:focus {
    outline: none;
    background: #333;
  }
`;

const Button = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 12px 20px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background: #f40612;
  }
`;
