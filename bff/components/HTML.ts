import { RootState } from "../../src/shared/redux/store"

export default (content: string, style: string, state: RootState) => {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        ${style}
        <body>
            <div id="root">${content}</div>
            <script>
                window.INITIAL_STATE = ${JSON.stringify(state)}
            </script>
            <script type="text/javascript" charset="utf-8" src="static/js/bundle.js"></script>
        </body>
    </html>
    `
}