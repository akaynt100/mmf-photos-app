import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Photo from '../components/Photo';
import Spinner from '../components/Spinner';
import actions from '../actions/photo';

const mapDispatchToProps = {
  getPhotos: actions.getPhotos,
  setPhotoLike: actions.setPhotoLike
};

const mapStateToProps = ({ data: { error, data }, fetching }) => ({
  error,
  data,
  fetching
});

class App extends Component {

  static propTypes = {
    error: PropTypes.boolean,
    data: PropTypes.obj,
    fetching: PropTypes.boolean,
    getPhotos: PropTypes.func,
    setPhotoLike: PropTypes.func
  };

  state = {
    photos: []
  };

  componentDidMount() {
    this.props.getPhotos();
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (data) {
      this.setState({
        photos: data.photos
      });
    }
  }

  handlerPhotoClick = (id) => {
    this.props.setPhotoLike(id);
  };

  render() {
    const { fetching } = this.props;
    const { photos } = this.state;

    const spinner = fetching && (<Spinner />);

    return (
      <div>
        {spinner}
        {
          photos.map(photo =>
            <Photo
              id={photo._id}
              path={photo.path}
              likes={photo.likes}
              key={photo._id}
              handlerPhotoClick={this.handlerPhotoClick}
            />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
