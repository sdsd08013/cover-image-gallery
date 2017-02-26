import ImageGallery from 'cover-image-gallery';
import React from 'react';

class ImageUpload extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="commentBox">
        <ImageGallery
          file_root_path="/admin/images"
        />
      </div>
    );
  }
};
window.ImageUpload = ImageUpload;
