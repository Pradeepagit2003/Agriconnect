// export const baseUrl = "http://192.168.1.5:8081/"
// export const baseUrl = "http://192.168.1.7:8081/"
export const baseUrl = "http://localhost:8080/"

export const getbaseUrl  = (port:number) => {
    return `http://192.168.1.5:${port}/`
}