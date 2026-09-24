import { Component, ReactNode, createElement } from "react";
import { MultidatePickerPreviewProps } from "../typings/MultidatePickerProps";

export class preview extends Component<MultidatePickerPreviewProps> {
    render(): ReactNode {
        return <div className="multidate-picker-preview">Multidate Picker</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/MultidatePicker.css");
}
