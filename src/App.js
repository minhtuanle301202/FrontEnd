import axios from "axios";
import React,{useState,useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

 const formatDate = (date) => {
  return date ? new Date(date).toLocaleDateString('en-GB'): '';
};


function App() {
  const [records,setRecords] = useState([]);

  const handleClick = (id) => {
    const conf = window.confirm("Bạn có muốn xóa sinh viên này không ?");
    if (conf) {
      axios.delete(`http://localhost:3000/api/delete/${id}`)
      .then(res=>{
        alert(res.data);
        window.location.reload();
      })
      .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3000/api/findall')
    .then(res => {
      console.log(res.data);
      setRecords(res.data);
    }) 
    .catch(error => {
      console.error(error);
    })
  },[])


  return (
    <div className="container mt-5">
      <div className="text-end">
        <Link to={'/create'} className="btn btn-primary">Add +</Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>StudentId</th>
            <th>Name</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record,key) => (
            <tr key={key}>
              <td>{record.StudentId}</td>
              <td>{record.Name}</td>
              <td>{formatDate(record.Birthday)}</td>
              <td>{record.Address}</td> 
              <td>
                <Link to={`/edit/${record._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                <button onClick={e => handleClick(record._id)} className="btn btn-sm btn-danger">Delete</button>
                </td>   
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



export default App;
