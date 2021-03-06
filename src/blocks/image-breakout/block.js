/**
 * BLOCK: Image (Breakout)
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var InspectorControls = wp.blockEditor.InspectorControls;
  var BlockControls = wp.blockEditor.BlockControls;
  var MediaUpload = wp.blockEditor.MediaUpload;

  registerBlockType( 'alps-gutenberg-blocks/image-breakout', {
    title: __('ALPS Image (Breakout)', 'alps-gutenberg-blocks'),
    icon: 'format-image',
    description: __('Image that expands the width of the page.', 'alps-gutenberg-blocks'),
    category: 'common',

    attributes: {
      url: {
        type: 'string',
      },
      caption: {
        type: 'array',
        source: 'children',
        selector: 'p',
      },
      id: {
        type: 'number',
      },
    },

    edit: function( props ) {
      var attributes = props.attributes;

      return [
        el( MediaUpload, {
          onSelect: function( media ) {
            props.setAttributes( { url: media.sizes.large.url } );
            props.setAttributes( { id: media.id } );
          },
          type: 'image',
          value: attributes.id,
          render: function( obj ) {
            return el( components.Button, {
              className: attributes.id ? 'image-button' : 'button button-large',
              onClick: obj.open
              },
              ! attributes.id ? __( 'Upload Image', 'alps-gutenberg-blocks' ) : el( 'img', { src: attributes.url } )
            );
          }
        } ),
        el( RichText, {
          tagName: 'p',
          className: 'o-caption',
          placeholder: __('Caption', 'alps-gutenberg-blocks'),
          keepPlaceholderOnFocus: true,
          value: attributes.caption,
          onChange: function( newCaption ) {
            props.setAttributes( { caption: newCaption } );
          }
        } ),
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;

      return (
        <div>
          <section className="l-grid l-grid--7-col l-grid-wrap l-grid-wrap--6-of-7">
            <div className="u-width--100p u-padding--zero--sides">
              <div className="c-breakout-image">
                <div className="c-breakout-image__background u-image--breakout u-background--cover" style={ { backgroundImage: `url('${ attributes.url }');` } }></div>
                <div className="c-breakout-image__caption">
                  <figcaption className="o-figcaption">
                    <p className="o-caption u-color--gray u-font--secondary--s">{ attributes.caption }</p>
                  </figcaption>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    }

  });

} )(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
);
