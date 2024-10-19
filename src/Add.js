import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Add() {
  const [inputData, setInputData] = useState(
    {
      StudentId: 0,
      Name: '',
      Birthday: '',
      Address: ''
    }
  )
  const navigat = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/save', inputData)
      .then(res => {
        alert(res.data);
        navigat('/');
      }).catch(err => console.log(err));

  }
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <h1>Thêm sinh viên</h1>
      </div>

      <div className='d-flex w-100  justify-content-center align-items-center'>
        <div className='w-50 border bg-light p-5'>
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <label htmlFor='studentId' className='mb-1'>StudentId</label>
              <input type='number' name='studentId' className='form-control' onChange={e => setInputData({ ...inputData, StudentId: e.target.value })}></input>
            </div>


            <div className='mb-2'>
              <label htmlFor='name' className='mb-1'>Name</label>
              <input type='text' name='name' className='form-control' onChange={e => setInputData({ ...inputData, Name: e.target.value })}></input>
            </div>

            <div className='mb-2'>
              <label htmlFor='birthday' className='mb-1'>Birthday</label>
              <input type='date' name='birthday' className='form-control' onChange={e => setInputData({ ...inputData, Birthday: e.target.value })}></input>
            </div>

            <div className='mb-2'>
              <label htmlFor='address' className='mb-1'>Address</label>
              <input type='text' name='address' className='form-control' onChange={e => setInputData({ ...inputData, Address: e.target.value })}></input>
            </div>

            <button type='submit' className='btn btn-info mt-4'>Submit</button>
          </form>

        </div>
      </div>
    </div>

  );
}

export default Add;