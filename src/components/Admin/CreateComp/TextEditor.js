import React, { Component } from 'react'
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from "html-to-draftjs";
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// --------------------------------------------------------------------------------------------------------------------------------
// Text Editor when Creating or Updating the blog
// --------------------------------------------------------------------------------------------------------------------------------

class TextEditor extends Component {

    constructor(props) {
        super(props);
        if (props.content == null) {
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        } else {
            const blocksFromHtml = htmlToDraft(props.content);
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            this.state = {
                editorState: EditorState.createWithContent(contentState),
            };
        }
        
    }

    // update on all changes
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    // convert editor data into an html String and store it in a state
    render() {
        const {editorState} = this.state;
        this.props.toggleEditor(draftToHtml(convertToRaw(editorState.getCurrentContent())).toString());
        return (
            <div>
                <Editor
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName={`toolbar-class${this.props.stick}`}
                    editorStyle={{border: "1px solid black", padding: "20px", backgroundColor: "white"}}
                    wrapperStyle={{marginTop: "30px"}}
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}

export default TextEditor;
