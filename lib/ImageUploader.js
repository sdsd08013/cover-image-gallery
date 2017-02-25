import FileInput from 'react-file-input';

export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      image_urls: this.props.image_urls,
      wrapperImage: null
    };
  }

  inactivateModal() {
    console.log('inactivatemodal');
    this.setState({isActive: false});
  }

  activateModal() {
    console.log('activatemodal');
    this.setState({isActive: true});
  }

  updateImageIndex(){
    this.getImageIndex().bind(this);
  }

  updateBackground(index) {
    this.setState({wrapperImage: this.state.image_urls[index]});
    this.setState({isActive: false});
  }

  getImageIndex() {
    $.ajax({
      url: "/admin/images",
      dataType: 'json',
      type: 'GET',
      success: function(image_urls) {
        this.setState({image_urls: image_urls})
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }
  render() {

    if (this.state.wrapperImage) {
      var wrapperStyle = {
        backgroundImage: 'url(' + this.state.wrapperImage + ')'
      }
    } else {
      var wrapperStyle = null
    }

    var wrapperBlock = (
      <div className="article-image-wrapper" style={wrapperStyle}>
        <a onClick={this.activateModal.bind(this)} className="article-image-inner">
          <p><i className="glyphicon glyphicon-picture">カバー写真を変更</i></p>
        </a>
      </div>
    )

    if(this.state.isActive){
      return (
        <div>
          {wrapperBlock}
          <div className="image-uploader-wrapper">
            <div className="image-uploader-overlay"></div>
            <div className="image-uploader-container" onClick={this.inactivateModal.bind(this)}></div>
            <Gallery
              image_urls={this.state.image_urls}
              onUploadImageCallBack={this.updateImageIndex.bind(this)}
              onClickCloseCallBack={this.updateBackground.bind(this)}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {wrapperBlock}
        </div>
      )
    }
  }
};

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponentId: null,
    };
    /*
    this.uploadImages      = this. _uploadImages.bind(this);
    this.clickCloseButton  = this. _clickCloseButton.bind(this);
    this.updateImageFrames = this. _updateImageIndex.bind(this);
    */
  }

  uploadImages(e){
    var formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    $.ajax({
      url           : "/admin/images",
      dataType      : 'json',
      type          : 'POST',
      data          : formdata,
      contentType   : false,
      processData   : false,
      success: function(image_urls) {
        this.props.onUploadImageCallBack();
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }

  clickCloseButton(){
    this.props.onClickCloseCallBack(this.state.selectedComponentId);
  }

  updateImageFrames(id) {
    this.setState({selectedComponentId: id})
  }

  render() {
    var images = [];
    this.props.image_urls.map(function(value,index){
      var class_name = index == this.state.selectedComponentId ? "image-gallery-image image-clicked" : "image-gallery-image";
      images.push(
        <GalleryImage
          class_name={class_name}
          id={index}
          key={index}
          imageSrc={value}
          onClickCallBack={this.updateImageFrames.bind(this)}
        />
      )
    }.bind(this));

    return (
      <div className="image-gallery-container">
        <div className="image-gallery-title">
          <p className="title">カバー写真</p>
        </div>
        <div className="image-gallery-contents">
          {images}
        </div>
        <div className="image-gallery-form">
          <div className="col8">
            <FileInput name="coverImage"
              accept=".png,.gif"
              placeholder="＋Upload"
              className="image-gallery-file"
              onChange={this.uploadImages.bind(this)}
            />
          </div>
          <div className="col2">
            <input type="submit" value="確定" className="image-gallery-upload-button" onClick={this.clickCloseButton.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
};

class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
    };
  }

  changeFrame(i) {
    this.props.onClickCallBack(this.state.id);
  }

  render() {
    return (
      <img 
        className={this.props.class_name}
        src={this.props.imageSrc}
        onClick={this.changeFrame.bind(this)}
      />
    )
  }
};
