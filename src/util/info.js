const version = '__VERSION__'
const build_time = '__BUILD_TIME__'

const info = () => {
    console.info(`Freemarker v${version}, built ${build_time}`)
}

export { info }
