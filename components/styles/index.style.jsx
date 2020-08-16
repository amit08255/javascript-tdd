import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  
  body {
    margin: 0;
  }
  
  article,
  aside,
  details,
  figcaption,
  figure,
  main,
  section,
  summary {
    display: block;
  }
  
  a {
    background-color: transparent;
  }
  a:active,
  a:hover {
    outline: 0;
  }
  
  b,
  strong {
      font-weight: bold;
  }
  
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  
  small {
    font-size: 80%;
  }
  
  img {
    border: 0;
  }
  
  svg:not(:root) {
    overflow: hidden;
  }
  
  figure {
    margin: 1em 40px;
  }
  
  hr {
    box-sizing: content-box;
    height: 0;
  }
  
  pre {
    overflow: auto;
  }
  
  button,
  input,
  optgroup,
  select,
  textarea {
      color: inherit;
      font: inherit;
      margin: 0;
  }
  
  button {
      overflow: visible;
  }
  
  button,
  select {
      text-transform: none;
  }
  
  button,
  html input[type="button"],
  input[type="reset"],
  input[type="submit"] {
      -webkit-appearance: button;
      cursor: pointer;
  }
  
  button[disabled],
  html input[disabled] {
      cursor: default;
  }
  
  button::-moz-focus-inner,
  input::-moz-focus-inner {
      border: 0;
      padding: 0;
  }
  
  input {
      line-height: normal;
  }
  
  input[type="checkbox"],
  
  input[type="radio"] {
      box-sizing: border-box;
      padding: 0;
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  
  input[type="number"]::-webkit-outer-spin-button {
      height: auto;
  }
  
  input[type="search"] {
      -webkit-appearance: textfield;
      box-sizing: content-box;
  }
  
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
  }
  
  fieldset {
      border: 1px solid #c0c0c0;
      margin: 0 2px;
      padding: 0.35em 0.625em 0.75em;
  }
  
  legend {
      border: 0;
      padding: 0;
  }
  
  textarea {
      overflow: auto;
  }
  
  optgroup {
      font-weight: bold;
  }
  
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
  td,th {
      padding: 0;
  }
  a:focus,
  .slider:focus,
  .revision-selector .revision-buttons button:focus,
  button:focus {
      outline: 4px auto #ced9f2;
  }
  .js-focus-visible a:focus:not(.focus-visible),
  .js-focus-visible .slider:focus:not(.focus-visible),
  .js-focus-visible button:focus:not(.focus-visible) {
      outline: 0;
  }
  
  *,
  *:before,
  *:after {
      box-sizing: border-box;
  }
  
  a[href^='http://'],a[href^='https://']
  {
      cursor: pointer;
  }
  
  html,
  body {
      height: 100%;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
  }
  
  body {
      margin: 0;
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif;
      overflow: hidden;
      -webkit-touch-callout: none;
  }
  
  img,
  svg {
      vertical-align: middle;
  }
  
  a {
      color: #3361cc;
  }
  
  b,
  strong,
  optgroup {
      font-weight: 600;
  }
  
  ::-webkit-scrollbar {
    width: 14px;
    background: transparent;
  }
  
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    background: #c3c4c7;
    border-radius: 100px;
    border: 4px solid #fff;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a7aaad;
  }
  
  ::-webkit-scrollbar-thumb:active {
    background: #8c8f94;
    border-radius: 100px;
  }

.app-wrapper {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .app-inner {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    transform: translateX(0px);
    transition: transform 200ms ease-in-out;
  }
  
  .app-inner.note-info-open {
    transform: translateX(-268px);
  }
  
  .app-inner.navigation-open {
    transform: translateX(216px);
  }
  
  .app-layout {
    display: flex;
    flex: 1 0 auto;
    width: 100%;
  }
  
  .border-grey {
    border-color: #dcdcde;
  }
  
  button {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 14px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    vertical-align: baseline;
  }
  
  button svg {
    cursor: pointer;
  }
  
  svg[class^="icon-"] {
    fill: currentColor;
  }
  
  svg:not(:root) {
    overflow: hidden;
  }
  
  img,svg {
      vertical-align: middle;
  }

.note-editor {
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
    background-color: #fff;
    color: #2c3338;
}

.note-detail-wrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding-top: 0;
}
.note-detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: row;
    justify-content: center;
    transition: all 0.3s ease-in-out;
}
.note-detail .note-content {
    padding: 20px;
    line-height: 1.5em;
    font-size: 16px;
    color: #2c3338;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    text-align: initial;
    position: relative;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
}

@media only screen and (max-width: 750px) {
    .note-detail .note-content {
        padding: 10px;
    }
}

.note-toolbar-wrapper {
    display: flex;
    justify-content: flex-end;
    flex: none;
    height: 56px;
    border-bottom: 1px solid #dcdcde;
}
.note-toolbar {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
}

