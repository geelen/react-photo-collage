import React from 'react';
interface ReactPhotoCollageContainerProps {
    width?: string;
    height?: Array<string>;
    layout: Array<number>;
    photos: Array<{
        thumbnail: string;
        source: string;
    }>;
    showNumOfRemainingPhotos?: boolean;
}
declare const ReactPhotoCollageContainer: React.FC<ReactPhotoCollageContainerProps>;
export default ReactPhotoCollageContainer;
