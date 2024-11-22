import { Extension } from '@tiptap/core'
import Suggestion from '@tiptap/suggestion'
import suggestion from './suggestion'

export const SlashCommand = Extension.create({
    name: 'SlashCommands',

    addOptions() {
        return {
            suggestion: {
                char: '/',
                command: ({ editor, range, props }: any) => {
                    props.command({ editor, range })
                },
            },
        }
    },

    addProseMirrorPlugins() {
        return [
            Suggestion({
                editor: this.editor,
                ...this.options.suggestion,
            }),
        ]
    },
})

export const createSlashCommandPlugin = () => {
    return SlashCommand.configure({
        suggestion,
    })
}