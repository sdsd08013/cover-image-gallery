import FileInput from 'react-file-input';

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      image_urls: null,
      wrapperImage: null
    };
  }
  inactivateModal() {
    this.setState({isActive: false});
  }
  activateModal() {
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
      url: this.props.image_root_path,
      dataType: 'json',
      type: 'GET',
      success: function(image_urls) {
        this.setState({image_urls: image_urls})
      }.bind(this),
      error: function(xhr, status, err) {
      }.bind(this)
    });
  }
  componentWillMount() {
    $.ajax({
      url: this.props.image_root_path,
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
      var wrapperStyle = null;
    }
    var wrapperBlock = (
      <div className="article-image-wrapper" style={wrapperStyle}>
        <a onClick={this.activateModal.bind(this)} className="article-image-inner">
          <p><i className="glyphicon glyphicon-picture">ChangeImage</i></p>
        </a>
      </div>
    )

    if (this.state.isActive) {
      return (
        <div>
          {wrapperBlock}
          <div className="image-uploader-wrapper">
            <div className="image-uploader-overlay"></div>
            <div className="image-uploader-container" onClick={this.inactivateModal.bind(this)}></div>
            <ImageList
              image_urls={this.state.image_urls}
              image_update_path={this.props.image_root_path}
              onUploadImageCallBack={this.updateImageIndex.bind(this)}
              //汎用性をあげるためクリックした画像のurlをコールバックするまでに止めておく
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

class ImageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedComponentId: null,
    };
  }

  uploadImages(e){
    var formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    $.ajax({
      url           : this.props.image_update_path,
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
        <Image
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
          <p className="title">CoverImage</p>
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
            <input type="submit" value="submit" className="image-gallery-upload-button" onClick={this.clickCloseButton.bind(this)}/>
          </div>
        </div>
      </div>
    )
  }
};

class Image extends React.Component {
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