.note-toolbar__column-right {
    display: flex;
    align-items: center;
    width: 100%;
}

.note-toolbar__button {
    flex: none;
    margin-right: 14px;
    text-align: center;
}
.note-toolbar__button:last-child {
    margin-right: 0;
}
.note-toolbar-back {
    display: none;
}
@media only screen and (max-width: 750px) {
    .note-toolbar-back {
        display: flex;
    }
}

.note-toolbar__title {
    font-size: 16px;
    margin-left: 15px;
    border: none;
    height: 100%;
    font-weight: bold;
    display: flex;
}

.note-column {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    border-left: 1px solid;
    background-color: #fff;
    color: #2c3338;
}
@media only screen and (max-width: 750px) {
    .note-column {
        position: absolute;
        flex: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        transition: all 200ms ease-in-out;
    }

    .hide-column{
        display: none;
    }
}

.note-list {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: hidden;
    background: inherit;
}

.note-list.is-empty {
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.note-list-items {
    flex: 1 1 auto;
    overflow: auto;
    overflow-x: hidden;
    position: relative;
    -webkit-overflow-scrolling: touch;
}

.note-list-items div:focus {
    outline: none;
}

.note-list-items-w{
    overflow: visible;
    height: 0px;
    width: 0px;
}

@media only screen and (max-width: 750px) {
    .note-list-items-w{
        width: 100%;
    }
}

.note-list-main{
    box-sizing: border-box;
    direction: ltr;
    height: auto;
    position: relative;
    width: 328px;
    will-change: transform;
    overflow: hidden;
}

@media only screen and (max-width: 750px) {
    .note-list-main{
        width: 100%;
    }
}

.note-list-main-w{
    width: auto;
    height: 100%;
    max-width: 328px;
    overflow: hidden;
    position: relative;
}

@media only screen and (max-width: 750px) {
    .note-list-main-w{
        width: 100%;
        max-width: 100%;
    }
}

.note-list-item {
    cursor: pointer;
    display: flex;
    padding-left: 8px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.note-item{
    height: auto;
    left: 0px;
    position: relative;
    width: 100%;
}

.note-list-item .note-list-item-pinner {
    flex: none;
    height: 14px;
    width: 14px;
    margin-right: 8px;
    margin-top: 14px;
    border-radius: 50%;
}
.note-list-item .note-list-item-pinner:focus {
    outline: none;
}
.note-list-item:hover .note-list-item-pinner {
    box-shadow: inset 0 0 0 2px #c3c4c7, inset 0 0 0 3px #fff;
}
.note-list-item:hover .note-list-item-pinner:hover {
    background: #646970;
}
.note-list-item.note-list-item-pinned .note-list-item-pinner {
    background: #2c3338;
    box-shadow: inset 0 0 0 2px #dcdcde, inset 0 0 0 3px #fff;
}
.note-list-item.note-list-item-pinned .note-list-item-pinner:hover {
    background: #c3c4c7;
}

.note-list-item .note-list-item-text {
    flex: 1 1 auto;
    overflow: hidden;
    padding: 9px 0;
    border-bottom: 1px solid #dcdcde;
}
.note-list-item .note-list-item-text:focus {
    outline: none;
}
.note-list-item .note-list-item-title,
.note-list-item .note-list-item-excerpt {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.note-list-item.note-list-item-selected {
    background: #ced9f2;
}

.note-list-item .note-list-item-title {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
}
.note-list-item .note-list-item-title span {
    text-overflow: ellipsis;
    overflow: hidden;
}
.note-list-item .note-list-item-excerpt {
    color: #2c3338;
}

.search-bar {
    height: 56px;
    padding: 20px 15px;
    border-bottom: 1px solid #dcdcde;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 0 0 auto;
}

.search-bar .button {
    padding: 0;
    width: 32px;
    height: 32px;
}

.search-field {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 1.75em;
    margin: 1px 12px 0;
    border-radius: 50px;
    border: 1px solid #c3c4c7;
    padding: 0 8px 1px 15px;
}

.search-field input {
    width: 100%;
    min-width: 0;
    border: 0;
    padding: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.search-field input:focus {
    outline: none;
}

.icon-button {
    width: 32px;
    height: 32px;
    color: #3361cc;
}

.icon-button svg {
    transition: all 0.1s ease-in-out;
}

.app-sidebar-column {
    width: 328px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    transition: transform 200ms ease-in-out;
    color: #2c3338;
    background-color: #fff;
  }
  
  @media only screen and (max-width: 900px) {
    .app-sidebar-column {
        width: 300px;
    }
  }
  
  @media only screen and (max-width: 750px) {
    .app-sidebar-column {
        flex: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 200ms ease-in-out;
        opacity: 1;
        pointer-events: auto;
    }

    .app-sidebar-column.hide-sidebar {
        display: none;
    }
  }
`;

export default GlobalStyles;
