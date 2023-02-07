import axios from 'axios'

interface ResponseApi {
    http_code: number
    result: string
    status: string | number
}

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_CALIMACO_API_BASE}/`,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    timeout: 10000,
})

interface Props {
    session: string
    company: string
    myFile: File
    type: string
}

export interface Response {
    company: string
    event: string
    ip: string
    result: string
    data: DataData
}

export interface DataData {
    file: number
    path: string
}

export interface ResponseHeaders {
    'cache-control': string
    'content-length': string
    'content-type': string
}

export const uploadFileVerificate = async (props: Props): Promise<ResponseApi> => {
    // file for upload picture and verificate account of users AT
    // eslint-disable-next-line no-useless-catch
    try {
        const formData = new FormData()
        formData.append('session', props.session)
        formData.append('company', props.company)
        formData.append('myFile', props.myFile)
        formData.append('type', props.type)

        const data = await instance.post<Props, any>('data/uploadFile', formData)
        return response(data)
    } catch (e) {
        const result = responseError(e)
        return result
    }
}

function response(data: { status: number; data: Response }): ResponseApi {
    if (!data.status) {
        return {
            status: 413,
            http_code: 413,
            result: 'Network Error',
        }
    }
    return {
        status: data.status,
        http_code: data.status,
        result: data.data.result,
    }
}

function responseError(e: any): ResponseApi {
    let error = response(e)
    if (e?.response) {
        error = response(e?.response)
    }
    return error
}
