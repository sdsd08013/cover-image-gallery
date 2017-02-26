import FileInput from 'react-file-input';
import InputFileList from 'input-file-list';

export default class ImageGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      file_urls: null,
      wrapperImage: null
    };
  }
  inactivateModal() {
    this.setState({isActive: false});
  }
  activateModal() {
    this.setState({isActive: true});
  }
  updateBackground(index) {
    this.setState({wrapperImage: this.state.file_urls[index]});
    this.setState({isActive: false});
  }
  uploadImageCallback(files) {
    this.setState({file_urls: files});
  }
  updateImageFrames(id) {
    this.setState({selectedComponentId: id})
  }
  componentWillMount() {
    $.ajax({
      url       : this.props.file_root_path,
      dataType  : 'json',
      type      : 'GET',
      success   : function(file_urls) {
        this.setState({file_urls: file_urls})
      }.bind(this),
      error     : function(xhr, status, err) {
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
      var files = [];
      this.state.file_urls.map(function(value,index){
        var class_name = index == this.state.selectedComponentId ? "image-gallery-image image-clicked" : "image-gallery-image";
        files.push(
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
        <div>
          {wrapperBlock}
          <div className="image-uploader-wrapper">
            <div className="image-uploader-overlay"></div>
            <div className="image-uploader-container" onClick={this.inactivateModal.bind(this)}></div>
            <div className="image-gallery-container">
              <div className="image-gallery-title">
                <p className="title">CoverImage</p>
              </div>
              <div className="image-gallery-contents">
                {files}
              </div>
              <InputFileList
                file_urls={this.state.file_urls}
                file_root_path={this.props.file_root_path}
                onUploadFileCallBack={this.uploadImageCallback.bind(this)}
                onClickCloseCallBack={this.updateBackground.bind(this)}
              />
            </div>
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
