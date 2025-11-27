import fs from 'fs'
import path from 'path'

export function getFileByStream (path) {
    return fs.createReadStream(path)
}

export function getDirInfo (dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return reject(err)
            }
            resolve(files)
        })
    })
}

export function getFileStat (file) {
    return new Promise(function (resolve, reject) {
        fs.lstat(file, function (err, stat) {
            if (err) {
                return reject(err)
            }
            resolve(stat)
        })
    })
}

export function readFile (file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) {
                return reject(err)
            }
            resolve(data)
        })
    })
}

export function readStream (file) {
    return fs.createReadStream(file)
}

export function writeFile (filename, text) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, text, (err) => {
            if (err) {
                return reject(err)
            }
            resolve(text)
        })
    })
}

export function writeUnExistsFile (file, text) {
    let needCreateStack = [file]

    return new Promise((...args) => {
        const search = () => {
            file = path.resolve(file, '../')
            fs.stat(file, (err) => {
                if (err) {
                    needCreateStack.push(file)
                    search()
                } else {
                    create()
                }
            })
        }
        const create = () => {
            let file = needCreateStack.pop()
            if (needCreateStack.length) {
                return fs.mkdir(file, create)
            }
            writeFile(file, text).then(...args)
        }
        search()
    })
}

export function delDir (s) {
    try {
        const stat = fs.statSync(s)
        if (stat.isDirectory()) {
            const children = fs.readdirSync(s)
            if (children && children.length) {
                children.forEach(function (item) {
                    delDir(path.join(s, item))
                })
            }
            fs.rmdirSync(s)
        } else {
            fs.unlinkSync(s)
        }
    } catch (err) {
        return -1
    }
}

export function delFile (file) {
    try {
        if (fs.statSync(file).isFile()) {
            fs.unlinkSync(file)
        } else {
            const children = fs.readdirSync(file)
            if (children && children.length) {
                children.forEach(function (item) {
                    delDir(path.join(file, item))
                })
            }
            fs.rmdirSync(file)
        }
    } catch (err) {
        return -1
    }
}

