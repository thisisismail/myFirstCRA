import React, { Component } from 'react'

const ID = '8699333de5604b2587b73f95f3c2daa7';
const SECRET_KEY = 'a581e3b2b8fd4f28bc42896f9a06a568';
const REDIRECT_URI = 'http://localhost:3000';
const AUTH_URL = `https://accounts.spotify.com/authorize?response_type=token&client_id=${ID}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}`;

export default class SpotifyAPIFirstStep extends Component {
  
  constructor(props) {
    super(props);
  
    this.state = {
       getauthapi: '',
       message: 'YOU ARE NOT AUTHORIZED',
       input: '',
       apidata: [],
    }

    this.getInput = this.getInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  componentDidMount(){
    const token =
      window.location.hash && window.location.hash
        .substring(1)
        .split("&")
        .find((v) => v.startsWith("access_token"))
        .replace("access_token=", "");
    this.setState({getauthapi: token}, () => this.getDataAPI(this.state.getauthapi, this.state.input))
  }

  getDataAPI = async (v,x) => { // deklarasi fungsi asinkron untuk mengambil promise dari fetch
    if(v === ''){ return 0 }else{this.setState({message: 'NOW YOU ARE AUTHORIZED'})}
    if(x === ''){ return 0 }
    const token = v;
    const input = x;
    const result = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=12`, { // we can get tracks, albums, and so on
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        //here is your token, it is located after Bearer 
      },
    }).then(response => response.json())
      .then(result => {
        this.setState({apidata: result.tracks.items}); 
        return result;
      })
      .then(result => console.log(result.tracks.items))

    return 0;
  }

  handleBtnAuth = () => {
    console.log('Getting New Auth Token API ....');
  }

  submitInput(){
    this.setState(() => this.getDataAPI(this.state.getauthapi, this.state.textinput));
    console.log('Submitted Input: ' + this.state.textinput);
  }

  getInput(v){
    this.setState({textinput : v.target.value});
  }

  render() {
    const {apidata, message} = this.state;
    const {getInput, submitInput} = this;

    const resultData = apidata.map(content =>(
      <div key={content.id} >
        <h5>{content.name}</h5>
        <img src={content.album.images[2].url} alt="GIF Image"></img>
      </div>
    ));

    return (
      <div>
        <div>{message}</div>
        <a href={AUTH_URL}><button onClick={this.handleBtnAuth} href={AUTH_URL}>GET AUTH API</button></a>
        <div>
          <input type="text" onChange={getInput}></input>
          <input type="submit" onClick={submitInput}></input>
        </div>
        <div>
          {resultData}
        </div>
      </div>
    )
  }
}
