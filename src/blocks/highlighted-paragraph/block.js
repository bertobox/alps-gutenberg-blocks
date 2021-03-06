/**
 * BLOCK: Highlighted Paragraph
 */

import './style.scss';
import './editor.scss';

( function( blocks, components, i18n, element ) {
  var __ = wp.i18n.__;
  var el = element.createElement;
  var registerBlockType = wp.blocks.registerBlockType;
  var RichText = wp.blockEditor.RichText;
  var AlignmentToolbar = wp.blockEditor.AlignmentToolbar;
  var BlockControls = wp.blockEditor.BlockControls;

  registerBlockType( 'alps-gutenberg-blocks/highlighted-paragraph', {
    title: __('ALPS Highlighted Paragraph', 'alps-gutenberg-blocks'),
    icon: 'media-text',
    description: __('Highlight a block of text.', 'alps-gutenberg-blocks'),
    category: 'common',

    attributes: {
      content: {
        type: 'array',
        source: 'children',
        selector: 'p',
      },
      alignment: {
        type: 'string',
        default: 'left',
      },
    },

    edit: function( props ) {
      var attributes = props.attributes;

      function onChangeContent( newContent ) {
        props.setAttributes( { content: newContent } );
      }
      function onChangeAlignment( newAlignment ) {
        props.setAttributes( { alignment: newAlignment === undefined ? 'left' : newAlignment } );
      }

      return [
        el( BlockControls, { key: 'controls' },
          el( AlignmentToolbar, {
            value: attributes.alignment,
            onChange: onChangeAlignment,
          } )
        ),
        el( 'div', { className: props.className },
          el( RichText, {
            tagName: 'p',
            className: 'o-paragraph',
            placeholder: __('Content goes here...', 'alps-gutenberg-blocks'),
            keepPlaceholderOnFocus: true,
            style: { textAlign: attributes.alignment },
            value: attributes.content,
            onChange: onChangeContent,
          } )
        )
      ];
    },

    save: function( props ) {
      var attributes = props.attributes;
      var paragraphClasses = [
        'o-highlight',
        'u-padding',
        'u-background-color--gray--light',
        'u-text-align--' + attributes.alignment,
        'can-be--dark-dark',
      ];

      return (
        el( 'div', { className: props.className },
          el( RichText.Content, {
            tagName: 'p',
            className: paragraphClasses.join(' '),
            value: attributes.content
          } )
        )
      );
    }

  } );

} )(
  window.wp.blocks,
  window.wp.components,
  window.wp.i18n,
  window.wp.element,
);
