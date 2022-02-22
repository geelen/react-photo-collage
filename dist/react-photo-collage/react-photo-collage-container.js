import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
// import { Carousel } from 'react-responsive-carousel'
// <Carousel selectedItem={currentImage}>
//   {photos.map((photo) => (
//     <img key={photo.source} src={photo.source} alt="Image" />
//   ))}
// </Carousel>
import { ReactPhotoCollageComponent } from './react-photo-collage-component';
const createPhotoIds = (photos) => {
    return photos.map((data, i) => {
        return { ...data, id: i };
    });
};
const createLayoutPhotoMaps = (layout, photos) => {
    const newPhotos = createPhotoIds(photos);
    const newMaps = {};
    layout.reduce((accumulator, currentValue, currentIndex) => {
        newMaps[currentIndex] = newPhotos.slice(accumulator, accumulator + currentValue);
        return accumulator + currentValue;
    }, 0);
    return newMaps;
};
const checkProps = (props) => {
    const defaultProps = {
        width: '800px',
        height: new Array(props.layout.length),
        layout: [],
        photos: [],
        showNumOfRemainingPhotos: false,
    };
    const newProps = { ...defaultProps, ...props };
    if (newProps.height.length < newProps.layout.length) {
        for (let i = 0; i < newProps.layout.length; i++) {
            newProps.height[i] = '200px';
        }
    }
    return newProps;
};
const ReactPhotoCollageContainer = (props) => {
    const currProps = useMemo(() => checkProps(props), [props]);
    const { width, height, layout, photos, showNumOfRemainingPhotos } = currProps;
    const layoutNum = layout.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const remainingNum = photos.length - layoutNum;
    const [allowRender, setAllowRender] = useState(false);
    const [layoutPhotoMaps, setLayoutPhotoMaps] = useState({});
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        setLayoutPhotoMaps(createLayoutPhotoMaps(layout, photos));
    }, []);
    useEffect(() => {
        Object.keys(layoutPhotoMaps).length
            ? setAllowRender(true)
            : setAllowRender(false);
    }, [layoutPhotoMaps]);
    const openLightbox = useCallback((id) => {
        setCurrentImage(parseInt(id));
        setViewerIsOpen(true);
    }, []);
    const closeLightbox = useCallback(() => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    }, []);
    if (allowRender) {
        return (React.createElement(React.Fragment, null,
            React.createElement(ReactPhotoCollageComponent, { width: width, height: height, layout: layout, layoutPhotoMaps: layoutPhotoMaps, layoutNum: layoutNum, remainingNum: remainingNum, showNumOfRemainingPhotos: showNumOfRemainingPhotos, openLightbox: openLightbox }),
            React.createElement(ModalGateway, null, viewerIsOpen ? (React.createElement(Modal, { onClose: closeLightbox },
                React.createElement(Carousel, { hideControlsWhenIdle: 1000, views: photos, currentIndex: currentImage }))) : null)));
    }
    return null;
};
export default ReactPhotoCollageContainer;
//# sourceMappingURL=react-photo-collage-container.js.map