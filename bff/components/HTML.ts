export default (content: string) => {
    return `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div id="root">${content}</div>
            <script type="text/javascript" charset="utf-8" src="static/js/bundle.js"></script>
        </body>
    </html>
    `
}