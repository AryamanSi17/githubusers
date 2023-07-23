import React from 'react';
import { useState , useEffect } from 'react';
import axios from 'axios';
const GetUser = () => {
    const[username,setUsername]=useState('');
    const[user,setUser]=useState(null);
    useEffect(()=>{
        const fetchUserInfo=async()=>{
            if(!username) return;
        
        try{
            const response=await axios.get(`https://api.github.com/users/${username}`);
            setUser(response.data);
        }
        catch(error){
            setUser(null);
        }
    }
    fetchUserInfo();
    },[username]);
    const handleSearch=(event)=>{
        event.preventDefault();
        setUsername(event.target.elements.username.value);
    }
  return (
    <div>
    <form onSubmit={handleSearch}>
        <input type="text" name="username" placeholder="Enter GitHub username" />
        <button type="submit">Search</button>
      </form>
      {user ? (
        <div>
            <h2>{user.login}</h2>
            <img src={user.avatar_url} alt={user.login} width="100" />
            <p>Followers : {user.followers}</p>
            <p>Public Repos : {user.public_repos}</p>
        </div>
      ):(
        <p>No user found</p>
      )}

    </div>
  )
}

export default GetUser;