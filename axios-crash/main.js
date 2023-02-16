// global token
axios.defaults.headers.common['X-Auth-Token']='sometoken'


// GET REQUEST
function getTodos() {
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:5
  //   }
  // })
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err));
  axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
 axios({
  method:'post',
  url:'https://jsonplaceholder.typicode.com/todos',
  data:{
    title:'NEW TODO',
    completed:false
  }
 })
 .then(res=>showOutput(res))
  .catch(err=>console.log(err));
}

// PUT/PATCH REQUEST
// put request is used to edit the or modify the resource obtained
// we need to include the id as well
// where as patch request retain all the datas which we not edited
function updateTodo() {
  axios({
    method:'put',
    url:'https://jsonplaceholder.typicode.com/todos/1',
    data:{
      title:'NEW TODO',
      completed:true
    }
   })
   .then(res=>showOutput(res))
    .catch(err=>console.log(err));
}

// DELETE REQUEST

// to delete you need to include the id in the url
function removeTodo() {
  axios({
    method:'delete',
    url:'https://jsonplaceholder.typicode.com/todos/1',
   })
   .then(res=>showOutput(res))
   .catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
// for getting apis at the same time
function getData() {
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
  ])
  .then(res=>{
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
  }).catch(e=>console.log(e));
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers:{
      'Content-Type':'application/json',
      Authorization:'sometoken'
    }
  };
  axios({
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'NEW TODO',
      completed:false
    },
    config
   })
   .then(res=>showOutput(res))
    .catch(err=>console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  axios.get('https://jsonplaceholder.typicode.com/todoss',{params:{_limit:5}})
  .then(res=>showOutput(res))
  .catch(err=>{
    if(err.response){
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    }
    if(err.response.status===404){
      alert('page not found')
    }
    
  })
}

// CANCEL TOKEN
function cancelToken() {
  // console.log('Cancel Token');

  const source=axios.CancelToken.source();
  axios.get('https://jsonplaceholder.typicode.com/todos',{
 cancelToken:source.token    
})
  .then(res=>showOutput(res))
  .catch(err=>{
     if(axios.isCancel(err)){
      console.log('request canceled',err.message);
     }
  })
   
  
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use((config=>{
console.log(
  `${config.method.toUpperCase()} request send to 
  ${config.url} at ${new Date().getTime()}`
);
return config;
})

)
// AXIOS INSTANCES

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
