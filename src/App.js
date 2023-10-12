import './App.css';

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

function Nav(props) {
  const lis = [
  ]
  console.log(props)
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key = {t.id}>
      <a id ={t.id} href={'/read/' + t.id} onClick = {event => {
        console.log(event);
        event.preventDefault();
        props.onChangeMode(event.target.id);
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
  const topics = [
    {id:1, title:'html', body:'html is . . .'},
    {id:2, title:'css', body:'css is . . .'},
    {id:3, title:'javascript', body:'javascript is . . .'}
  ];
  return (
    <div>
      <Header title = "Web" onChangeMode = {function(){
        alert('Header');
      }}></Header>
      <Nav topics = {topics} onChangeMode = {(id) => {
        alert(id);
      }}></Nav>
      <Article title = "Welcome" body = "Hello, Web"></Article>
      <Article title = "Hi" body = "Hello, React"></Article>
    </div>
  );
}

export default App;
