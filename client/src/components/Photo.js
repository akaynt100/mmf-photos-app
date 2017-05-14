import React, { Component, PropTypes } from 'react';

class Photo extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    handlerPhotoClick: PropTypes.func
  };

  handlerPhotoClick = () => {
    const { id, handlerPhotoClick } = this.props;
    handlerPhotoClick(id);
  };

  render() {
    const { path, likes } = this.props;
    return (
      <div onClick={this.handlerPhotoClick}>
        <div>
          <img src={path} alt="" className="photo photo__el"/>
        </div>
        <div className="photo__el">
          Likes: {likes}
        </div>
      </div>
    );
  }
}

export default Photo;
