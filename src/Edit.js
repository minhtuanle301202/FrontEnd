import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [data,setData] = useState({});
  const navigat = useNavigate();

  const formatDate = (date) => {
    return date ? new Date(date).toISOString().substring(0, 10) : '';
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/api/findfirst/${id}`)
    .then(res=> setData(res.data))
    .catch(err=> console.log(err)) 
  },[]) ;

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:3000/api/update/${id}`,data)
    .then(res=> {
      alert(res.data);
      navigat('/');
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <h1>Chỉnh sửa thông tin sinh viên</h1>
      </div>
   
      <div className='d-flex w-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor='studentId' className='mb-1'>StudentId</label>
            <input type='number' name='studentId' disabled value={data.StudentId} className='form-control' onChange={e => setData({ ...data, StudentId: e.target.value })}></input>
          </div>


          <div className='mb-2'>
            <label htmlFor='name' className='mb-1'>Name</label>
            <input type='text' name='name' value={data.Name} className='form-control' onChange={e => setData({ ...data, Name: e.target.value })}></input>
          </div>

          <div className='mb-2'>
            <label htmlFor='birthday' className='mb-1'>Birthday</label>
            <input type='date' name='birthday' value={formatDate(data.Birthday)} className='form-control' onChange={e => setData({ ...data, Birthday: e.target.value })}></input>
          </div>

          <div className='mb-2'>
            <label htmlFor='address' className='mb-1'>Address</label>
            <input type='text' name='address' value={data.Address} className='form-control' onChange={e => setData({ ...data, Address: e.target.value })}></input>
          </div>

          <button type='submit' className='btn btn-info mt-2'>Update</button>
        </form>

      </div>
    </div>
    </div>
  );
}

export default Edit;