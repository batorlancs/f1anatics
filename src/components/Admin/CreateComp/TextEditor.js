import React, { Component } from 'react'
import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


class TextEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const {editorState} = this.state;
        this.props.toggleEditor(draftToHtml(convertToRaw(editorState.getCurrentContent())).toString());
        return (
            <div>
                <Editor 
                    editorStyle={{border: "1px solid black", padding: "20px", backgroundColor: "white"}}
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        )
    }
}

export default TextEditor;
