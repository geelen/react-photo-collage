import React from 'react';
import styled from 'styled-components';
export const SC = {};
SC.PhotoCollage = styled.div `
    width: ${props => props.collageWidth};
    font-family: Helvetica, Arial, sans-serif;
`;
SC.PhotoRow = styled.div `
    display: flex;
    border: 1px solid #ddd;
    height: ${props => props.rowHeight};
    box-sizing: border-box;
    & + & {
        margin-top: 2px;
    }
`;
SC.PhotoGrid = styled.div `
    display: flex;
    position: relative;
    flex: 1;
    cursor: pointer;
    & + & {
        margin-left: 2px;
    }
`;
SC.PhotoThumb = styled.div `
    flex: 1;
    background-image: url(${props => props.thumb});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`;
SC.PhotoMask = styled.div `
    display: block;
    background-color: rgba(0, 0, 0, .4);
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    cursor: pointer;
`;
SC.NumOfRemaining = styled.div `
    position: absolute;
    color: #fff;
    font-size: 35px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &:before {
        content: '+';
    }
`;
SC.ViewMore = styled.div `
    width: 100%; 
    height: 100%; 
    position: absolute; 
    z-index: 1; 
    cursor: pointer;
`;
const RowPhotos = (props) => {
    const { height, photos, layoutNum, remainingNum, showNumOfRemainingPhotos, openLightbox } = props;
    return (React.createElement(SC.PhotoRow, { rowHeight: height }, photos.map((data, i) => {
        return (React.createElement(SC.PhotoGrid, { key: i, "data-id": data.id, onClick: e => openLightbox(e.currentTarget.dataset.id) },
            showNumOfRemainingPhotos && remainingNum > 0 && data.id === (layoutNum - 1) ?
                (React.createElement(React.Fragment, null,
                    React.createElement(SC.PhotoMask, null),
                    React.createElement(SC.ViewMore, null,
                        React.createElement(SC.NumOfRemaining, null, remainingNum)))) : null,
            React.createElement(SC.PhotoThumb, { "data-photo-filename": data.filename, thumb: data.thumbnail || data.source })));
    })));
};
export const ReactPhotoCollageComponent = React.memo((props) => {
    const { width, height, layout, layoutPhotoMaps, layoutNum, remainingNum, showNumOfRemainingPhotos, openLightbox } = props;
    return (React.createElement(SC.PhotoCollage, { collageWidth: width }, layout.map((data, i) => {
        return (React.createElement(RowPhotos, { key: i, height: height[i], photos: layoutPhotoMaps[i], openLightbox: openLightbox, layoutNum: layoutNum, remainingNum: remainingNum, showNumOfRemainingPhotos: showNumOfRemainingPhotos }));
    })));
});
//# sourceMappingURL=react-photo-collage-component.js.map