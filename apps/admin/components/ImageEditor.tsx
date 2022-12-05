import { useEffect, useRef, useState } from 'react';
import '@pqina/pintura/pintura.css';

import { PinturaEditor } from '@pqina/react-pintura';

import {
  getEditorDefaults,
  createMarkupEditorShapeStyleControls,
  createMarkupEditorFontFamilyControl,
  Shape,
  locale_en_gb,
} from '@pqina/pintura';

const setlist = [
  {
    title: 'Set 1',
    songs: [
      'Brightest of Days',
      'Motivation >',
      'Troll’s Paradise',
      'East Nashville Easter',
      'Back to Reality',
      'Diggin’ Holes',
    ],
  },

  {
    title: 'Set 2',
    songs: [
      'Refuge',
      'Little Girl of Mine in Tennessee',
      'Secret of the Breeze',
      'Grass is Greener',
      'Steam Powered Aeroplane',
      'Forecast of Life',
    ],
  },
];

interface Props {
  backgroundImage: string;
}

const markupEditorShapeStyleControls = createMarkupEditorShapeStyleControls({
  fontSizeOptions: [12, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128],
  strokeWidthOptions: [12, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96, 128],
});

markupEditorShapeStyleControls.fontFamily = createMarkupEditorFontFamilyControl(
  [
    ['Roboto Slab', 'Roboto Slab'],
    ['Raleway', 'Raleway'],
  ],
  { defaultKey: undefined }
);

export const ImageEditor = ({ backgroundImage }: Props) => {
  const editorRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    if (editorRef.current.editor.imageAnnotation) {
      const updatedAnnotationList = [
        {
          ...editorRef.current.editor.imageAnnotation[0],
          backgroundColor: backgroundColor,
          strokeColor: backgroundColor,
        },
      ];
      editorRef.current.editor.imageAnnotation = updatedAnnotationList;
    }
  }, [backgroundColor]);

  const editorConfig = getEditorDefaults({
    markupEditorShapeStyleControls: markupEditorShapeStyleControls,
    utils: ['annotate'],
    util: undefined,
    markupEditorToolbar: [],
    enableToolbar: false,
    enableUtils: false,
    enableButtonClose: false,
    enableButtonExport: false,
    enableButtonRevert: false,
    enableNavigateHistory: false,
    cropEnableButtonFlipHorizontal: false,
    cropEnableButtonFlipVertical: false,
    cropEnableButtonRotateLeft: false,
    cropEnableButtonRotateRight: false,
    cropEnableRotationInput: false,
    cropEnableZoomInput: false,
    cropEnableZoomAutoHide: false,
    locale: {
      ...locale_en_gb,
      shapeTitleStrokeWidth: 'padding',
      shapeTitleBackgroundColor: 'background color',
      shapeTitleTextColor: 'text color',
      shapeTitleFontSize: 'text size',
    },
  });

  return (
    <div style={{ height: '600px' }}>
      <PinturaEditor
        {...editorConfig}
        ref={editorRef}
        onSelectstyle={(detail) => {
          const { backgroundColor }: { backgroundColor?: string } = detail;
          if (backgroundColor) {
            setBackgroundColor(backgroundColor);
          }
        }}
        onLoad={() => {
          console.log('hits onLoad');
          editorRef.current.editor.imageAnnotation = [
            {
              x: 100,
              y: 50,
              width: 500,
              height: 500,
              backgroundColor: [1, 1, 1],
              text: `Sicard Hollow \n 07/13/2022 \n Venue Name - City, State \n \n ${setlist
                .map((set) => set.songs.map((item) => `${item} \n`).join(''))
                .join('\n')}`,
              fontSize: '24',
              fontFamily: 'Roboto Slab',
              strokeColor: [1, 1, 1],
              strokeWidth: 24,
              disableDuplicate: true,
              disableFlip: true,
              disableRemove: true,
              disableTextLayout: true,
              disableReorder: true,
              disableStyle: [
                'strokeColor',
                'textAlign',
                'lineHeight',
                'fontStyle',
              ],
            },
          ] as Shape[];
        }}
        src={backgroundImage}
      ></PinturaEditor>
    </div>
  );
};
