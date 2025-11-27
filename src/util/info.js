const version = '__VERSION__'
const build_time = '__BUILD_TIME__'

const info = () => {
    console.info(`%c Freemarker %c v${version} %c ${build_time} `, 'color: pink; font-weight: bold; background: #2b1700', 'color: white; background: darkgreen', 'color: white; background: #0080fe;')
}

export { info }
