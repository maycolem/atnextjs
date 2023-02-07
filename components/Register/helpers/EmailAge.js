export class EmailAge {
    #EAReason
    #EARiskBandID
    #EAScore
    #verified = false
    #unverifiedReason = {
        title: '',
        content: '',
    }

    constructor({ EAReason = '', EARiskBandID = '', EAScore = '' }) {
        this.#EAReason = EAReason || ''
        this.#EARiskBandID = EARiskBandID || ''
        this.#EAScore = EAScore || ''
    }

    isValidateEmailAge() {
        if (Number(this.#EARiskBandID) >= 4) {
            this.#verified = false
            return false
        }
        this.#verified = true
        return true
    }

    isInvalidEmailToRegister() {
        if (Number(this.#EARiskBandID) >= 6) {
            return true
        }
        return false
    }

    get unverifiedReason() {
        this.#unverifiedReason.title = 'Api EmailAge'
        this.#unverifiedReason.content = `${this.#EAReason}, score ${this.#EARiskBandID}`
        return this.#unverifiedReason
    }

    get verified() {
        return this.#verified
    }

    get id() {
        return this.#EARiskBandID
    }
}
