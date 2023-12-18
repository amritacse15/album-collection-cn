import React, { useState, useEffect } from 'react'

function App() {
    const [data, setData] = useState([]);

    //get Albums 
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/albums')
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, [])

    //add album
    const handleAdd = (e) => {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: prompt('Enter title here...'),
                userId: data.length + 1,
                id: data.length + 1,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.status != 201) {
                    return;
                }
                return response.json()
            })
            .then((json) => setData([...data, json]))
            .catch(err => console.log(err));

    }


    //Edit album
    const handleEdit = (e) => {
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PATCH',
            body: JSON.stringify({
                title: prompt("Edit here..."),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => {
                if (response.status != 200) {
                    return;
                }
                return response.json();
            })
            .then((json) => {

                return setData(data.map(v => {
                    return v.id == e.target.parentElement.firstChild.innerText ? { ...v, title: json.title } : v;
                }))
            });


    }

    //delete album
    const handleDelete = (e) => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${e.target.parentElement.firstChild.innerText}`, {
            method: 'DELETE',
        })
            .then(response => {
                console.log(response)
                if (response.status != 200) {
                    return;
                }
                setData(data.filter(d => d.id != e.target.parentElement.firstChild.innerText));
            })


    }


    return (
        <div className='pt-5 w-100 d-flex flex-column justify-content-center align-items-center bgColor'>
            <buttton onClick={handleAdd} className="btn btn-success w-25 mb-3">Add Album</buttton>{
                data.map(v => {
                    return (<div key={v.id} class="card border-danger mb-3 w-50" >
                        <div class="card-header">Header</div>
                        <div class="card-body text-dark">
                            <h5 class="card-title">{v.id}</h5>
                            <p class="card-text">{v.title}</p><i onClick={(e) => handleEdit(e)} className='fa fa-edit mr-2 text-success'></i><i onClick={(e) => handleDelete(e)} className='fa fa-trash text-danger'></i>
                        </div>
                    </div>)
                })}
        </div>
    )
}

export default App