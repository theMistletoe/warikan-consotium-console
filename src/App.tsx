import React, { useState } from 'react';

import './App.css';

type AssessmentStatus = {
  "assessor":string;
  "isVerified":boolean;
  "requestor":string;
}

function App() {

  const [insuanceAddress, setInsuanceAddress] = useState("")
  const [assessmentStatus, setAssessmentStatus] = useState({"assessor":"","isVerified":false,"requestor":""})

  const handleChangeInsurabceAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInsuanceAddress(event.target.value);
  }

  const handleClickCreateButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"insuranceAddress":"xx","ownerAddress":"yy"});

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("//ec2-34-233-208-74.compute-1.amazonaws.com:5000/create", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  const handleClickQueryButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"insuranceAddress": insuanceAddress});

    var requestOptions:RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("//ec2-34-233-208-74.compute-1.amazonaws.com:5000/query", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        const res:AssessmentStatus = JSON.parse(result);
        
        setAssessmentStatus(res);
      })
      .catch(error => console.log('error', error));
  }

  const handleClickUpdateButton = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({"insuranceAddress": insuanceAddress,"assessor":"Sumitomo Life"});

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("//ec2-34-233-208-74.compute-1.amazonaws.com:5000/update", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <h1>コンソーシアム管理画面</h1>
      <input 
        type="text"
        value={insuanceAddress}
        onChange={handleChangeInsurabceAddress}
        placeholder="保険のアドレス"
      />
      <hr/>
      
      {/* for debug
      <button onClick={handleClickCreateButton}>create</button>
      <hr/> */}

      <button onClick={handleClickQueryButton}>query</button>
      <ul>
        <li>承認状況：{assessmentStatus.isVerified ? "承認済み" : "未承認"}</li>
        <li>承認者：{assessmentStatus.assessor === "" ? "--" : assessmentStatus.assessor}</li>
        <li>請求者アドレス：{assessmentStatus.requestor === "" ? "--" : assessmentStatus.requestor}</li>
      </ul>
      <hr/>
      <button onClick={handleClickUpdateButton}>update</button>
    </div>
  );
}

export default App;
