import React, { useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient'; // adjust if your file is elsewhere
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Optional: check if current user is an admin
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error || !session) {
        navigate('/');
        return;
      }

      setUser(session.user);
      setLoading(false);

      // Optional: check admin role from your Supabase 'profiles' table
      /*
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.role !== 'admin') {
        navigate('/'); // block non-admins
      }
      */
    };

    getSession();
  }, [navigate]);

  if (loading) return <div style={styles.loading}>Loading admin panel...</div>;

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard 🛠️</h1>
      <p>Welcome, {user?.email}</p>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>📊 Site Analytics</h3>
          <p>Coming soon...</p>
        </div>
        <div style={styles.card}>
          <h3>👥 Manage Users</h3>
          <p>Coming soon...</p>
        </div>
        <div style={styles.card}>
          <h3>⚙️ Settings</h3>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  loading: {
    padding: '50px',
    textAlign: 'center',
    fontSize: '20px'
  },
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: 'auto'
  },
  cardContainer: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    marginTop: '30px'
  },
  card: {
    flex: '1 1 250px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f1f1f1'
  }
};

export default Admin;
