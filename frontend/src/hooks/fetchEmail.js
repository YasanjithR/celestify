import { useState, useEffect } from 'react';

export default function useEmail() {
  const getEmail = () => {
    const emailString = localStorage.getItem('email');
    const userEmail = JSON.parse(emailString);
    return userEmail;
  };

  const getIsSubmitted = () => {
    const isSubmittedString = localStorage.getItem('isSubmitted');
    const isSubmitted = JSON.parse(isSubmittedString);
    return isSubmitted || false;
  };

  const [email, setEmail] = useState(getEmail());
  const [isSubmitted, setIsSubmitted] = useState(getIsSubmitted());

  const saveEmail = userEmail => {
    localStorage.setItem('email', JSON.stringify(userEmail));
    setEmail(userEmail);
  };

  const submitEmail = () => {
    setIsSubmitted(true);
  };

  useEffect(() => {
    if (isSubmitted) {
      localStorage.setItem('isSubmitted', JSON.stringify(isSubmitted));
    }
  }, [isSubmitted]);

  return {
    set: saveEmail,
    submit: submitEmail,
    get: email,
    submitted: isSubmitted
  };
}
