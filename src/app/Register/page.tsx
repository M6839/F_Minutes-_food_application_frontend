'use client';
import { useState } from "react";
import { API_URL } from "@/data/apiPath";
import { useRouter } from "next/navigation";
import axios from "axios";

import Link from "next/link";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: ""});
  const router = useRouter();

  const submit = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, form);
      
      if (res.status === 201) {
       
        localStorage.setItem('token', res.data.token); // Store token
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user data
         alert('user registered successfully')
        router.push("/Login");
      }
    } catch (err) {
      alert("User already exists");
      console.log('Registration error:', err);
    }
  };

  return (
    <div className="flex flex-col justify-center mt-24">
      <h1 className="text-blue-600 font-bold text-2xl md:text-3xl text-center mb-4">Create an account</h1>
      <div className="p-4 flex flex-col gap-4 border border-black rounded-[10px] md:w-[400px] mx-auto">
        <input 
          placeholder="Username" 
          className="h-[40px] border border-black rounded-[10px] px-4" 
          onChange={e => setForm({ ...form, name: e.target.value })} 
        />
        <input 
          placeholder="Email" 
          className="h-[40px] border border-black rounded-[10px] px-4" 
          onChange={e => setForm({ ...form, email: e.target.value })} 
        />
        <input 
          placeholder="Password" 
          className="h-[40px] border border-black rounded-[10px] px-4" 
          type="password" 
          onChange={e => setForm({ ...form, password: e.target.value })} 
        />
        <p>You already have an account? Please login <Link href="/Login" className="text-blue-600 underline">here</Link></p>
        <button 
          className="bg-blue-600 rounded-[10px] px-4 h-[40px] text-white" 
          onClick={submit}
        >
          Register
        </button>
      </div>
    </div>
  );
}