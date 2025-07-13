import React, { useState } from 'react';
import { supabase } from '../SupabaseClient'; // adjust if path is different
import { useNavigate } from 'react-router-dom';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      const { data: result, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return setMessage(error.message);

      // Check if profile exists
      const { data: existing } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', result.user.id)
        .single();

      // Redirect based on profile existence
      if (existing) {
        navigate('/dashboard');
      } else {
        navigate('/profile');
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) return setMessage(error.message);
      setMessage("Signup successful! Check your email to verify.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>

      <p>{message}</p>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </button>
    </div>
  );
}

export default Auth;   
