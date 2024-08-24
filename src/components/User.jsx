import { useEffect, useState } from 'react'
import axios from 'axios'

function User() {
  const [profileUrl, setProfileUrl] = useState("")
  const [profileClicked, setProfileClicked] = useState(false)

  useEffect(() => {
    let accessToken = window.localStorage.getItem("token")

    const fetchUserProfile = async () => {
      try {
        const { response } = await axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const profileImageUrl = data.images && data.images.length > 0
          ? data.images[0].url
          : null;

        setProfileUrl(profileImageUrl);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <div className="icon-container">
        <img src={profileUrl} alt="User Icon" className="user-icon" />
      </div>
    </>
  )
}

export default User;