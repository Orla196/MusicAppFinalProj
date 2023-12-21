import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Create from './components/CreateSong';
import Read from './components/read';
import Edit from './components/edit';
import Lookup from './components/Lookup'
//import react and bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  return (
    //BrowserRouter wraps the whole code to allow for routing capabilities
    <BrowserRouter>
      <div className="App">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/">MUSIC LOCKER</Navbar.Brand>
            <Nav className="me-auto">
              {/*adds a naviagtion bar to top of page to allow user to access different pages*/}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/create">Add Song</Nav.Link>
              <Nav.Link href="/read">View Songs</Nav.Link>
              <Nav.Link href="/Lookup">Search</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          {/*Routes component for managing different views*/}
          <Route path='/' element={<Content></Content>}></Route>
          <Route path='/read' element={<Read></Read>}></Route>
          <Route path='/create' element={<Create></Create>}></Route>
          <Route path='/edit/:id' element={<Edit></Edit>}></Route>
          <Route path='/Lookup' element={<Lookup></Lookup>}></Route>
        </Routes>

      </div>
    </BrowserRouter>
  );
}
// Exporting the App component as the default export
export default App;
