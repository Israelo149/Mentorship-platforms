import React, { useEffect, useState } from 'react';
import { supabase } from '../SupabaseClient';

function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user?.email_confirmed_at) {
        setMessage("⚠️ Please verify your email to access dashboard features.");
      }

      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setMessage("❌ Error loading profile.");
      } else {
        setProfile(profileData);
      }
    };

    getProfile();
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {message && <p>{message}</p>}
      {profile ? (
        <>
          <p>📧 {profile.email}</p>
          <p>📝 {profile.bio}</p>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Dashboard;
