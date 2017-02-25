import FileInput from 'react-file-input';

export default class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        test1
      </div>
    )
  }
};

// class Gallery extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedComponentId: null,
//     };
//     #<{(|
//     this.uploadImages      = this. _uploadImages.bind(this);
//     this.clickCloseButton  = this. _clickCloseButton.bind(this);
//     this.updateImageFrames = this. _updateImageIndex.bind(this);
//     |)}>#
//   }
//
//   uploadImages(e){
//     var formdata = new FormData();
//     formdata.append('file', e.target.files[0]);
//     $.ajax({
//       url           : "/admin/images",
//       dataType      : 'json',
//       type          : 'POST',
//       data          : formdata,
//       contentType   : false,
//       processData   : false,
//       success: function(image_urls) {
//         this.props.onUploadImageCallBack();
//       }.bind(this),
//       error: function(xhr, status, err) {
//       }.bind(this)
//     });
//   }
//
//   clickCloseButton(){
//     this.props.onClickCloseCallBack(this.state.selectedComponentId);
//   }
//
//   updateImageFrames(id) {
//     this.setState({selectedComponentId: id})
//   }
//
//   render() {
//     var images = [];
//     this.props.image_urls.map(function(value,index){
//       var class_name = index == this.state.selectedComponentId ? "image-gallery-image image-clicked" : "image-gallery-image";
//       images.push(
//         <GalleryImage
//           class_name={class_name}
//           id={index}
//           key={index}
//           imageSrc={value}
//           onClickCallBack={this.updateImageFrames.bind(this)}
//         />
//       )
//     }.bind(this));
//
//     return (
//       <div className="image-gallery-container">
//         <div className="image-gallery-title">
//           <p className="title">カバー写真</p>
//         </div>
//         <div className="image-gallery-contents">
//           {images}
//         </div>
//         <div className="image-gallery-form">
//           <div className="col8">
//             <FileInput name="coverImage"
//               accept=".png,.gif"
//               placeholder="＋Upload"
//               className="image-gallery-file"
//               onChange={this.uploadImages.bind(this)}
//             />
//           </div>
//           <div className="col2">
//             <input type="submit" value="確定" className="image-gallery-upload-button" onClick={this.clickCloseButton.bind(this)}/>
//           </div>
//         </div>
//       </div>
//     )
//   }
// };
//
// class GalleryImage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: this.props.id,
//     };
//   }
//
//   changeFrame(i) {
//     this.props.onClickCallBack(this.state.id);
//   }
//
//   render() {
//     return (
//       <img 
//         className={this.props.class_name}
//         src={this.props.imageSrc}
//         onClick={this.changeFrame.bind(this)}
//       />
//     )
//   }
// }

export default ImageUploader;
