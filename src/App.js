import React, { Component } from 'react';
import animation from "./assets/animation/nightmask.json";
import lottie from 'lottie-web';
import ImageUploader from 'react-images-upload';
import axios from "axios";
import ImageBox from './ImageBox.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxes: [
        {
          name: ''
        },
        {
          name: ''
        }
      ]
    }
  }

  componentDidMount() {
    if (this.headerAnimationRefs) {
      lottie.loadAnimation({
        container: this.headerAnimationRefs, // the dom element that will contain the animation
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animation
      });
    }
  }

  onDrop = (picture, index) => {
    // var formData = new FormData();
    // formData.append('image',);
    console.log(">>>>>>>>>>>>> ", index);
    console.log(picture);

    axios({
      url: `http://127.0.0.1:5000/predict`,
      method: "POST",
      data: picture[picture.length - 1]
    }).then(r => {
      var boxes = [...this.state.boxes];
      boxes[index] = {
        picture: picture[picture.length - 1],
        name: r.data.result.name
      }
      console.log(">>>>>>>>>>>>>>>>>>>>> ", boxes);
      this.setState(
        { boxes: boxes }
      )
    }, r => {
      // this.setState({
      //   picture: picture[picture.length - 1],
      //   name: "Error"
      // })
    }
    )
  }

  onDelete = (index) => {
    var boxes = this.state.boxes;
    boxes.splice(index, 1)
    this.setState({
      boxes: boxes
    });
  }

  onAddClick = () => {
    var boxes = [...this.state.boxes];
    boxes.push({ name: '' })

    this.setState({
      boxes: boxes
    });
  }

  render() {
    console.log(this.state);

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav__shadow background-nav">
          <div style={{ width: 150, height: 80 }} ref={el => (this.headerAnimationRefs = el)}></div>
          <h3 className="text-white">FACE RECOGNIZATION</h3>
        </nav>

        <div className="container-fluid">
          <div className="row">
            {/* <div className="col-3">
              <div className="panel rounded">
              <i className="fas fa-minus-square fa-2x" style={{position:"absolute",right:20}}></i>
                <div className="d-flex justify-content-center">
                  {this.state.picture ?
                    <img style={{ height: 150, width: 150 }} alt="iron" src={URL.createObjectURL(this.state.picture)}></img>
                    :
                    <div style={{ height: 150, width: 150 }}>

                    </div>
                  }
                </div>
                <div style={{width:"90%", margin:"auto"}}>
                  <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withLabel={true}
                    singleImage={true}
                  />
                </div>
              </div>
              <div className="panel-bottom container pt-2">
                <p className="lead text-center">Image: {this.state.picture && this.state.picture.name}</p>
                <p className="lead text-center">Predict: <strong>{this.state.name}</strong>  <i className="fas fa-check fa-lg" style={{color:"green"}}></i></p>
               
              </div>
            </div> */}
            {this.state.boxes.map((box, index) => {
              return <ImageBox key={index} index={index} picture={box.picture} onDropImage={this.onDrop} name={box.name} onDelete={this.onDelete} />
            })}
            <div className="col-3 d-flex align-items-center">
              <i style={{ cursor: "pointer" }} onClick={this.onAddClick} className="far fa-plus-square fa-3x"></i>
            </div>
          </div>
        </div>


      </div>
    );
  }
}

export default App;
