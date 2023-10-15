import './App.css';
import { useState } from 'react';

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

// props > parameter 값을 통해 내부 설정 
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

function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article>
  )
}

function App() {
  // state 생성 > react에서는 state 값을 통해 내부 컴포넌트의 값을 변경 
  let [mode, setMode] = useState('WELCOME');
  let [id, setId] = useState(null);

  // topics 배열 설정 
  const topics = [
    {id:1, title:'html', body:'html is . . .'},
    {id:2, title:'css', body:'css is . . .'},
    {id:3, title:'javascript', body:'javascript is . . .'}
  ];

  // mode 값을 통해 article 설정 
  let content = null;
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
    // {title} 값을 통해 파라미터 값에 맞는 data 설정 bind > ref  
    content = <Article title = {title} body = {body}></Article>
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
    </div>
  );
}

export default App;
