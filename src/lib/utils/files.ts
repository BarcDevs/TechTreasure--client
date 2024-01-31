export const generateFileName = (file: File) =>
    file.name.startsWith('productImage') ? file.name :
        `productImage-${file.name.split('.')[0]}-${new Date().getTime()}.${file.name.split('.')[1]}`

export const extractFileFromObject = (obj: any, formData: FormData) => {
    Object.entries(obj).forEach(([_, v]) => {
        if (v instanceof File) {
            const filename = generateFileName(v)
            obj.path = filename
            return formData.append(filename, v)
        }
    })
}

export const extractFileFromArray = (arr: Array<any>, formData: FormData) => {
    arr.forEach((val, index) => {
        if (val instanceof File) {
            const filename = generateFileName(val)
            arr[index] = filename
            return formData.append(filename, val)
        }
        if (typeof val === 'object') {
            extractFileFromObject(val, formData)
        }
    })
}
