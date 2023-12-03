import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const LogoutPage = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 1) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        cookies.remove('logged_in');
        cookies.remove('email_id'); 
        navigate('/login'); 
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, navigate, cookies]);

  return (
    <div>
      <h1>Logging Out...</h1>
      <p>You will be redirected to the default page in {countdown} seconds.</p>
    </div>
  );
};

export default LogoutPage;
