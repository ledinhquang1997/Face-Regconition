import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';
class ImageBox extends Component {
    render() {
        
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-5">
                <div className="panel rounded">
                    <i style={{ cursor: "pointer" }} onClick={() => this.props.onDelete(this.props.index)} className="fas fa-minus-square fa-2x" style={{ position: "absolute", right: 20 }}></i>
                    <div className="d-flex justify-content-center">
                        {this.props.picture ?
                            <img style={{ height: 150, width: 150 }} alt="iron" src={URL.createObjectURL(this.props.picture)}></img>
                            :
                            <div style={{ height: 150, width: 150 }}>

                            </div>
                        }

                    </div>
                    <div style={{ width: "90%", margin: "auto" }}>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            onChange={(picture) => this.props.onDropImage(picture, this.props.index)}
                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                            withLabel={true}
                            singleImage={true}
                        />
                    </div>
                </div>
                <div className="panel-bottom container pt-2">
                    <p className="lead text-center">Image: {this.props.picture && this.props.picture.name}</p>
                    <p className="lead text-center">Predict: <strong>{this.props.name} </strong>
                        {this.props.picture ?this.props.picture.name.slice(0,this.props.picture.name.indexOf('.'))===this.props.name ?
                            <i className="fas fa-check fa-lg" style={{ color: "green" }}></i> :
                            <i className="fas fa-times fa-lg" style={{ color: "red" }}></i>:""
                        }
                        </p>

                </div>
            </div>
        );
    }
}

export default ImageBox;