import './App.css';
import { useState } from 'react';

// Header component
function Header(props) {
  return (
    <header>
      <h1><a href ="/" onClick = {(event)=>{
        event.preventDefault();
        props.onChangeMode();
      }}>{props.title}</a></h1>
    </header>
  )
}

// Nav component
function Nav(props) {
  const lis = [
  ]

  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key = {t.id}>
      <a id ={t.id} href={'/read/' + t.id} onClick = {event => {
        event.preventDefault(); // 기본 실행동작 방지
        props.onChangeMode(Number(event.target.id));
    }}>
      {t.title}</a></li>);
  }

  return (
    <nav>
      <ol>
        {lis}
      </ol>
    </nav>
  )
}

// Article Component
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

// Create Component
function Create(props) {
  return (
    <article>
      <h2>Create</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onCreate(title,body);
      }}>
        <p><input type = "text" name ="title" placeholder='title' /></p>
        <p><textarea name = "body" placeholder='body'></textarea></p>
        <p><input type = "submit" value = "create"/></p>
      </form>
    </article>
  )
}


// update Component
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article>
      <h2>Update</h2>
      <form onSubmit={event => {
        event.preventDefault();
        const title = event.target.title.value;
        const body = event.target.body.value;
        props.onUpdate(title,body);
      }}>
        <p><input type = "text" name ="title" placeholder='title' value = {title} onChange={event=>{
          console.log(event.target.value);
          setTitle(event.target.value);
        }}/></p>
        <p><textarea name = "body" placeholder='body' value = {body} onChange={event=>{
          setBody(event.target.value);
        }}></textarea></p>
        <p><input type = "submit" value = "Update"/></p>
      </form>
    </article>
  )
}

// main App
function App() {
  // state 생성 > react에서는 state 값을 통해 내부 컴포넌트의 값을 변경 
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  // topics 배열 설정 
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is . . .'},
    {id:2, title:'css', body:'css is . . .'},
    {id:3, title:'javascript', body:'javascript is . . .'}
  ]);

  let content = null;
  let contextControl = null;
  // mode 값을 통해 article 설정 
  if (mode === 'WELCOME') {
    content = <Article title = "Welcome" body = "Hello, Web"></Article>
  } else if (mode === 'READ') {
    let title, body = null;
    topics.forEach((val, idx) => {
      if (val.id === id) {
        title = topics[idx].title;
        body  = topics[idx].body;
      }
    });

    content = <Article title = {title} body = {body}></Article>
    contextControl = <>
      <li>
        <a href={'/update/' + id} onClick={event =>{
          event.preventDefault();
          setMode('UPDATE');
        }}>Update</a>
      </li>
      <li>
        <input type = "button" value = "Delete" onClick ={()=>{
          const newTopics = [];
          topics.forEach((val, idx) => {
            if(val.id !== id) {
              newTopics.push(topics[idx]);
            }
          });
          setTopics(newTopics);
          setMode('WELCOME');
        }} />
      </li>
    </>
    // {title} 값을 통해 파라미터 값에 맞는 data 설정 bind > ref  
  } else if (mode === 'CREATE') {
    content = <Create onCreate ={(_title, _body)=> {
      const newTopic = {id:nextId, title : _title, body : _body};
      const newTopics = [...topics];  // 배열의 경우 초기화를 해주어야함.
      newTopics.push(newTopic);
      setTopics(newTopics);

      // mode 설정변경
      setMode('READ');
      setId(nextId);  // id를 next Id로 변경 >> 해당 글 보여주기
      setNextId(nextId + 1);  // nextId + 1 >> 추후 create
      
    }}></Create>
  } else if(mode === 'UPDATE') {
    let title, body = null;
    topics.forEach((val, idx) => {
      if (val.id === id) {
        title = topics[idx].title;
        body  = topics[idx].body;
      }
    });
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics];
      const updateTopic = {id:id, title:title, body:body};

      newTopics.forEach((val, idx) => {
        if (val.id === id) {
          newTopics[idx] = updateTopic;
        }
      });
      
      setTopics(newTopics);
      setMode('READ');
    }}>
    </Update>
  }
  return (
    <div>
      <Header title = "Web" onChangeMode = {function(){
        setMode('WELCOME');
      }}></Header>
      <Nav topics = {topics} onChangeMode = {(id) => {
        // topics click 시, setMode, setId 의 state 변경을 통해 재랜더링?
        setMode('READ');
        setId(id);
      }}></Nav>
      {content}
      <ul>
        <li>
          <a href ="/create" onClick={event => {
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
