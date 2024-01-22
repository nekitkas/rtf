const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")

const mimeTypes = {
  ".aac": "audio/aac",
  ".avi": "video/x-msvideo",
  ".bmp": "image/bmp",
  ".css": "text/css",
  ".csv": "text/csv",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".gif": "image/gif",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "application/javascript",
  ".json": "application/json",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".svg": "image/svg+xml",
  ".tif": "image/tiff",
  ".tiff": "image/tiff",
  ".txt": "text/plain",
  ".wav": "audio/wav",
  ".webm": "video/webm",
  ".webp": "image/webp",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".xml": "application/xml",
  ".zip": "application/zip",
}

const port = 3000

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true)
  const pathname =
    parsedUrl.pathname === "/" ? "/index.html" : parsedUrl.pathname

  const filePath = path.join(__dirname, pathname)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`Error reading file: ${err.message}`)
      return serveIndexHtml(res)
    }

    const extension = path.extname(pathname)

    // const contentType = getContentType(pathname);

    res.writeHead(200, { "Content-Type": mimeTypes[extension] })
    res.write(data)
    res.end()
  })
})

function serveIndexHtml(res) {
  const indexPath = path.join(__dirname, "index.html")

  fs.readFile(indexPath, (err, data) => {
    if (err) {
      console.error(`Error reading index.html: ${err.message}`)
      res.writeHead(404, { "Content-Type": "text/html" })
      res.end("404 Not Found")
    } else {
      res.writeHead(200, { "Content-Type": "text/html" })
      res.write(data)
      res.end()
    }
  })
}

// function getContentType(filename) {
//   const extension = path.extname(filename);

//   switch (extension) {
//     case '.html':
//       return 'text/html';
//     case '.js':
//       return 'text/javascript';
//     case '.css':
//       return 'text/css';
//     case '.svg':
//       return 'image/svg+xml';
//     default:
//       return 'application/octet-stream';
//   }
// }

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
