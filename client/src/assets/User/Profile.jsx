import { useState,useEffect} from 'react';
import '../../styles/User/Profile.css';
function Profile() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [id, setid] =useState('');
  const URL = "http://localhost:8000/";
  useEffect(() => {
    const fetchUser = async () => {
        try {
        const response = await fetch(`${URL}`, {
            method: 'GET',
            credentials: 'include',
        });
        const result = await response.json();
        const user = result.user;
        setid(user._id);
        console.log(id);
        } catch (err) {
        console.error(err);
        }
    };
    fetchUser();
    }, []);
  
  const handleSave = async (event) => {
    event.preventDefault();
    const UserData = {id,name,email,sex,dob,bloodGroup};
    console.log(UserData);
    
    const response = await fetch(`${URL}user/profile`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(UserData),
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
      console.log(data.message);
      setName('')
      setEmail('');
      setSex('')
      setDob('')
      setBloodGroup('')
    }
    else{
      console.error('Error', data.error);
      setMessage('try again!');
    }
  };

  return (
    <div className="profile">
      <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
      <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
      <select value={sex} onChange={(e) => setSex(e.target.value)}>
        <option value="" disabled>Select Sex</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Others">Others</option>
      </select>
      <input type="date" placeholder="Date of Birth" value={dob} onChange={(event) => setDob(event.target.value)}/>
      <input type="text" placeholder="Blood Group" value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value)}/>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Profile;
