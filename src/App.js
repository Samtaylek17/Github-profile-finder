import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Github from './Github';
import Top from './Components/Top';
import Auth0Lock from 'auth0-lock';

 

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      accessToken: '',
      profile: {}
    };

    this.setProfile = this.setProfile.bind(this)
  }

  static defaultProps = {
    clientID: '8EPWmdIlCNJt9I7GeCA6ZZbLDoE7ApNQ',
    domain: 'samtaylek.auth0.com'
  }

  componentWillMount(){
    this.lock = new Auth0Lock(this.props.clientID, this.props.domain);

    this.lock.on('authenticated', (authResult) => {

      this.lock.getProfile(authResult.accessToken, (error, profile) => {
        if(error){
          console.log(error);
          return;
        }
        // console.log(profile);

        this.setProfile(authResult.accessToken, profile);
      });  
      // console.log(authResult);
   });

   this.getProfile();
  }

  setProfile(accessToken, profile){
    localStorage.setItem('idToken', accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));

    this.setState({
      accessToken: localStorage.getItem('idToken'),
      profile: JSON.parse(localStorage.getItem('profile'))
    });
  }

  getProfile(){
    if(localStorage.getItem('accessToken') != null){
      this.setState({
        accessToken: localStorage.getItem('accessToken'),
        profile: JSON.parse(localStorage.getItem('profile'))
      }, () => {
        console.log(this.state);
      })
    }
  }

  showLock(){
    this.lock.show();
  }


  logout(){
    this.setState({
      accessToken: '',
      profile: ''
    }, () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('profile');
    });
  }

  render(){
    let gitty;
    if(this.state.accessToken){
      gitty = <Github />
    }else {
      gitty = "Click on Login to view Github Viewer"
    }

    return (
      <div className="App">
        <Top 
          lock = {this.lock}
          accessToken = {this.state.accessToken}
          onLogout = {this.logout.bind(this)}
          onLogin={this.showLock.bind(this)}
        /> 
            {gitty}
      </div>
    );
  }
}

export default App;
